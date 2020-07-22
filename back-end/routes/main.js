const express = require('express')
const router = express.Router()
const eventsController = require('./../controllers/events.controller')
const organizationsController = require('./../controllers/organizations.controller')
const invitationsController = require('../controllers/invitations.controller')
const auth = require('./../authorization/middlewares/verify.user.middleware')
    .auth

// Events
router.post('/event/create', auth, eventsController.create)
router.get('/event/:id', auth, eventsController.show)
router.post(
    '/event/:eventId/submit-invitation',
    auth,
    invitationsController.submit
)
router.get('/event', auth, eventsController.index)



// Organizations
router.post('/organization/create', auth, organizationsController.create)
router.get('/organization/get-own', auth, organizationsController.getOwnOrganizations)
router.get('/organization/:id', organizationsController.show)
router.get('/organization/:id/events', organizationsController.getEvents)
router.post('/organization/:id/post/create', auth, organizationsController.createPost)
router.get('/organization/:id/post', organizationsController.posts)

module.exports = router
