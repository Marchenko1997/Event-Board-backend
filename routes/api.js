const express = require('express');
const router = express.Router();

const participantsCtrl = require('../controllers/participants');
const eventsCtrl = require('../controllers/events');

const { validateBody, isValidId } = require('../middleware');
const { schemas } = require('../models/participant');

router.get('/events', eventsCtrl.getEvents);

router.get('/events/:id', eventsCtrl.getEventById);

router.get(
  '/events/:id/participants',
  isValidId,
  participantsCtrl.getAllParticipantsByEventId,
);
router.get('/participant/:email', participantsCtrl.getParticipantByEmail);

router.post(
  '/events/:id/register/participant',
  validateBody(schemas.registerSchema),
  participantsCtrl.registerParticipantToEvent,
);

module.exports = router;
