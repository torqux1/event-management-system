const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    content: String,
    event_id: mongoose.ObjectId,
})

module.exports = mongoose.model('Question', questionSchema)