import User from '../model/userModel.js';
import Notepad from '../model/notepadModel.js';
import syllabificate from 'syllabificate';

export const find = async (req, res) => {
  const perPage = 10;
  const page = req.query.page || 1;

  try {
    const users = await User.find()
      .skip((perPage * page) - perPage)
      .limit(perPage);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / perPage);

    res.send({
      users,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Fehler beim Abrufen von Benutzerinformationen aufgetreten'
    });
  }
};

export const filterAndPaginate = async (req, res) => {
  const perPage = 10;
  const page = req.query.page || 1;

  try {
    const query = {};

    if (req.query.gender) {
      console.log('Received gender filter:', req.query.gender);
      query.geschlecht = req.query.gender;
    }

    if (req.query.search || req.query.searchPrefix || req.query.searchSuffix || req.query.searchNoPrefix || req.query.searchNoSuffix || req.query.syllables) {
      console.log('Received search, search by Prefix, or search by Suffix filter:', req.query.search, req.query.searchPrefix, req.query.searchSuffix, req.query.searchNoPrefix, req.query.searchNoSuffix, req.query.syllables);

      query.$and = [];

      if (req.query.search) {
        query.$and.push({ vorname: { $regex: new RegExp(req.query.search, 'i') } });
      }

      if (req.query.searchPrefix) {
        query.$and.push({ vorname: { $regex: new RegExp('^' + req.query.searchPrefix, 'i') } });
      }

      if (req.query.searchSuffix) {
        query.$and.push({ vorname: { $regex: new RegExp(req.query.searchSuffix + '$', 'i') } });
      }

      if (req.query.searchNoPrefix) {
        query.$and.push({ vorname: { $regex: new RegExp('^(?!' + req.query.searchNoPrefix + ').*', 'i') } });
      }

      if (req.query.searchNoSuffix) {
        query.$and.push({ vorname: { $regex: new RegExp('^(?!.*' + req.query.searchNoSuffix + '$)', 'i') } });
      }

      if (req.query.syllables) {
        const syllables = parseInt(req.query.syllables);

        if (!isNaN(syllables) && syllables > 0) {
          const usersWithSyllables = await User.find({ vorname: { $exists: true } })
            .then(users => users
              .filter(user => syllabificate.countSyllables(user.vorname) === syllables)
              .map(user => user.toObject())
            );

          query.$and.push({ vorname: { $in: usersWithSyllables.map(user => user.vorname) } });
        } else {
          res.status(400).send({ message: 'Invalid syllables parameter' });
          return;
        }
      }
    }

    let totalItems = await User.countDocuments(query);

    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
      totalItems = Math.min(totalItems, limit);
    }

    const totalPages = Math.ceil(totalItems / perPage);

    // Calculate the number of items to skip
    const skipItems = (page - 1) * perPage;

    const itemsToFetch = Math.min(perPage, totalItems - skipItems);

    // If trying to access beyond the total number of items, adjust accordingly
    if (skipItems >= totalItems) {
      return res.status(400).send({
        message: 'Requested page is beyond the available items.'
      });
    }

    // Fetch the items, ensuring not to exceed the limit
    const users = await User.find(query)
      .skip(skipItems)
      .limit(itemsToFetch);

    res.send({
      users,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Error occurred while fetching user information.'
    });
  }
};

export const addToNotepad = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if the user is already in the notepad
    const existingEntry = await Notepad.findOne({ vorname: user.vorname });

    if (existingEntry) {
      return res.status(400).send({ message: 'User already in notepad' });
    }

    // Create a new notepad entry for the user
    const notepadEntry = new Notepad({
      vorname: user.vorname,
      geschlecht: user.geschlecht
    });

    // Save the notepad entry to the database
    await notepadEntry.save();

    res.status(200).send({ message: 'User added to notepad successfully' });
  } catch (error) {
    console.error('Error adding user to notepad:', error);
    res.status(500).send({ message: 'Error adding user to notepad', error });
  }
};

export const findNotepadEntries = (req, res) => {
  const genderFilter = req.query.gender;

  const query = {};

  if (genderFilter) {
    query.geschlecht = genderFilter;
  }

  Notepad.find(query)
    .then(entries => {
      res.send(entries);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error retrieving notepad entries' });
    });
};

export const removeFromNotepad = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the notepad entry by ID
    const notepadEntry = await Notepad.findById(userId);

    if (!notepadEntry) {
      return res.status(404).send({ message: 'Notepad entry not found' });
    }

    // Remove the notepad entry
    await Notepad.deleteOne({ _id: userId });

    res.status(200).send({ message: 'User removed from notepad successfully' });
  } catch (error) {
    console.error('Error removing user from notepad:', error);
    res.status(500).send({ message: 'Error removing user from notepad', error });
  }
};

export const togglePriority = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the notepad entry by ID
    const notepadEntry = await Notepad.findById(userId);

    if (!notepadEntry) {
      return res.status(404).send({ message: 'Notepad entry not found' });
    }

    // Toggle the priority status
    notepadEntry.priority = !notepadEntry.priority;

    // Save the updated entry
    await notepadEntry.save();

    res.status(200).json({ message: 'Priority toggled successfully', updatedEntry: notepadEntry });
  } catch (error) {
    console.error('Error toggling priority:', error);
    res.status(500).json({ message: 'Error toggling priority', error });
  }
};
