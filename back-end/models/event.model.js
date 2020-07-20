const mongoose = require('mongoose')
const questionSchema = require('./question.model').schema
const userEventQuestionAnswer = require('./user-event-question-answer.model')
const Schema = mongoose.Schema

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: Date,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
})

eventSchema.methods.generateStatistics = function () {
   
}

module.exports.schema = eventSchema

module.exports.model = mongoose.model('Event', eventSchema)
