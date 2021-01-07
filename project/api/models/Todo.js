const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    body: String,
    done:Boolean
});


const TodoModel = mongoose.model('TodoModel', TodoSchema);
module.exports = TodoModel;