import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from './actionCreators';
import Votes from './Votes';

const Home = () => {
    let idArray = []
    let dispatch = useDispatch()
    useEffect(async()=>{
        dispatch(fetchPosts())
        
    },[])

    let posts = useSelector(store => store)

    for(let id in posts){
        idArray.push(id)
    }

    

    return (
        <div>
            <p>Welcome to <strong>Microblog</strong>, our innovative site for communicating on the information superhighway</p>
            {idArray.map(id => (
            
            <div key={id} id={id}>
                <Link to={id}><h3>{posts[Number(id)].title}</h3></Link>
                <h3>{posts[Number(id)].description}</h3>
                <Votes votes={posts[Number(id)].votes} />
            </div>
            ))}
        </div>
    )
}

export default Home;
