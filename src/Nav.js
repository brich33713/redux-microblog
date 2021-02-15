import react from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <h1>Microblog</h1>
            <p>Get in the Rithm of blogging!</p>
            <div>
                <NavLink exact to="/" style={{marginLeft: '4px', textDecoration: 'none'}}>Home</NavLink>
                <NavLink exact to="/new" style={{marginLeft: '4px', textDecoration: 'none'}}>Add a new post</NavLink>
            </div>
        </div>
    )
}

export default Nav;