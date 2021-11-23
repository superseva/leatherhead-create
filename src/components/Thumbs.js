import React from 'react'
import Thumb from './Thumb'

const Thumbs = ({ thumbs, onThumbClick }) => {
    return (
        <>
            {thumbs.map((thumb) => (<Thumb key={thumb.id} thumb={thumb} onThumbClick={onThumbClick} />))}
        </>
    )
}

export default Thumbs
