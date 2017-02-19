let mongoose = require('mongoose')

let videosSchema = new mongoose.Schema({
    videoName: {
        type: String,
        index: true,
        unique: true
    },
    poster: String,
    videos: [{
        name: String,
        url: String,
        watched: {
            type: Boolean,
            default: false
        }
    }]
})

module.exports = videosSchema