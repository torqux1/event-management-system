const indicative = require('indicative/validator')
const Organization = require('./../models/organization.model').model

module.exports = {
    create: (req, res) => {
        indicative
            .validate(req.body, {
                title: 'required|string|max:255',
            })
            .then(async (data) => {
                const organization = await Organization.create({
                    title: data.title,
                    owner: req.user._id,
                })
                return res.json({
                    success: true,
                    organization,
                })
            })
            .catch((error) => {
                res.json({
                    success: false,
                    message: error,
                })
            })
    },
    show: async (req, res) => {
        const organization = await Organization.findById(req.params.id)

        if (organization) {
            res.json({
                success: true,
                organization,
            })
        } else {
            res.json({
                success: false,
            })
        }
    },
}
