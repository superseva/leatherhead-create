import React from 'react'
import LayerThumb from './LayerThumb'

const LayerThumbs = ({ thumbs, onThumbClick, groupName, groupId }) => {
    return (
        <div className="thumbs" data-group={groupName} >
            {thumbs.map((thumb) => (<LayerThumb key={thumb.id} thumb={thumb} groupId={groupId} onThumbClick={onThumbClick} />))}
        </div>
    )
}

export default LayerThumbs
