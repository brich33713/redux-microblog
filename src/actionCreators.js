import axios from 'axios'

export function fetchPosts(){
    return async function (dispatch) {
        const {data} = await axios.get(`http://localhost:3001/api/posts/`)
        dispatch(gotPosts(data))
    }
}

export function gotPosts(posts){
    posts.map(post => {
        post.comments = [{id:'none',text:'No comments yet'}]
        })
    return {
        type: 'GET_POSTS',
        posts
    }
}

export function fetchComments(id){
    return async function (dispatch) {
        id++;
        const {data} = await axios.get(`http://localhost:3001/api/posts/${id}/comments`)
        id--;
        dispatch(gotComments(data,id))
    }
}


export function gotComments(text,id){
    return {
        type: 'GET_COMMENTS',
        text,
        id
    }
}

export function deleteComments(id,commentID){
    return async function(dispatch){
        id++;
        await axios.delete(`http://localhost:3001/api/posts/${id}/comments/${commentID}`)
        const {data} = await axios.get(`http://localhost:3001/api/posts/${id}/comments`)
        id--;
        dispatch(gotComments(data,id))
    }
}

export function addComments(data){
    return async function(dispatch){
        let {text,id} = data;
        id++;
        await axios.post(`http://localhost:3001/api/posts/${id}/comments`,{text})
        const comments = await axios.get(`http://localhost:3001/api/posts/${id}/comments`)
        id--;
        dispatch(gotComments(comments.data,id))
    }
}

export function addPost(data){
    return async function(dispatch){
        await axios.post(`http://localhost:3001/api/posts/`,data)
        dispatch(gotPost())
    }
}

export function editPost(id,data){
    return async function(dispatch){
        id++;
        let message = await axios.put(`http://localhost:3001/api/posts/${id}`,data)
        dispatch(gotPost())
    }
}

export function deletePost(id){
    return async function(dispatch){
        id++;
        await axios.delete(`http://localhost:3001/api/posts/${id}`)
        dispatch(gotPost())
    }
}

export function gotPost(){
    return {
        type: 'ADD_OR_EDIT_STORY'
    }
}

export function changeVote(id,direction){
    return async function(dispatch){
        id++;
        await axios.post(`http://localhost:3001/api/posts/${id}/vote/${direction}`)
        const {data} = await axios.get(`http://localhost:3001/api/posts/${id}`)
        id--;
        dispatch(gotVotes(id,data))
    }
}

export function gotVotes(id,post){
    return {
        type: 'VOTING',
        id,
        post
    }

}