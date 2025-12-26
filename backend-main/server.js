const dotenv = require('dotenv');
const connectDB = require('./db/connect');
const middleware = require('./src/middleware');

// Load environment variables from .env file
dotenv.config();
const cors = require('cors');
const corsOptions = {
  origin: '*', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
};

const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());
app.use(cors(corsOptions));
//app.use(middleware.decodeToken);

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files from the temp directory
app.use('/temp', express.static(path.join(__dirname, '../temp')));

// Import routes
const routes = require('./src/routes/index');

app.use('/api', routes);

// Start the server and connect to the database
// app.listen(port, async () => {
//   console.log(`Server is running on port ${port}`);
// });

const start = async () => {
  try {
   // await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
