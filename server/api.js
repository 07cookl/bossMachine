const express = require('express');
const apiRouter = express.Router();
const errorHandler = require('errorhandler');
const morgan = require('morgan');

apiRouter.use(morgan('dev'));

// Minions routes

const minionsRouter = require('./minionsApi');
apiRouter.use('/minions', minionsRouter);

// Ideas routes

const ideasRouter = require('./ideasApi');
apiRouter.use('/ideas', ideasRouter);

// Meetings routes

const meetingsRouter = require('./meetingsApi');
apiRouter.use('/meetings', meetingsRouter);

// Error handler

apiRouter.use((err, req, res, next) => {
    errorHandler(err);
});

module.exports = apiRouter;
