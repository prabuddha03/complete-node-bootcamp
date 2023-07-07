const express = require('express');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json()); // middleware

//Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//For unhandled routes 404
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Failed',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
