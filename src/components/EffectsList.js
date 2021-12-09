import React from 'react'
import EffectThumb from './EffectThumb'

const EffectsList = ({ thumbs, onThumbClick, groupName, groupId, selectedEffect }) => {
    return (
        <>
            {thumbs.map((thumb) => (<EffectThumb key={thumb.id} thumb={thumb} groupId={groupId} onThumbClick={onThumbClick} selectedEffect={selectedEffect} />))}
        </>
    )
}

export default EffectsList