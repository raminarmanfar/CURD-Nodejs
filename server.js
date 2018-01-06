const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect To Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
//on connection success
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database + '...');
});
//On database connection error
mongoose.connection.on('error', (err) => {
    console.log('Database connection error: ' + err);
});

const app = express();

const users = require('./routes/users');


app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// parse application/json 
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Start Server
const port = 3000;
app.listen(port, () => {
    console.log('Server started on port ' + port + '...');
});