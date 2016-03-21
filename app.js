var express = require('express')
// var redirect = require("express-redirect")
var path = require('path')
var mongoose = require('mongoose')
var videos = require('./models/movie')
var assert = require('assert')
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()
// redirect(app)

mongoose.connect('mongodb://localhost/media')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected correctly to server.');
});

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(serveStatic('bower_components'))
app.listen(port)

console.log('website started on port ' + port)

app.get('/', function(req, res) {
    videos.find(function(err, albums) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'home page',
            movies: albums.sort()
        })
    })
})

app.get('/movie/:albumName/:id', function(req, res) {
    var albumName = req.params.albumName
    var id = req.params.id
    videos.where({albumName: albumName}).findOne(function (err, videos) {
        if (err) {
            console.log(err);
        }
        if (videos) {
            if (id > videos['videos'].length) {
                res.redirect('/movie/'+ albumName + '/1')
            }
            else {
                res.render('detail', {
                    title: videos['albumName'],
                    video: {
                        title: videos['videos'][id-1]['video_name'],
                        flash: videos['videos'][id-1]['video_url']
                    },
                    next_id: Number(id) + 1,
                    total: videos['videos'].length
                })
            }
        }
    })
})
