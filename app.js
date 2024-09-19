const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const apiRouter = require('./routes/api');
const setupSwagger = require('./swagger/swagger-config');

const app = express();
setupSwagger(app);

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
