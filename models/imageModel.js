var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PhotoSchema = new Schema({
  caption: String,
  username: String,
  display_src: String,
  likes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

var photos = module.exports = mongoose.model('Photos', PhotoSchema);

module.exports.insertPhotos = function (Image, cb) {
  Image.save(cb)
}

module.exports.getPhotos = function (cb) {
  photos.find({}, cb)
}

module.exports.getSinglePhoto = function (id, cb) {
  photos.findById({ '_id': id }, cb)
}

module.exports.incrementLikes = function (id, cb) {
  photos.update(
    {'_id': id },
    { $inc: { 'likes': 1 } },
    { new: true, upsert: true },
    cb
  )
}
