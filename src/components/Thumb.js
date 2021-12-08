import React from 'react'
const Thumb = ({ thumb, onThumbClick, groupId }) => {
    return (
        <img className={thumb.visible ? "thumb is-visible" : "thumb is-invisibile"} src={thumb.thumb} onClick={() => onThumbClick(thumb, groupId)}></img>
    )
}

export default Thumb
