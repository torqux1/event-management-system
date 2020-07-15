const mongoose = require('mongoose')
const questionSchema = require('./question.model').schema
const Schema = mongoose.Schema

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: Date,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
})

module.exports.schema = eventSchema

module.exports.model = mongoose.model('Event', eventSchema)
