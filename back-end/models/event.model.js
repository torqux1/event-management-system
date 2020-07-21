const mongoose = require('mongoose')
const Question = require('./question.model').model
const UserEventQuestionAnswer = require('./user-event-question-answer.model')
    .model
const Schema = mongoose.Schema

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: Date,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
})

eventSchema.statics.generateStatistics = async function (questionsIds) {
    return Question.aggregate([
        {
            $match: {
                _id: { $in: questionsIds },
            },
        },
        {
            $lookup: {
                from: 'usereventquestionanswers',
                localField: '_id',
                foreignField: 'question',
                as: 'savedAnswers',
            },
        },
        {
            $lookup: {
                from: 'answers',
                localField: 'answers',
                foreignField: '_id',
                as: 'answers',
            },
        },
    ]).exec()
}

module.exports.schema = eventSchema

module.exports.model = mongoose.model('Event', eventSchema)
