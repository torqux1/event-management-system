const indicative = require('indicative/validator')
const Event = require('./../models/event.model.js').model
const Question = require('./../models/question.model.js').model
const Answer = require('./../models/answer.model.js').model
const mongoose = require('mongoose')
const groupBy = require('./../common/helpers').groupBy

module.exports = {
    index: (req, res) => {
        Event.find((error, results) => {
            if (error) {
                res.json({
                    success: false,
                })
            }

            res.json({
                success: true,
                events: results,
            })
        })
    },
    create: (req, res) => {
        indicative
            .validate(req.body, {
                title: 'required|string|max:255',
                description: 'required|string',
                date: 'required|date',
                time: 'required|date',
                questions: 'array',
            })
            .then(() => {
                const event = new Event()
                event.title = req.body.title
                event.description = req.body.description
                event.date = req.body.date
                event.time = req.body.time
                event.questions = []
                event.save()

                if (req.body.questions) {
                    for (const question of req.body.questions) {
                        const questionEntity = new Question()
                        questionEntity.content = question.content
                        questionEntity.event = event._id
                        questionEntity.answers = []
                        questionEntity.save()

                        event.questions.push(questionEntity._id)

                        const uniqueAnswers = [...new Set(question.answers)]

                        for (const answer of uniqueAnswers) {
                            const answerEntity = new Answer()
                            answerEntity.content = answer
                            answerEntity.question = questionEntity._id
                            answerEntity.save()

                            questionEntity.answers.push(answerEntity._id)
                        }

                        questionEntity.save()
                    }
                }

                event.save()

                res.json({
                    success: true,
                    message: 'Event created',
                    event,
                })
            })
            .catch((err) => {
                res.send(err)
            })
    },
    show: async (req, res) => {
        try {
            const event = await Event.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.params.id),
                    },
                },
                {
                    $lookup: {
                        from: 'usereventquestionanswers',
                        localField: 'questions',
                        foreignField: 'question',
                        as: 'savedAnswers',
                    }, // ТОДО: possibly delete
                },
            ])
                .exec()
                .then(async (result) => {
                    const event = result[0]
                    if (!event) {
                        return res.json({
                            success: false,
                            message: 'No event found',
                        })
                    }

                    Event.generateStatistics(event.questions)
                        .then(async (items) => {
                            for (const item of items) {
                                item.savedAnswers = groupBy(
                                    item.savedAnswers,
                                    'answer'
                                )
                            }

                            for (const item of items) {
                                item.answers = []
                                for (const answerId in item.savedAnswers) {
                                    let answer = await Answer.findById(answerId)

                                    item.answers.push({
                                        id: answer._id,
                                        name: answer.content,
                                        value:
                                            item.savedAnswers[answerId].length,
                                    })

                                    delete item.savedAnswers[answerId]
                                }
                            }

                            res.json({
                                success: true,
                                event,
                                statistics: items,
                            })
                        })
                        .catch(console.error)
                })
                .catch((error) => {
                    console.log(error)
                    return res.json({
                        success: false,
                        message: 'Error',
                    })
                })
        } catch (error) {
            return res.json({
                success: false,
                message: 'Invalid event id',
            })
        }
    },
}
