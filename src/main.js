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

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: CreateConfig.stageW,
  height: CreateConfig.stageH,
  backgroundColor: '#efefef',
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
