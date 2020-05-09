const UsersController = require('../../users/controllers/users.controller');
const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');

exports.login = (req, res) => {
    console.log('Generating token');
    try {
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({accessToken: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.register = (req, res) => {
    UsersController.insert(req, res);
};
