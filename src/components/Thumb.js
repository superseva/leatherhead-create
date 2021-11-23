import React from 'react'
const Thumb = ({ thumb, onThumbClick }) => {
    return (
        <img className='thumb' src={thumb.path} onClick={() => onThumbClick(thumb)}></img>
    )
}

export default Thumb
