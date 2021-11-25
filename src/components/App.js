import React from "react";
import { useState } from "react"

import Menu from "./Menu";
import Thumbs from "./Thumbs";

function App({ game }) {
    const [avatars, setAvatar] = useState([
        {
            id: 'avatar1',
            type: 'avatar',
            fileType: 'png',
            path: './assets/avatars/D.jpg'
        },
        {
            id: 'avatar2',
            type: 'avatar',
            fileType: 'png',
            path: './assets/avatars/E.jpg'
        },
        {
            id: 'avatar3',
            type: 'avatar',
            fileType: 'png',
            path: './assets/avatars/F.jpg'
        }
    ])

    const [stickers, setSticker] = useState([
        {
            id: 's1',
            type: 'sticker',
            fileType: 'png',
            path: './assets/stickers/PipeDream.png'
        },
        {
            id: 's2',
            type: 'sticker',
            fileType: 'png',
            path: './assets/stickers/ComedyCentral.png'
        },
        {
            id: 's3',
            type: 'sticker',
            fileType: 'png',
            path: './assets/stickers/Moo.png'
        }
    ])

    let onAvatarClick = (asset) => {
        console.log(asset);
        game.events.emit('addAsset', { id: asset.id, type: 'avatar', fileType: asset.fileType, path: asset.path })
    }

    let onStickerClick = (asset) => {
        console.log(asset);
        game.events.emit('addAsset', { id: asset.id, type: 'sticker', fileType: asset.fileType, path: asset.path })
    }

    //Get json data cotaining used layers and prepared Base64 png from creator
    let getCreatedImage = () => {
        try {
            const createdData = game.exportImage();
            console.warn(createdData)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h1>REACT WITH ASSETS</h1>
            <button onClick={getCreatedImage}>Export Image</button>
            {/* <Menu /> */}
            <h3>Avatars</h3>
            <Thumbs thumbs={avatars} onThumbClick={onAvatarClick} />
            <h3>Stickers</h3>
            <Thumbs thumbs={stickers} onThumbClick={onStickerClick} />

        </div >
    );
}

export default App