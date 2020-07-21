const indicative = require('indicative/validator')
const Organization = require('./../models/organization.model').model

module.exports = {
    create: (req, res) => {
        indicative
            .validate(req.body, {
                title: 'required|string|max:255',
                description: 'required|string|max:65000',
            })
            .then(async (data) => {
                const organization = await Organization.create({
                    title: data.title,
                    description: data.description,
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
        const organization = await Organization.findById(
            req.params.id
        ).populate('owner')

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
