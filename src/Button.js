import react, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useButton } from './hooks'
import NewPost from './NewPost'

//creating button component return two buttons using props
const Button = ({firstBtn,secondBtn,input = ""}) => {
    const [postData,handleClick] = useButton(firstBtn,secondBtn,input)
    if(postData !== null){
        if(postData === 'Save' || postData === 'Cancel'){
            return <Redirect to="/" />
        } else if(postData === 'Edit'){
            let path = `/edit/${input}`
            return <Redirect to={path} />
        }
    }

    return (
        <div>
            {firstBtn && <div>
                <button name={firstBtn} id={firstBtn} onClick={handleClick}>{firstBtn}</button>
            </div>}
            {secondBtn && <div>
                <button name={secondBtn} id={secondBtn} onClick={handleClick}>{secondBtn}</button>
            </div>}
        </div>
    )
}

export default Button;