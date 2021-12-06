import React from 'react'
import Thumb from './Thumb'

const Thumbs = ({ thumbs, onThumbClick, groupName }) => {
    return (
        <div className="thumbs" data-group={groupName} >
            {thumbs.map((thumb) => (<Thumb key={thumb.id} thumb={thumb} onThumbClick={onThumbClick} />))}
        </div>
    )
}

export default Thumbs
