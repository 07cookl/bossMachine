const express = require('express');
const minionsRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    req.minion = getFromDatabaseById('minions', id);
    if (req.minion) {
        next();
    } else {
        res.status(404).send();
    };
});

minionsRouter.get('/', (req, res, next) => {
    const minionsToSend = getAllFromDatabase('minions')
    if (minionsToSend) {
        res.status(200).send(minionsToSend);
    } else {
        res.status(404).send();
    };
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body;
    const newMinionToSend = addToDatabase('minions', newMinion);
    if (newMinionToSend) {
        res.status(201).send(newMinionToSend);
    } else {
        res.status(404).send();
    };
});

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionToSend = getFromDatabaseById('minions', req.minion.id);
    if (minionToSend) {
        res.status(200).send(minionToSend);
    } else {
        res.status(404).send();
    };
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionToUpdate = req.body;
    const minionUpdated = updateInstanceInDatabase('minions', minionToUpdate);
    if (minionUpdated) {
        res.status(200).send(minionUpdated);
    } else {
        res.status(404).send();
    };
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionDeleted = deleteFromDatabasebyId('minions', req.minion.id);
    if (minionDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    };
});

// Work routes

const workRouter = require('./workApi');
minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter;
