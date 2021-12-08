import React from 'react'
import Thumb from './Thumb'

const Thumbs = ({ thumbs, onThumbClick, groupName, groupId }) => {
    return (
        <div className="thumbs" data-group={groupName} >
            {thumbs.map((thumb) => (<Thumb key={thumb.id} thumb={thumb} groupId={groupId} onThumbClick={onThumbClick} />))}
        </div>
    )
}

export default Thumbs
