import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  vorname: String,
  geschlecht: String
});

const User = mongoose.model('User', userSchema);

export default User;
