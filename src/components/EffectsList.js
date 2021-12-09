import React from 'react'
import EffectThumb from './EffectThumb'

const EffectsList = ({ thumbs, onThumbClick, groupName, groupId, selectedEffect }) => {
    return (
        <div>
            <div>Apply to Avatar</div>
            <div>Apply to Stickers</div>
            <div className="thumbs" data-group={groupName}>
                {thumbs.map((thumb) => (<EffectThumb key={thumb.id} thumb={thumb} groupId={groupId} onThumbClick={onThumbClick} selectedEffect={selectedEffect} />))}
            </div>
        </div>

    )
}

export default EffectsList