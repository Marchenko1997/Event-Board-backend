const { HttpError, ctrlWrapper } = require('../helpers');
const { Event } = require('../models/event');

const getEvents = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

  const skip = (page - 1) * limit;

  const totalCount = await Event.countDocuments();
  const result = await Event.find({}, '-createdAt, -updatedAt', {
    skip,
    limit,
  });

  res.json({
    totalRecords: totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    events: result,
  });
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findById(id, '-createdAt, -updatedAt');
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = {
  getEvents: ctrlWrapper(getEvents),
  getEventById: ctrlWrapper(getEventById),
};
