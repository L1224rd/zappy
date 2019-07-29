// ==================== EXTERNAL IMPORTS ==================== //

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// ==================== INTERNAL IMPORTS ==================== //



// ==================== GLOBAL VARIABLES ==================== //

const app = express();

// ==================== MIDDLEWARE ==================== //

app.use('/views', express.static('views'));
dotenv.config();

// ==================== FUNCTIONS ==================== //

const getViewPath = (view) => {
  return path.join(__dirname, `./views/${view}/${view}.html`);
}

// ==================== ROUTES ==================== //

app.use('/api/user', require('./routes/user'));
app.use('/api/message', require('./routes/message'));

// ==================== VIEWS ==================== //

app.get('/', (req, res) => {
  res.sendFile(getViewPath('home'));
});

app.get('/:view', (req, res) => {
  res.sendFile(getViewPath(req.params.view), (err) => {
    if (err) res.send('404');
  });
});

app.listen(3000, () => {
  console.log('READY');
});