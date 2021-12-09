import React from 'react'
const EffectThumb = ({ thumb, onThumbClick, groupId, selectedEffect }) => {
    return (
        <p className={`thumb-effect ${thumb.id === selectedEffect ? 'selected' : 'deselected'}`} onClick={() => onThumbClick(thumb, groupId)}>{thumb.name}</p>
    )
}

export default EffectThumb
