const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gesta-collecta', 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const app = express();
app.use(helmet());

// Routes
const users = require('./routes/users');
const cars = require('./routes/cars');

// Middleware
app.use(logger('dev'));
app.use(express.json());

// Routes
app.use('/users', users);
app.use('/cars', cars);

// app.use(express.static('public'));
// app.get('/freedrawing', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public/freedrawing.html'));
// });

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500; 

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    // Respond to ourselves
    console.error(err);
    
});

// Start the server
const port = app.get('port')  || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
