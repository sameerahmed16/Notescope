// const mongoose = require('mongoose')

// const connectionString =
//   'mongodb+srv://sahilsohani16:dk0VVXrJbhYheLGn@cluster0.qwhbj.mongodb.net/hackpsu_database?retryWrites=true&w=majority&appName=Cluster0';

// mongoose.connect()

const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
