const express = require('express');
const multer = require("multer");

const sstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: sstorage });

const profile = require('../models/profile')
const profilesController = require('../controllers/profiles');

const storage = require('../helpers/storage');

const router = express.Router();
const validateProfileData = (req, res, next) => {
  const { name, email, date, title, content } = req.body;
  if (!name || !email || !date || !title || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
};

router.get('/', profilesController.getProfiles);


router.post('/', storage, profilesController.postProfile);



router.route('/read-profile/:id').get(async (req, res, next) => {
  try {
    const data = await profile.findById(req.params.id, { imagePath: 0, fileName: 0 });
    if (!data) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update-profile/:id', upload.single("image"),validateProfileData, async (req, res, next) => {
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);
  const { id } = req.params;
  try {
    const { name, email, date, title, content } = req.body;
    const fileName = req.file ? req.file.filename : null;

    const updatedProfile = await profile.findByIdAndUpdate(
      id,
      { name, email, date, title, content, fileName },
      { new: true } // Return the updated document
    );

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Vary', 'Accept-Encoding');

    res.json(updatedProfile);
    console.log('Profile updated successfully!');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/delete-profile/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await profile.findByIdAndDelete(id);
    console.log('Profile deleted successfully!');
    res.status(200).json({ message: 'Profile deleted successfully!' });
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;