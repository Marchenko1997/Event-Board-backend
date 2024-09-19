const { HttpError, ctrlWrapper } = require('../helpers');
const { Event } = require('../models/event');
const mongoose = require('mongoose');

const getEvents = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

    const skip = (page - 1) * limit;

    const totalCount = await Event.countDocuments(); // Подсчет всех событий
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
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id, '-createdAt, -updatedAt');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getEvents: ctrlWrapper(getEvents),
  getEventById: ctrlWrapper(getEventById),
};
