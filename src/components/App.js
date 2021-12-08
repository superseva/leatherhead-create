import React from "react";
import { useState, useEffect } from "react"
import { AppSteps } from "../scenes/Config";

import Menu from "./Menu";
import Thumbs from "./Thumbs";

import "babel-polyfill";

const App = ({ game }) => {


    const [showStep, setShowStep] = useState(AppSteps.Avatars);
    const [selectedAvatar, setSelectedAvatar] = useState(null)

    // LOAD AVATARS ON LOAD
    useEffect(() => {
        const getAvatars = async () => {
            await changeStep(AppSteps.Avatars)
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
                    { id: "layer-bg", fileType: "png", path: "./assets/avatars/av1-bg.png" },
                    { id: "layer-body", fileType: "png", path: "./assets/avatars/av1-body.png" },
                    { id: "layer-mask", fileType: "png", path: "./assets/avatars/av1-mask.png" },
                    { id: "layer-weapon", fileType: "png", path: "./assets/avatars/av1-weapon.png" },
                ]
            },
            {
                id: "avatar2",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/av1.png",
                layers: [
                    { id: "layer-bg", fileType: "png", path: "./assets/avatars/av1-bg.png" },
                    { id: "layer-body", fileType: "png", path: "./assets/avatars/av1-body.png" },
                    { id: "layer-mask", fileType: "png", path: "./assets/avatars/av1-mask.png" },
                    { id: "layer-weapon", fileType: "png", path: "./assets/avatars/av1-weapon.png" },
                ]
            },
            {
                id: "avatar2",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/av1.png",
                layers: [
                    { id: "layer-bg", fileType: "png", path: "./assets/avatars/av1-bg.png" },
                    { id: "layer-body", fileType: "png", path: "./assets/avatars/av1-body.png" },
                    { id: "layer-mask", fileType: "png", path: "./assets/avatars/av1-mask.png" },
                    { id: "layer-weapon", fileType: "png", path: "./assets/avatars/av1-weapon.png" },
                ]
            },
            {
                id: "avatar2",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/av1.png",
                layers: [
                    { id: "layer-bg", fileType: "png", path: "./assets/avatars/av1-bg.png" },
                    { id: "layer-body", fileType: "png", path: "./assets/avatars/av1-body.png" },
                    { id: "layer-mask", fileType: "png", path: "./assets/avatars/av1-mask.png" },
                    { id: "layer-weapon", fileType: "png", path: "./assets/avatars/av1-weapon.png" },
                ]
            },
            {
                id: "avatar2",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/av1.png",
                layers: [
                    { id: "layer-bg", fileType: "png", path: "./assets/avatars/av1-bg.png" },
                    { id: "layer-body", fileType: "png", path: "./assets/avatars/av1-body.png" },
                    { id: "layer-mask", fileType: "png", path: "./assets/avatars/av1-mask.png" },
                    { id: "layer-weapon", fileType: "png", path: "./assets/avatars/av1-weapon.png" },
                ]
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
        setShowStep(step)
        // TODO tell phaser to change step too
        game.events.emit('changeStep', { step: step })

    }

    useEffect(async () => {
        if (showStep == AppSteps.Avatars) {
            await fetchAvatars()
        }
        else if (showStep == AppSteps.Stickers) {
            await fetchStickers()
        }
    }, [showStep])

    let onAvatarClick = (asset) => {
        console.warn(asset);
        setSelectedAvatar(asset)
        game.events.emit('addAsset', { id: asset.id, type: 'avatar', fileType: asset.fileType, path: asset.path });
    }

    let onStickerClick = (asset) => {
        //  console.log(asset);
        game.events.emit('addAsset', { id: asset.id, type: 'sticker', fileType: asset.fileType, path: asset.path })
    }

    let onAvatarLayerToggle = (layer) => {
        console.log(layer)
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
        <>
            {showStep == AppSteps.Avatars && selectedAvatar ?
                <div className="avatar-toolbar">
                    <img className='edit-btn' src='./assets/ui/btn-edit.png' onClick={(e) => { changeStep(AppSteps.AvatarLayers) }} />
                </div> : ''
            }
            {showStep == AppSteps.AvatarLayers && selectedAvatar ?
                <div className="avatar-toolbar">
                    <img className='edit-btn' src='./assets/ui/btn-edit-exit.png' onClick={(e) => { changeStep(AppSteps.Avatars) }} />
                </div> : ''
            }
            <div className="react-ui">
                <div className='gallery'>
                    {showStep == AppSteps.Avatars ? < Thumbs thumbs={avatars} onThumbClick={onAvatarClick} groupName='avatars' /> : ''}
                    {showStep == AppSteps.AvatarLayers ? <Thumbs thumbs={selectedAvatar.layers} onThumbClick={onAvatarLayerToggle} groupName='avatarLayers' /> : ''}
                    {showStep == AppSteps.Stickers ? <Thumbs thumbs={stickers} onThumbClick={onStickerClick} groupName='stickers' /> : ''}
                </div>
                {/* <Menu /> */}
                <div className="steps">
                    <div onClick={(e) => { changeStep(AppSteps.Avatars) }} className={`app-step-button ${showStep == AppSteps.Avatars ? 'selected' : ''}`}>
                        <label className='title'>AVATAR</label>
                        <label className='step-number'>1</label>
                    </div>
                    <div onClick={(e) => { changeStep(AppSteps.Stickers) }} className={`app-step-button ${showStep == AppSteps.Stickers ? 'selected' : ''}`}>
                        <label className='title'>STICKER</label>
                        <label className='step-number'>2</label>
                    </div>
                    <div onClick={(e) => { changeStep(AppSteps.Animate) }} className={`app-step-button ${showStep == AppSteps.Animate ? 'selected' : ''}`}>
                        <label className='title'>ANIMATE</label>
                        <label className='step-number'>3</label>
                    </div>
                    <div onClick={(e) => { changeStep(AppSteps.FX) }} className={`app-step-button ${showStep == AppSteps.FX ? 'selected' : ''}`}>
                        <label className='title'>AD FX</label>
                        <label className='step-number'>4</label>
                    </div>
                    <div onClick={getCreatedImage} className='app-step-button'>
                        <label className='title'>EXPORT</label>
                        <label className='step-number'>5</label>
                    </div>
                </div>
            </div >
        </>
    );
}

export default App