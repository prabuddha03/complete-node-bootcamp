const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  duration: {
    type: Number,
    required: [true, 'A Tour must have a duration'],
  },
  difficulty: {
    type: String,
    default: 'Moderate',
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
