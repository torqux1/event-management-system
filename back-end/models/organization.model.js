const mongoose = require('mongoose')
const Schema = mongoose.Schema

const organizationSchema = new mongoose.Schema({
    title: String,
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
})

module.exports.schema = organizationSchema

module.exports.model = mongoose.model('Organization', organizationSchema)
