var mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/movies');
mongoose.connect(process.env.DATABASE_URL)
// shortcut to mongoose.connection object
var db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
