const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
}).then(
  () => console.log('MongoDB connected.'),
  (err) => {
    console.log('MongoDB not connected:', err )
    process.exit(1);
  }
);
