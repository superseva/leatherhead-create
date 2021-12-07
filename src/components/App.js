import React from "react";
import { useState, useEffect } from "react"

import Menu from "./Menu";
import Thumbs from "./Thumbs";

import "babel-polyfill";

const App = ({ game }) => {

    const appSteps = ['avatars', 'stickers', 'animate', 'fx', 'export'];
    const [showAvatars, setShowAvatars] = useState(false);
    const [showStickers, setShowStickers] = useState(false);
    const [showAnimate, setShowAnimate] = useState(false);
    const [showFX, setShowFX] = useState(false);

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
                path: "./assets/avatars/av1.png",
                layers: [
                    { id: "layer-bg", fileType: "png", path: "./assets/avatars/av1-background.png" },
                    { id: "layer-body", fileType: "png", path: "./assets/avatars/av1-body.png" },
                    { id: "layer-mask", fileType: "png", path: "./assets/avatars/av1-mask.png" },
                    { id: "layer-weapon", fileType: "png", path: "./assets/avatars/av1-weapon.png" },
                ]
            },
            {
                id: "avatar2",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/D.jpg"
            },
            {
                id: "avatar3",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/E.jpg"
            },
            {
                id: "avatar4",
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
            setShowAnimate(false)
            setShowFX(false)
            await fetchAvatars()
        } else if (step == 'stickers') {
            setShowAvatars(false)
            setShowStickers(true)
            setShowAnimate(false)
            setShowFX(false)
            await fetchStickers()
        }
        else if (step == 'animate') {
            setShowAvatars(false)
            setShowStickers(false)
            setShowAnimate(true)
            setShowFX(false)
            //await fetchStickers()
        }
        else if (step == 'fx') {
            setShowAvatars(false)
            setShowStickers(false)
            setShowAnimate(false)
            setShowFX(true)
            //await fetchStickers()
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
                <div onClick={(e) => { changeStep('avatars') }} className={`app-step-button ${showAvatars ? 'selected' : ''}`}>
                    <label className='title'>AVATAR</label>
                    <label className='step-number'>1</label>
                </div>
                <div onClick={(e) => { changeStep('stickers') }} className={`app-step-button ${showStickers ? 'selected' : ''}`}>
                    <label className='title'>STICKER</label>
                    <label className='step-number'>2</label>
                </div>
                <div onClick={(e) => { changeStep('animate') }} className={`app-step-button ${showAnimate ? 'selected' : ''}`}>
                    <label className='title'>ANIMATE</label>
                    <label className='step-number'>3</label>
                </div>
                <div onClick={(e) => { changeStep('fx') }} className={`app-step-button ${showFX ? 'selected' : ''}`}>
                    <label className='title'>AD FX</label>
                    <label className='step-number'>4</label>
                </div>
                <div onClick={getCreatedImage} className='app-step-button'>
                    <label className='title'>EXPORT</label>
                    <label className='step-number'>5</label>
                </div>
            </div>
        </div >
    );
}

export default App