var mongoose = require('mongoose')

var videosSchema = new mongoose.Schema({
    albumName: String,
    poster: String,
    videos: [{
        video_name: String,
        video_url: String
    }]
})

module.exports = videosSchema
