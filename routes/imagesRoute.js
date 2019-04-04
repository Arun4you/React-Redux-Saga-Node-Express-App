var router = require('express').Router();
var photos = require('./../models/imageModel')
var comments = require('./../models/commentModel')

router.post('/add-images', function(req, res, next){
    var Image = new photos({
        caption:req.body.caption,
        display_src:req.body.display_src,
        username:req.body.username
    })
    photos.insertPhotos(Image, function(err, cb){
        if (err) return console.log(err)
        var id = cb._id
        comments.insertComments(id, function(err,cb){
            if (err) return console.log(err)   
            res.json(cb)
        })
    })
    // images.insertMany()
})

router.get('/fetch-images', function (req, res) {
    photos.getPhotos(function(err, cb){
        if (err) return err
        res.json(cb)
    })
})

router.get('/fetch-image-detail/:id', function (req, res) {
    var id = req.params.id
    photos.getSinglePhoto(id, function(err, cb){
        if (err) return err
        res.json(cb)
    })
})

router.put('/add-comments/:id', function(req, res){
    var id = req.params.id
    var comment = {
        username: req.body.username,
        comment: req.body.comment
    }
    comments.updateComments(id, comment, function (err,callback){
        if(err) throw err;
         res.status(201).json(callback)
    })    
})

router.delete('/delete-comment/:id', function(req, res){   
    console.log('delete called')  
    const photoId = req.body.photoId
    const commentId = req.params.id
    console.log('delete called', req.body)  
    comments.deleteComment(commentId, photoId, function (err,callback){
        if(err) throw err;
        console.log(callback+ " from service")
         res.status(201).json(callback)
    })    
})

router.get('/allcomments/:id', function (req, res, next){
    var id = req.params.id
    comments.getAllComments(id, function(err, callback){
        if(err) throw err;
        res.status(201).json(callback)
    })
})

router.put('/increment-likes/:id',(req,res)=>{
    var id = req.params.id
    console.log("from main router "+ id)
    photos.incrementLikes(id,(err,callback)=>{
        if(err) throw err;
        console.log("Value Incremented", callback)
        // res.status(201).json({"success":"false", "message":"true"})
        res.status(201).json(callback)
    }) 
})

module.exports = router;