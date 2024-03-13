const express = require('express');
const workRouter = express.Router({ mergeParams: true });
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

workRouter.param('workId', (req, res, next, id) => {
    req.work = getFromDatabaseById('work', id);
    if (req.work) {
        next();
    } else {
        res.status(404).send();
    };
});

workRouter.get('/', (req, res, next) => {
    const allWork = getAllFromDatabase('work');
    const workToSend = allWork.filter((work) => work.minionId === req.minion.id);
    if (workToSend) {
        res.status(200).send(workToSend);
    } else {
        res.status(404).send();
    };
});

workRouter.post('/', (req, res, next) => {
    const workToAdd = req.body;
    const addedWork = addToDatabase('work', workToAdd);
    if (addedWork) {
        res.status(201).send(addedWork);
    } else {
        res.status(404).send();
    }
});

workRouter.put('/:workId', (req, res, next) => {
    if (req.body.minionId !== req.minion.id) {
        res.status(400).send();
    };
    const workToUpdate = req.body;
    const updatedWork = updateInstanceInDatabase('work', workToUpdate);
    if (updatedWork) {
        res.status(200).send(updatedWork);
    } else {
        res.status(404).send();
    };
});

workRouter.delete('/:workId', (req, res, next) => {
    const workToDelete = req.work;
    const workDeleted = deleteFromDatabasebyId('work', workToDelete.id);
    if (workDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    };
});

module.exports = workRouter;
