const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const signUpHandlerPost = require('./BACKEND/api-routes/sign-up');
const signInHandlerPost = require('./BACKEND/api-routes/sign-in');
const userHandlerGet = require('./BACKEND/api-routes/user');
const restaurantsHandlerGet = require('./BACKEND/api-routes/restaurants/get');
// const restaurantsHandlerPost = require('./BACKEND/api-routes/restaurants/post');
const restaurantsFilterHandlerPost = require('./BACKEND/api-routes/restaurants/filter/post');
const seedInitial = require('./BACKEND/helpers/seed-initial');

app.use(cors())
app.use(bodyParser.json())

// Auth routes
app.post('/api/sign-up', signUpHandlerPost);
app.post('/api/sign-in', signInHandlerPost);

// User route
app.get('/api/user', userHandlerGet);

// Events routes
app.get('/api/restaurants', restaurantsHandlerGet);
// app.post('/api/restaurants', restaurantsHandlerPost);
app.post('/api/restaurants/filter', restaurantsFilterHandlerPost);


seedInitial();


app.listen(PORT, () =>
    console.log('Server is running on port ' + PORT)
);