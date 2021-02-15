import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { fetchComments } from './actionCreators';
import Button from './Button'
import Votes from './Votes'

const Post = () => {
    const [isLoading,changeLoading] = useState(true)
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(async()=>{
        await dispatch(fetchComments(id))
        changeLoading(false)
    },[])

    let post = (useSelector(store => store[id]))
    let commentAdder = useSelector(store => store[id].comments)

    const [input,changeInput] = useState()
    const handleChange = e => {
        const {name,value} = e.target;
        changeInput(()=>(
        {
            ...input,
            [name]:value
        }))
    }

    if(!post){
        return <Redirect to="/" />
    }

    return (
        <div>
            <div>
                <div style={{width:'100%',float:'left',margin:'1.66px'}}>
                    <h1>{post.title}</h1>
                    <Votes votes={post.votes} />
                    <h3>{post.description}</h3>
                </div>
                <div>
                    <p>{post.body}</p>
                </div>
                <div>
                    <Button firstBtn='Edit' secondBtn='Delete' input={id} />
                </div>
                <hr></hr>
                <h2>Comments</h2>
                {!isLoading && <div>
                {post.comments.map(comment => (
                    <div key={comment.id}>
                    <p id={comment.id}>{comment.text}</p>
                    {comment.text !== 'No comments yet' && <Button firstBtn='X' />}
                    </div>
                    ))}
                </div>}
                <div style={{margin: '50px'}}>
                    <form>
                        <label htmlFor="newComment">Comment: </label>
                        <input type="text" name="newComment" id="newComment" placeholder="New Comment" onChange={handleChange}/>
                        <Button firstBtn='Add' input={input} />
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Post;