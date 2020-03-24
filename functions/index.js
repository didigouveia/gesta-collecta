const functions = require('firebase-functions');
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors')({origin: true});

const main = express();
const app = express();

// Middleware
main.use(cors);
main.use('/v1', app);
main.use(helmet());
main.use(logger('dev'));
main.use(express.json({ limit: '50mb' }));

exports.api = functions.https.onRequest(main);

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

exports.app = app;