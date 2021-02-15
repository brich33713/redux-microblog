import react, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComments, addPost, deleteComments, deletePost, editPost, changeVote } from './actionCreators'

const useButton = (firstBtn,secondBtn,input = "") => {
    const dispatch = useDispatch()
    const postID = useParams()
    const [data,ChangeData] = useState(null)
    const handleClick = (e) => {
        e.preventDefault()
        const {innerText} = e.target;
        if(innerText){

            if(innerText === 'Save'){
                //Saves post to state, by pulling data from form
                let data = input
                if(!postID.id){                
                    dispatch(addPost(data))
                } else {
                    dispatch(editPost(postID.id,data))
                }
            }

            if(innerText === 'X'){
                //Remove button and gets id from paragraph to delete comment from state
                const commentID = (e.target.parentNode.parentNode.parentNode.children[0].id)
                dispatch(deleteComments(postID.id,commentID))
            }

            if(innerText === 'Add'){
                const input = e.target.form[0].value
                e.target.form[0].value = ""
                dispatch(addComments({id:postID.id,text:input}))
            }

            if(innerText === 'Delete'){
                dispatch(deletePost(postID.id))
            }

            if(innerText === 'up' || innerText === 'down'){
                let id = e.target.parentNode.parentNode.parentNode.parentNode.id
                dispatch(changeVote(id,innerText))
            }
            ChangeData(innerText)
        } 
    }

    return [data,handleClick]
}


export {useButton}
