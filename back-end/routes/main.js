const eventsController = require('./../controllers/events.controller')
const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model.js').model
const Question = require('./../models/question.model.js').model

router.post('/event/create', eventsController.create)
router.get('/event/:question_id', eventsController.show)
router.get('/playground', async (req, res) => {
    // const e = await Question.findById('5f0f207f948f5e2210657c75').populate(
    //     'answers'
    // )
    const e = await Event.findById('5f0f2dfab647da253895c32f').populate(
        'questions'
    )
    res.json(e)
})

module.exports = router
