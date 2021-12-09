import React from "react";
import { useState, useEffect } from "react"
import { AppSteps } from "../scenes/Config";

import Menu from "./Menu";
import Thumbs from "./Thumbs";
import LayerThumbs from "./LayerThumbs";
import EffectsList from "./EffectsList";
import { CreateConfig } from "../scenes/Config";

import "babel-polyfill";

const App = ({ game }) => {

    /* STATES */
    const [showStep, setShowStep] = useState(AppSteps.Avatars);
    const [selectedAvatar, setSelectedAvatar] = useState(-1)
    const [avatars, setAvatars] = useState([])
    const [stickers, setStickers] = useState([])
    const [selectedAvatarEffect, setSelectedAvatarEffect] = useState('')
    const [selectedStickersEffect, setSelectedStickersEffect] = useState('')
    const [effects, setEffects] = useState({ avatarFXList: [], stickersFXList: [] })

    /* LOAD AVATARS ON START */
    useEffect(() => {
        const getAvatars = async () => {
            await changeStep(AppSteps.Avatars)
        }
        getAvatars();
    }, [])

    /* FETCH RESONSES FROM SERVER */
    const fetchAvatars = async () => {
        //const res = await fetch("http://localhost:5000/avatars")
        //const data = await res.json();
        const data = [
            {
                id: "avatar1",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/av1.png",
                thumb: "./assets/avatars/av1.png",
                layers: [
                    { id: "av-1-layer-bg", name: "Some layer name", fileType: "png", path: "./assets/avatars/av1-bg.png", thumb: "./assets/avatars/av1-bg.png", visible: true },
                    { id: "av-1-layer-body", name: "Some layer name", fileType: "png", path: "./assets/avatars/av1-body.png", thumb: "./assets/avatars/av1-body.png", visible: true },
                    { id: "av-1-layer-mask", name: "Some layer name", fileType: "png", path: "./assets/avatars/av1-mask.png", thumb: "./assets/avatars/av1-mask.png", visible: true },
                    { id: "av-1-layer-weapon", name: "Some layer name", fileType: "png", path: "./assets/avatars/av1-weapon.png", thumb: "./assets/avatars/av1-mask.png", visible: true }
                ]
            },
            {
                id: "avatar2",
                type: "avatar",
                fileType: "png",
                path: "./assets/avatars/av2.png",
                thumb: "./assets/avatars/av2.png",
                layers: [
                    { id: "av2-layer-bg", name: "Some layer name", fileType: "png", path: "./assets/avatars/av2-bg.png", thumb: "./assets/avatars/av2-bg.png", visible: true },
                    { id: "av2-layer-body", name: "Some layer name", fileType: "png", path: "./assets/avatars/av2-body.png", thumb: "./assets/avatars/av2-body.png", visible: true },
                    { id: "av2-layer-mask", name: "Some layer name", fileType: "png", path: "./assets/avatars/av2-mask.png", thumb: "./assets/avatars/av2-mask.png", visible: true }
                ]
            }
        ]
        setAvatars(data);
    }

    const fetchStickers = async () => {
        //const res = await fetch("http://localhost:5000/stickers")
        // const data = await res.json();
        const data = [
            {
                id: "s1",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/PipeDream.png",
                thumb: "./assets/stickers/PipeDream.png"
            },
            {
                id: "s2",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/ComedyCentral.png",
                thumb: "./assets/stickers/ComedyCentral.png"
            },
            {
                id: "s3",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/Moo.png",
                thumb: "./assets/stickers/Moo.png"
            },
            {
                id: "s4",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/PipeDream.png",
                thumb: "./assets/stickers/PipeDream.png"
            },
            {
                id: "s5",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/ComedyCentral.png",
                thumb: "./assets/stickers/ComedyCentral.png"
            },
            {
                id: "s6",
                type: "sticker",
                fileType: "png",
                path: "./assets/stickers/Moo.png",
                thumb: "./assets/stickers/Moo.png"
            }
        ]
        setStickers(data);
    }

    const fetchEffects = async () => {
        //const res = await fetch("http://localhost:5000/effects")
        //const data = await res.json();
        const data = {
            avatarFXList: [
                { id: 'rexCrossStitchingPipeline', name: 'Cross-stitching' },
                { id: 'rexPixelationPipeline', name: 'Pixelation' },
                { id: 'rexToonifyPipeline', name: 'Toonify' },
                {
                    id: 'rexFishEyePipeline', name: 'Fish eye', config: {
                        center: { x: CreateConfig.stageW / 2, y: CreateConfig.stageH / 2 },
                        radius: CreateConfig.stageW,
                        intensity: 0.5,
                        mode: 1
                    }
                }
            ],
            stickersFXList: [
                { id: 'rexPixelationPipeline', name: 'Pixelation' },
                { id: 'rexToonifyPipeline', name: 'Toonify' },
                {
                    id: 'rexFishEyePipeline', name: 'Fish eye', config: {
                        center: { x: CreateConfig.stageW / 2, y: CreateConfig.stageH / 2 },
                        radius: CreateConfig.stageW,
                        intensity: 0.5,
                        mode: 1
                    }
                }
            ]
        }

        setEffects(data);
    }

    /* Changing Application Step */
    //change step state and update Phaser
    let changeStep = async (step) => {
        setShowStep(step)
        game.events.emit('changeStep', { step: step })
    }
    // react when app step state changes
    useEffect(async () => {
        if (showStep == AppSteps.Avatars) {
            if (!avatars.length)
                await fetchAvatars()
        }
        else if (showStep == AppSteps.Stickers) {
            if (!stickers.length)
                await fetchStickers()
        }
        else if (showStep == AppSteps.FX) {
            if (!effects.avatarFXList.length)
                await fetchEffects()
        }
    }, [showStep])

    /* Tell Phaser to load the selected avatar */
    let onAvatarClick = (avatar) => {
        let avatarIndex = avatars.findIndex(av => av.id === avatar.id)
        setSelectedAvatar(avatarIndex)
        game.events.emit('addAvatar', avatar);
    }

    /* Tell Phaser to load the selected sticker */
    let onStickerClick = (asset) => {
        game.events.emit('addAsset', { id: asset.id, type: 'sticker', fileType: asset.fileType, path: asset.path })
    }

    /* Tell Phaser to activate avatar FX */
    let onAvatarFXClick = (effect) => {
        if (selectedAvatarEffect == effect.id) {
            setSelectedAvatarEffect('')
            game.events.emit('removeFX', { ...effect, container: 'avatar' })
        } else {
            setSelectedAvatarEffect(effect.id)
            game.events.emit('addFX', { ...effect, container: 'avatar' })
        }
    }

    /* Tell Phaser to activate sticker FX */
    let onStickersFXClick = (effect) => {
        console.log(effect)
        if (selectedStickersEffect == effect.id) {
            setSelectedStickersEffect('')
            game.events.emit('removeFX', { ...effect, container: 'stickers' })
        } else {
            setSelectedStickersEffect(effect.id)
            game.events.emit('addFX', { ...effect, container: 'stickers' })
        }
    }

    /* Toggle the Visibility of the Avatar's Layer */
    let onAvatarLayerToggle = (layer, groupId) => {
        let newarray = avatars.map((avatar) => avatar.id === groupId ?
            modifyLayers(avatar, layer) : avatar
        )
        setAvatars(newarray)
        game.events.emit('avatarLayerToggle', layer)
    }

    const modifyLayers = (a, layer) => {
        const modA = { ...a }
        modA.layers.map((lyr) => {
            if (lyr.id === layer.id)
                lyr.visible = !layer.visible
            return lyr
        })
        return modA
    }

    /* Get JSON data cotaining used layers and prepared Base64 png from creator */
    const getCreatedImage = async () => {
        try {
            const createdData = await game.exportImage();
            console.warn(JSON.stringify(createdData))
        } catch (e) {
            console.log(e)
        }
    }

    /* RENDER */

    return (
        <>
            {showStep == AppSteps.Avatars && selectedAvatar > -1 ?
                <div className="avatar-toolbar">
                    <img className='edit-btn' src='./assets/ui/btn-edit.png' onClick={(e) => { changeStep(AppSteps.AvatarLayers) }} />
                </div> : ''
            }
            {showStep == AppSteps.AvatarLayers && selectedAvatar > -1 ?
                <div className="avatar-toolbar">
                    <img className='edit-btn' src='./assets/ui/btn-edit-exit.png' onClick={(e) => { changeStep(AppSteps.Avatars) }} />
                </div> : ''
            }
            <div className="react-ui">
                <div className='gallery'>
                    {showStep == AppSteps.Avatars ? < Thumbs thumbs={avatars} onThumbClick={onAvatarClick} groupName='avatars' /> : ''}
                    {showStep == AppSteps.AvatarLayers ? <LayerThumbs thumbs={avatars[selectedAvatar].layers} groupId={avatars[selectedAvatar].id} onThumbClick={onAvatarLayerToggle} groupName='avatarLayers' /> : ''}
                    {showStep == AppSteps.Stickers ? <Thumbs thumbs={stickers} onThumbClick={onStickerClick} groupName='stickers' /> : ''}
                    {showStep == AppSteps.FX ?
                        <div className='effect-galery'>
                            <div className='effect-list'>
                                <h3>Avatar Effects</h3>
                                <EffectsList thumbs={effects.avatarFXList} onThumbClick={onAvatarFXClick} groupName='effects' selectedEffect={selectedAvatarEffect} />
                            </div>
                            <div className='effect-list'>
                                <h3>Stickers Effects</h3>
                                <EffectsList thumbs={effects.stickersFXList} onThumbClick={onStickersFXClick} groupName='effects' selectedEffect={selectedStickersEffect} />
                            </div>
                        </div>
                        : ''}

                </div>

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