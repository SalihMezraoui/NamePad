// notepadModel.js
import mongoose from 'mongoose';

const notepadSchema = new mongoose.Schema({
  vorname: String,
  geschlecht: String,
  priority: { type: Boolean, default: false }
});

const Notepad = mongoose.model('Notepad', notepadSchema);

export default Notepad;
