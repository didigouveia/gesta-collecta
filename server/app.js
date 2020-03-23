const express = require('express');
const logger = require('morgan');
// const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/gesta-collecta',
//     { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//     .catch(function (reason) {
//         console.log('Unable to connect to the mongodb instance. Error: ', reason);
//     });

const app = express();

// Middleware
app.use(helmet());
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Routes
app.use('/gestures', require('./routes/gestures'));

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
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`gesta-collecta: server listening on port ${port}`));
