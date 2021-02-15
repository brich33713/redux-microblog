import react, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from './Button'

const NewPost = () => {
    const {id} = useParams()

    //use ID from param to find post in state. Fill form with post data
    //if no post, form will be blank. When input is used, presence of id
    //is used to determine whether put or post request in hooks.js
    
    let post = (useSelector(store => store[Number(id)]))
    let postData = id ? post : {title:"",description:"",body:""}
    
    const [input,changeInput] = useState(postData)
    const handleChange = e => {
        const {name,value} = e.target;
        changeInput(()=>(
        {
            ...input,
            [name]:value
        }))
    }

    return (
        <div>
            <h1>New Post</h1>
        <form>
            <div>
                <label htmlFor="title">Title: </label>
                <div><input type="text" name="title" id="title" value={input.title} onChange={handleChange}/></div>
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <div><input type="text" name="description" id="description" value={input.description} onChange={handleChange}/></div>
            </div>
            <div>
                <label htmlFor="body">Body: </label>
                <div><textarea name="body" id="body" rows="15" col="140" value={input.body} onChange={handleChange}/></div>
            </div>
            <div>
                <Button firstBtn='Save' secondBtn='Cancel' input={input}/>
            </div>
        </form>
        </div>
    )
}

export default NewPost;