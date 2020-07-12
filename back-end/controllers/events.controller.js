const indicative = require('indicative/validator')
const Event = require('./../models/event.model.js')
const Question = require('./../models/question.model.js')
const Answer = require('./../models/answer.model.js')

module.exports = {
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
                event.save()

                if (req.body.questions) {
                    for (const question of req.body.questions) {
                        const questionEntity = new Question()
                        questionEntity.content = question.content
                        questionEntity.event_id = event._id
                        questionEntity.save()

                        for (const answer of question.answers) {
                            const answerEntity = new Answer()
                            answerEntity.content = answer
                            answerEntity.quesiton_id = questionEntity._id
                            answerEntity.save()
                        }
                    }
                }

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
    show: (req, res) => {
        console.log(req.headers)
        Event.findById(req.params.question_id, function (err, event) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Something went wrong',
                })
            }

            if (!event) {
                res.json({
                    success: false,
                    message: 'No event found',
                })
            }

            res.json({
                success: true,
                event,
                statistics: []
            })
        })
    },
}
