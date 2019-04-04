var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    username: { type: String },
    comment: { type: String },
    created: { type: Date, default: Date.now }
})

var CommentsSchema = new Schema({
    photo: { type: Schema.Types.ObjectId, ref: 'Photos' },
    comments: [CommentSchema]
});
var comments = module.exports = mongoose.model('comments', CommentsSchema);

module.exports.insertComments = function (id, cb) {
    var comment = new comments({
        photo: id,
        comments: []
    })
    comment.save(cb)
}

module.exports.updateComments = function (id, comment, callback) {
    comments.findOneAndUpdate(
        { 'photo': id },
        {
            "$push": {
                comments: comment
            }
        }, {
            new: true,
            upsert: true
        },
        callback
    ) //to return updated document
    // comments.findOneAndUpdate({ '_id': id }, { $inc: { 'option.value': 1 } }, { new: true, upsert: true }, callback)
}

module.exports.getAllComments = function (id, callback) {
    comments.findOne({ 'photo': id }, callback)
}

module.exports.deleteComment = function (commentId, photoId, callback) {
    console.log("delete-comment model called", commentId, photoId)
    comments.update(
        { "photo": photoId }, {
            '$pull': {
                'comments': {
                    '_id': commentId
                }
            }
        },
        callback
    );
}

