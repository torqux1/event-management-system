const UsersController = require('../../users/controllers/users.controller')
const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken')
const crypto = require('crypto')
const uuid = require('uuid')

exports.login = (req, res) => {
    console.log('Generating token')
    try {
        let token = jwt.sign(req.body, jwtSecret)
        res.status(200).send({ accessToken: token })
    } catch (err) {
        res.status(500).send({ errors: err })
    }
}

exports.register = (req, res) => {
    UsersController.insert(req, res)
        .then((results) => {
            if (results) {
                let token = jwt.sign(
                    {
                        userId: results._id,
                        email: req.body.email,
                        name: results.firstName + ' ' + results.lastName,
                    },
                    jwtSecret
                )
                res.status(200).send({ accessToken: token })
            }
        })
        .catch(() => {
            res.json({
                succes: false,
            })
        })
}
