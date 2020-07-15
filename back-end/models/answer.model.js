const mongoose = require('mongoose')
const Schema = mongoose.Schema


const answerSchema = new mongoose.Schema({
    content: String,
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
})

module.exports = mongoose.model('Answer', answerSchema)
