const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
  {
    _id: { type: String },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    eventDate: {
      type: String,
    },
    organizer: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false, collection: 'events' }, // Явно указываем коллекцию
);

const Event = model('Event', eventSchema);

module.exports = { Event };
