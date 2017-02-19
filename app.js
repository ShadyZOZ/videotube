/*eslint no-console:0 */
let express = require('express')
let mongoose = require('mongoose')
let serveStatic = require('serve-static')
let bodyParser = require('body-parser')
let viewRouter = require('./routers/views')
let apiRouter = require('./routers/api')
let port = process.env.PORT || 3000
let app = express()

mongoose.connect('mongodb://localhost/admin')

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected correctly to server.');
});

app.set('views', './views/pages')
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(serveStatic('dist'))
app.listen(port)

console.log('website started on port ' + port)

app.use('/movies', viewRouter)
app.use('/api/movies', apiRouter)
