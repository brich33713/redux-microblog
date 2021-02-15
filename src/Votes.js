import react from 'react'
import Button from './Button'

const Votes = ({votes}) => {
    return (
        <div>
            <p>{votes}</p>
            <Button firstBtn='up' secondBtn='down' />
        </div>
    )
}

export default Votes;