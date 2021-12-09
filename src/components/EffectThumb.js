import React from 'react'
const EffectThumb = ({ thumb, onThumbClick, groupId, selectedEffect }) => {
    return (
        <button className={`thumb-effect ${thumb.id === selectedEffect ? 'selected' : 'deselected'}`} onClick={() => onThumbClick(thumb, groupId)}>{thumb.name}</button>
    )
}

export default EffectThumb
