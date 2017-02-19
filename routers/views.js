/*eslint no-console:0 */
let express = require('express')
let router = express.Router()


router.get('/', (req, res) => {
    res.render('home', {
        title: 'home page'
    })
})

router.get('/:videoName/:id', (req, res) => {
    let videoName = req.params.videoName
    res.render('detail', {
        title: videoName
    })
})

module.exports = router