const eventsController = require('./../controllers/events.controller')
const express = require('express')
const router = express.Router()

router.post('/event/create', eventsController.create)
router.get('/event/:question_id', eventsController.show)

module.exports = router
