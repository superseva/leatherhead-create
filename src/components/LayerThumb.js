import React from 'react'
const LayerThumb = ({ thumb, onThumbClick, groupId }) => {
    return (
        <img className={`thumb-layer ${thumb.visible ? 'selected' : 'deselected'}`} src={thumb.thumb} onClick={() => onThumbClick(thumb, groupId)}></img>
    )
}

export default LayerThumb
