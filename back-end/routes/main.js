const express = require('express')
const router = express.Router()
const Event = require('./../models/event.model.js').model
const eventsController = require('./../controllers/events.controller')
const invitationsController = require('../controllers/invitations.controller')
const auth = require('./../authorization/middlewares/verify.user.middleware')
    .auth

router.post('/event/create', auth, eventsController.create)
router.get('/event/:id', auth, eventsController.show)
router.post('/event/:eventId/submit-invitation', auth, invitationsController.submit)
router.get('/event', eventsController.index)
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
