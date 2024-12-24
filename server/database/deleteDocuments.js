import { MongoClient } from 'mongodb';

async function deleteDocuments () {
  const uri = 'mongodb://localhost:27017/Web-Entwicklung-Projekt';

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('Web-Entwicklung-Projekt');
    const collection = database.collection('users');

    const result = await collection.deleteMany({});
    console.log(`${result.deletedCount} documents deleted.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

deleteDocuments();
