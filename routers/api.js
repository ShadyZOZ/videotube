/*eslint no-console:0 */
let express = require('express')
let router = express.Router()
let Videos = require('../models/movie')

router.get('/', (req, res) => {
    Videos.find((err, videos) => {
        if (err) {
            res.status(400).json({
                msg: err
            })
        } else {
            res.json({
                videos: videos
            })
        }
    })
})

router.post('/', (req, res) => {
    let videoName = req.body.videoName
    let poster = req.body.poster
    if (videoName == undefined) {
        res.status(400).json({
            msg: 'parameter error'
        })
    } else {
        let video = new Videos({
            videoName: videoName,
            poster: poster
        })
        video.save((err, video) => {
            if (err) {
                let msg = 'unknow error'
                if (err.code == 11000) {
                    msg = 'duplicate album name'
                }
                res.status(400).json({
                    msg: msg
                })
            } else {
                res.status(201).json(video)
            }
        })
    }
})

router.get('/:videoName', (req, res) => {
    let videoName = req.params.videoName
    Videos.findOne({
        videoName: videoName
    }, (err, video) => {
        if (err) {
            res.status(404).json({
                msg: 'album not found'
            })
        } else {
            res.json(video)
        }
    })
})

router.post('/:videoName', (req, res) => {
    let videoName = req.params.videoName
    let videos = req.body.videos
    if (!videos instanceof Array) {
        res.status(400).json({
            msg: 'parameter error'
        })
    } else {
        Videos.findOneAndUpdate({
            videoName: videoName
        }, {
            '$push': {
                'videos': {
                    '$each': videos
                }
            }
        }, (err) => {
            if (err) {
                res.status(400).json({
                    msg: err
                })
            } else {
                res.json({
                    msg: 'update success'
                })
            }
        })
    }
})

router.get('/:videoName/:id', (req, res) => {
    let videoName = req.params.videoName
    let id = req.params.id
    Videos.findOne({
        videoName: videoName
    }, (err, video) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.json({
                id: id,
                video: video.videos[id - 1],
                urls: video.videos.map((obj, i) => {
                    return {
                        text: i + 1,
                        url: '/movies/' + videoName + '/' + (i + 1),
                        watched: obj.watched
                    }
                })
            })
        }
    })
})

router.post('/:videoName/:id', (req, res) => {
    let videoName = req.params.videoName
    let id = req.params.id
    let action = req.body.action
    if (action == 'watched') {
        Videos.findOne({
            videoName: videoName
        }, (err, video) => {
            if (err) {
                res.status(400).json({
                    msg: err
                })
            } else {
                video.videos[id - 1].watched = true
                video.save((err) => {
                    if (err) {
                        res.status(400).json({
                            msg: err
                        })
                    } else {
                        res.json({
                            msg: 'update success'
                        })
                    }
                })
            }
        })
    } else {
        res.status(400).json({
            msg: 'invalid action'
        })
    }
})

module.exports = router
