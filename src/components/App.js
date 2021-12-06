import React from "react";
import { useState, useEffect } from "react"

import Menu from "./Menu";
import Thumbs from "./Thumbs";

import "babel-polyfill";

function App({ game }) {

    const appSteps = ['avatars', 'stickers', 'effects', 'sounds', 'export'];
    const [showAvatars, setShowAvatars] = useState(false);
    const [showStickers, setShowStickers] = useState(false);



    // LOAD AVATARS ON LOAD
    useEffect(() => {
        const getAvatars = async () => {
            await changeStep('avatars')
        }
        getAvatars();
    }, [])

    const [avatars, setAvatars] = useState([])
    const fetchAvatars = async () => {
        //const res = await fetch("http://localhost:5000/avatars")
        //const data = await res.json();
        const data = [
            {
                id: "avatar1",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/D.jpg"
            },
            {
                id: "avatar2",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/E.jpg"
            },
            {
                id: "avatar3",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/F.jpg"
            }
        ]
        setAvatars(data);
    }

    const [stickers, setStickers] = useState([])
    const fetchStickers = async () => {
        //const res = await fetch("http://localhost:5000/stickers")
        // const data = await res.json();
        const data = [
            {
                id: "s1",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/PipeDream.png"
            },
            {
                id: "s2",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/ComedyCentral.png"
            },
            {
                id: "s3",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/Moo.png"
            },
            {
                id: "s4",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/PipeDream.png"
            },
            {
                id: "s5",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/ComedyCentral.png"
            },
            {
                id: "s6",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/Moo.png"
            }
        ]
        setStickers(data);
    }

    let changeStep = async (step) => {
        if (step == 'avatars') {
            setShowAvatars(true)
            setShowStickers(false)
            await fetchAvatars();
        } else if (step == 'stickers') {
            setShowAvatars(false)
            setShowStickers(true)
            await fetchStickers();
        }
        // TODO tell phaser to change step too
        game.events.emit('changeStep', { step: step })

    }

    let onAvatarClick = (asset) => {
        console.log(asset);
        game.events.emit('addAsset', { id: asset.id, type: 'avatar', fileType: asset.fileType, path: asset.path })
    }

    let onStickerClick = (asset) => {
        console.log(asset);
        game.events.emit('addAsset', { id: asset.id, type: 'sticker', fileType: asset.fileType, path: asset.path })
    }

    //Get json data cotaining used layers and prepared Base64 png from creator
    const getCreatedImage = async () => {
        try {
            const createdData = await game.exportImage();
            console.warn(JSON.stringify(createdData))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="react-ui">
            <div className='gallery'>
                {showAvatars && <Thumbs thumbs={avatars} onThumbClick={onAvatarClick} groupName='avatars' />}
                {showStickers && <Thumbs thumbs={stickers} onThumbClick={onStickerClick} groupName='stickers' />}
            </div>
            {/* <Menu /> */}
            <div className="steps">
                <button onClick={(e) => { changeStep('avatars') }}>1</button>
                <button onClick={(e) => { changeStep('stickers') }}>2</button>
                <button onClick={(e) => { changeStep('stickers') }}>3</button>
                <button onClick={(e) => { changeStep('stickers') }}>4</button>
                <button onClick={getCreatedImage}>5</button>
            </div>
        </div >
    );
}

export default App