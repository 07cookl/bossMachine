const express = require('express');
const meetingsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
    const meetingsToSend = getAllFromDatabase('meetings')
    if (meetingsToSend) {
        res.status(200).send(meetingsToSend);
    } else {
        res.status(404).send();
    };
});

meetingsRouter.post('/', (req, res, next) => {
    const meetingToAdd = createMeeting();
    const addedMeeting = addToDatabase('meetings', meetingToAdd);
    if (addedMeeting) {
        res.status(201).send(addedMeeting);
    } else {
        res.status(404).send();
    };
});

meetingsRouter.delete('/', (req, res, next) => {
    const meetingsDeleted = deleteAllFromDatabase('meetings');
    if (meetingsDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    };
})

module.exports = meetingsRouter;