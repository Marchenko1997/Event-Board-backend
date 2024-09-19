const { HttpError, ctrlWrapper } = require('../helpers');
const { Participant } = require('../models/participant');
const { Event } = require('../models/event');

const registerParticipantToEvent = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  const event = await Event.findById(id, '-createdAt, -updatedAt');
  if (!event) {
    throw HttpError(404, 'Not Found');
  }

  const existingParticipant = await Participant.findOne(
    { eventId: id, 'user.email': user.email },
    '-createdAt, -updatedAt',
  );
  if (existingParticipant) {
    throw HttpError(409, 'Conflict');
  }

  const participant = {
    eventId: id,
    user,
  };
  const result = await Participant.create(participant);
  res.status(201).json(result);
};

const getAllParticipantsByEventId = async (req, res) => {
  const { id } = req.params;
  const result = await Participant.find(
    { eventId: id },
    '-createdAt, -updatedAt',
  );
  res.json(result);
};

const getParticipantByEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const result = await Participant.find(
    { 'user.email': email },
    '-createdAt, -updatedAt',
  );
  res.json(result);
};

module.exports = {
  registerParticipantToEvent: ctrlWrapper(registerParticipantToEvent),
  getAllParticipantsByEventId: ctrlWrapper(getAllParticipantsByEventId),
  getParticipantByEmail: ctrlWrapper(getParticipantByEmail),
};
