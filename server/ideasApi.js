const express = require('express');
const ideasRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    req.idea = getFromDatabaseById('ideas', id);
    if (req.idea) {
        next();
    } else {
        res.status(404).send();
    };
});

ideasRouter.get('/', (req, res, next) => {
    const ideasToSend = getAllFromDatabase('ideas')
    if (ideasToSend) {
        res.status(200).send(ideasToSend);
    } else {
        res.status(404).send();
    };
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const ideaToAdd = req.body;
    const addedIdea = addToDatabase('ideas', ideaToAdd);
    if (addedIdea) {
        res.status(201).send(addedIdea);
    } else {
        res.status(404).send();
    };
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const ideaToUpdate = req.body;
    const updatedIdea = updateInstanceInDatabase('ideas', ideaToUpdate);
    if (updatedIdea) {
        res.status(200).send(updatedIdea);
    } else {
        res.status(404).send();
    };
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const ideaDeleted = deleteFromDatabasebyId('ideas', req.idea.id);
    if (ideaDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    };
})

module.exports = ideasRouter;