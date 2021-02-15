import { act } from 'react-dom/test-utils';
import {v4 as uuid } from 'uuid'

const INITIAL_STATE = (localStorage.state) ? JSON.parse(localStorage.state) : {0:{
    title:"title",
    body:"test paragraph",
    comments:[{id:'first',comment:"test comment"},{id:'second', comment:"test comment2"}]
}}

const RootReducer = (state = INITIAL_STATE,action) => {
    let stateCopy;
    let id;

    switch (action.type) {
        case 'GET_POSTS':
            action.posts.sort((a,b) => {
                return b.votes - a.votes
            })
            localStorage.setItem('state',JSON.stringify(action.posts))
            return action.posts

        case 'GET_COMMENTS':
            stateCopy = {...state}
            stateCopy[action.id].comments = action.text
            if(stateCopy[action.id].comments.length === 0){
                stateCopy[action.id].comments = [{id:'none',text:"No comments yet"}]
            }
            localStorage.setItem('state',JSON.stringify({...state,...stateCopy}))
            return {...state,...stateCopy}
        
        case 'VOTING':
            const update = action.post
            return({...state,[action.id]:update})

        default:
            return state;
    }
}

export default RootReducer;