const express = require('express');
const mongoose = require('mongoose');

// [SECTION] Routes
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');

const app = express();

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once('open', () =>
  console.log('Now connected to MongoDB Atlas')
);

app.use(express.json());
app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);

if (require.main === module) {
  app.listen(process.env.PORT, () =>
    console.log(`API is now online on port ${process.env.PORT}`)
  );
}

module.exports = { app, mongoose };
