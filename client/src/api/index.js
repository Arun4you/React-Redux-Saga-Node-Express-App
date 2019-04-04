import axios from "axios";

// export const fetchImages = async () => {
//   const response = await axios.get('images/fetch-image')
//                     .then(resp => resp)
//                     .catch(error => error.response)
//   if( response.status >= 400) {
//     console.log("fetchImages errors", response.data) 
//     const error = {
//       status:response.status,
//       message: response.statusText,
//     }
//     console.log(error)
//     throw new Error(error)
//   }
//   return response.data
// }

export const fetchImages = () => {
  return axios.get('images/fetch-images').then(resp => resp.data); 
}

export const fetchImageDetail =(id) =>{
  console.log("fetchImageDetail api called")
  const imageDetail = axios.get(`images/fetch-image-detail/${id}`)
  const comments = axios.get(`images/allcomments/${id}`)
  return Promise 
        .all([imageDetail, comments])
        .then(([imageDetail, comments]) =>{
          const imageData = {...imageDetail.data, ...comments.data}
          return imageData
        })
}


export const addComment = (id, comment) =>{
  return axios.put(`images/add-comments/${id}`, comment).then(resp => resp.data);
}

export const loadComment = (id) =>{
  return axios.get(`images/allcomments/${id}`).then(resp => resp.data);
}

export const addLikes = (id) =>{
  return axios.put(`images/increment-likes/${id}`).then(resp => resp.data);
}

export const addImage = (value) =>{
  return axios.post(`images/add-images`, value).then(resp => resp.data);
}

export const deleteComment = (commentId, photoId) =>{
  return axios.delete(`images/delete-comment/${commentId}`, {data: {photoId:photoId}}).then(resp => resp.data);
}