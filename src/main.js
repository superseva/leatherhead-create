import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import CreateScene from "./scenes/CreateScene";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { CreateConfig } from "./scenes/Config";

import OutlinePipelinePlugin from 'phaser3-rex-plugins/plugins/outlinepipeline-plugin.js';
import DragPlugin from 'phaser3-rex-plugins/plugins/drag-plugin.js';
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
import CrossStitchingPipelinePlugin from 'phaser3-rex-plugins/plugins/crossstitchingpipeline-plugin.js';
import PixelationPipelinePlugin from 'phaser3-rex-plugins/plugins/pixelationpipeline-plugin.js';
import ToonifyPipelinePlugin from 'phaser3-rex-plugins/plugins/toonifypipeline-plugin.js';
import FishEyePipelinePlugin from 'phaser3-rex-plugins/plugins/fisheyepipeline-plugin.js';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: CreateConfig.stageW,
  height: CreateConfig.stageH,
  backgroundColor: '#000000',
  preserveDrawingBuffer: true,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    global: [{
      key: 'rexDrag',
      plugin: DragPlugin,
      start: true
    }, {
      key: 'rexOutlinePipeline',
      plugin: OutlinePipelinePlugin,
      start: true
    },
    {
      key: 'rexCrossStitchingPipeline',
      plugin: CrossStitchingPipelinePlugin,
      start: true
    },
    {
      key: 'rexPixelationPipeline',
      plugin: PixelationPipelinePlugin,
      start: true
    },
    {
      key: 'rexToonifyPipeline',
      plugin: ToonifyPipelinePlugin,
      start: true
    },
    {
      key: 'rexFishEyePipeline',
      plugin: FishEyePipelinePlugin,
      start: true
    }
    ],
    scene: [{
      key: 'rexGestures',
      plugin: GesturesPlugin,
      mapping: 'rexGestures'
    }]
  },
  scene: [
    BootScene,
    CreateScene
  ]
});

ReactDOM.render(
  <React.StrictMode>
    <App game={game} />
  </React.StrictMode>,
  document.getElementById("react")
);

// Fix reading Viewport Height  for mobiles
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
// listen on resize too
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});



