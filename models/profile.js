const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  fileName: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Profile', profileSchema);