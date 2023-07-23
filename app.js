const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
var cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));



app.use(cors());
// Import models
const User = require('./models/user');
const Feed = require('./models/feed');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const feedRoutes = require('./routes/feedRoutes');
const logRoutes = require('./routes/logRoutes');


// associations 
User.hasMany(Feed);
Feed.belongsTo(User);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/createUser', userRoutes);
app.use('/', userRoutes);
app.use('/feeds', feedRoutes);
app.use('/getLogs', logRoutes);

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
sequelize 
 .sync()
 .then(result => {
    app.listen(3000);
    console.log("Connected to SQL")
 })
 .catch(err => {
    console.log(err);
 }) 
