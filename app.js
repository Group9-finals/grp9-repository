const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const profilesRoutes = require('./routes/profiles');
const mongoDb = require('./database/db');

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database successfully connected', mongoDb.db);
}, error => {
  console.log('Database error: ' + error);
});

// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// API routes
app.use('/api/profiles', profilesRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
