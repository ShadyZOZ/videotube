var mongoose = require('mongoose')
var videosSchema = require('../schemas/movie')
var videos = mongoose.model('videos', videosSchema)

module.exports = videos

// var findAlbums = function(db, callback) {
//    var cursor =db.collection('videos').find( );
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          console.dir(doc);
//       } else {
//          callback();
//       }
//    });
// };
//
// module.exports = findAlbums
//
// var findVideos = function(db, callback) {
//    var cursor = db.collection('videos').findOne( {albumName: albumName} );
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          console.dir(doc);
//       } else {
//          callback();
//       }
//    });
// };
//
// module.exports = findVideos
