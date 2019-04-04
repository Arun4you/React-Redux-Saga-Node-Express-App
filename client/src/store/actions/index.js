import { IMAGES, IMAGEDETAIL, COMMENT, IMAGE } from './../constants'

const loadUserImages = () => ({
    type: IMAGES.LOAD
});

const setImages = (imagesList) => ({
    type: IMAGES.SUCCESS,
    imagesList
})

const setImageDetail = (image) => ({
    type: IMAGEDETAIL.SUCCESS,
    image
})

const selectedImage = (selectedImage) => ({
    type: IMAGEDETAIL.SELECT,
    selectedImage
})

const loadImageDetail = (id) => ({ 
    type: IMAGEDETAIL.LOAD,
    id
})

const loadComments = (comments) => ({
    type: COMMENT.SUCCESS,
    comments
})

const onLoadComments = (id) => ({
    type: COMMENT.LOAD,
    id
})

const submitComments = (id, comment) => ({
    type: COMMENT.SUBMIT,
    id,
    comment
})

const deleteComments = (commentId, photoId) => ({
    type: COMMENT.DELETE,
    commentId,
    photoId
})

const incrementLikes = (id, page) => ({
    type: IMAGEDETAIL.INC,
    id,
    page
})

const loadLikes = (likes) => ({
    type: IMAGEDETAIL.LIKE,
    likes
})

const addImage = (value) => ({
    type: IMAGE.ADD,
    value
})

const setImagesError = (error) => ({
    type: IMAGES.FAILURE,
    error
})

const setImageDetailError = (error) => ({
    type: IMAGEDETAIL.FAILURE,
    error
})

export { setImageDetailError, setImagesError, addImage, loadLikes, incrementLikes, loadUserImages, selectedImage, loadImageDetail, setImages, setImageDetail, deleteComments, onLoadComments, loadComments, submitComments }