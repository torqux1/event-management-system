const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    content: String,
    question_id: mongoose.ObjectId,
})

module.exports = mongoose.model('Answer', answerSchema)
