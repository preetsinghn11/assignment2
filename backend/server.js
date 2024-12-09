const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const dotenv = require('dotenv');
const cors = require('cors');
const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');
app.use(cors());
app.use(express.json());
const connectDB = require('./config/db');

dotenv.config();

// Initialize the database connection
connectDB();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
// Define a simple Express route to serve the React front.
// For integration of Passport.js  , first we will install the necessary packages: passport, passport-local, and express-session. 
// Then, we will configure Passport in a separate file (config/passport.js) where we will define the authentication strategy (with LocalStrategy for username/password login). 
// In this file, we'll also serialize and deserialize the user to manage the session. Afterward, in our main app file (app.js), we import and initialize Passport using passport.initialize() and passport.session().
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', courseRoutes);
app.use('/api', studentRoutes);
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
