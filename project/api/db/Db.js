

const mongoose = require('mongoose');
mongoose
  .connect('mongodb://mongodb:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connection successful!'))
  .catch((err) => console.error(`There was an error: ${err}`));