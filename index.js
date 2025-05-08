const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// [SECTION] Routes
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');

const app = express();

mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once('open', () =>
  console.log('Now connected to MongoDB Atlas')
);

const corsOptions = {
  origin: [
    'http://localhost:8000',
    'http://localhost:3000',
    'https://fitnessapp-client-five.vercel.app/',
    'https://fitnessapp-client-git-master-julius-albert-grajos-projects.vercel.app/',
    'https://fitnessapp-client-frq3f9sdv-julius-albert-grajos-projects.vercel.app/',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);

if (require.main === module) {
  app.listen(process.env.PORT, () =>
    console.log(`API is now online on port ${process.env.PORT}`)
  );
}

module.exports = { app, mongoose };
