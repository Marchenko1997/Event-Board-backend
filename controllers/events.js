const { HttpError, ctrlWrapper } = require('../helpers');
const { Event } = require('../models/event');
const mongoose = require('mongoose');

const getEvents = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 6;

    const skip = (page - 1) * limit;

    console.log('Connecting to the events collection...');
    const totalCount = await Event.countDocuments(); // Подсчет всех событий
    const result = await Event.find({}, '-createdAt, -updatedAt', {
      skip,
      limit,
    });

    console.log('Found events:', result); // Логируем найденные события

    res.json({
      totalRecords: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      events: result,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Получен ID:', id);

    // Находим событие напрямую по ID в коллекции
    const event = await Event.findById(id, '-createdAt, -updatedAt');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Ошибка при получении события:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  getEvents: ctrlWrapper(getEvents),
  getEventById: ctrlWrapper(getEventById),
};
