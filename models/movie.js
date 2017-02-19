let mongoose = require('mongoose')
let videosSchema = require('../schemas/movie')
let Videos = mongoose.model('Videos', videosSchema)

module.exports = Videos