import { UI, CreateConfig, AppSteps } from "./Config";


export default class CreateScene extends Phaser.Scene {
  constructor() {
    super('CreateScene')
    this.selectedObject;
    this.selectedAvatar = {};
    //this.uiButtons = [UI.ScaleUp, UI.ScaleDown, UI.RotateLeft, UI.RotateRight, UI.MoveFront, UI.MoveBack, UI.Lock, UI.Delete];
    this.uiButtons = [UI.MoveFront, UI.MoveBack, UI.Lock, UI.Delete];
    this.step = 'avatars';
  }

  preload() {
    this.load.image(UI.ScaleUp, './assets/ui/Icon-Scale.png');
    this.load.image(UI.ScaleDown, './assets/ui/Icon-ScaleDown.png');
    this.load.image(UI.RotateLeft, './assets/ui/Icon-Rotate.png');
    this.load.image(UI.RotateRight, './assets/ui/Icon-Rotate-R.png');
    this.load.image(UI.MoveFront, './assets/ui/Icon-Layer-Up.png');
    this.load.image(UI.MoveBack, './assets/ui/Icon-Layer-Down.png');
    this.load.image(UI.Lock, './assets/ui/Icon-Lock.png');
    this.load.image(UI.Delete, './assets/ui/Icon-Trash.png');

    this.load.html('uiTranform', './assets/phaser-ui/transform.html');
  }

  create() {
    // * Prep Function for the React
    this.game.exportImage = this.exportImage;

    this.postFxPlugin = this.plugins.get('rexOutlinePipeline');
    this.initiateGestures();

    // * Containers
    this.screenZone = this.add.zone(0, 0, CreateConfig.stageW, CreateConfig.stageH);
    this.avatarContainer = this.add.container(0, 0);
    this.avatarContainer.name = 'avatarContainer';
    this.stickerContainer = this.add.container(0, 0);
    this.stickerContainer.name = 'stickerContainer';
    this.uiContainer = this.add.container(0, 0);
    this.uiContainer.name = 'uiContainer';
    // * UI
    this.transformUI = this.add.dom(0, 0).createFromCache('uiTranform');
    this.transformUI.setOrigin(0);

    this.uiBg = this.add.rectangle(0, 0, CreateConfig.stageW, 60, 0x000000)
    this.uiBg.setAlpha(0.6)
    this.uiBg.setOrigin(0, 0)
    this.uiContainer.add(this.uiBg);
    const _spacing = CreateConfig.stageW / this.uiButtons.length;
    for (let i = 0; i < this.uiButtons.length; i++) {
      let btn = this.add.image(_spacing * i + 20, 5, this.uiButtons[i]);
      btn.setScale(0.2)
      btn.name = this.uiButtons[i];
      btn.setOrigin(0, 0);
      btn.setInteractive()
      btn.on('pointerdown', () => {
        this.onBtnClick(btn);
      });
      this.uiContainer.add(btn);
    }
    this.toggleUiContainer();

    //Catch the event from the React
    this.game.events.on('addAsset', this.addAsset.bind(this));
    this.game.events.on('addAvatar', this.addAvatar.bind(this));
    this.game.events.on('avatarLayerToggle', this.onAvatarLayerToggle.bind(this));
    this.game.events.on('changeStep', this.onChangeStep.bind(this));
  }

  /* UI METHODS */
  onChangeStep(context) {
    //clear UI
    this.step = context.step;
    this.deselectAsset();
    //console.warn(`STEP: ${this.step}`)
    if (this.step == AppSteps.Avatars) {
      this.stickerContainer.setAlpha(0.2)
    }
    if (this.step == AppSteps.Stickers) {
      this.stickerContainer.setAlpha(1)
    }

  }

  onAvatarLayerToggle(context) {
    const child = this.avatarContainer.getByName(context.id);
    if (!child)
      return;

    child.setAlpha(child.alpha < 1 ? 1 : 0)
  }

  onRemoveObject() {
    if (this.selectedObject) {
      this.postFxPlugin.remove(this.selectedObject);
      this.selectedObject.destroy();
      this.selectedObject = null;
      this.deselectAsset();
    }
  }

  onMoveDown() {
    if (!this.selectedObject)
      return;
    this.selectedObject.parentContainer.moveDown(this.selectedObject);
  }

  onMoveUp() {
    if (!this.selectedObject)
      return;
    this.selectedObject.parentContainer.moveUp(this.selectedObject);
  }

  onRotate(direction) {
    if (!this.selectedObject)
      return;
    this.selectedObject.setRotation(this.selectedObject.rotation - CreateConfig.rotationStep * direction)
  }

  onScale(scale) {
    if (!this.selectedObject)
      return;
    this.selectedObject.setScale(this.selectedObject.scale + CreateConfig.scaleStep * scale)
  }

  onLock() {
    if (!this.selectedObject)
      return;
    this.selectedObject.setData('locked', !this.selectedObject.getData('locked'))
  }

  onBtnClick(btn) {
    if (!this.selectedObject) {
      console.log(`${btn.name} clicked but no object is selected`)
      return;
    }
    //console.log(btn.name)
    if (btn.name === UI.Delete) {
      this.onRemoveObject()
    }
    else if (btn.name === UI.MoveBack) {
      this.onMoveDown()
    }
    else if (btn.name === UI.MoveFront) {
      this.onMoveUp()
    }
    else if (btn.name === UI.RotateRight) {
      this.onRotate(1)
    }
    else if (btn.name === UI.RotateLeft) {
      this.onRotate(-1)
    }
    else if (btn.name === UI.ScaleUp) {
      this.onScale(1)
    }
    else if (btn.name === UI.ScaleDown) {
      this.onScale(-1)
    }
    else if (btn.name === UI.Lock) {
      this.onLock()
    }
  }

  toggleUiContainer() {
    if (this.selectedObject != null) {
      this.uiContainer.setVisible(true)
    }
    else {
      this.uiContainer.setVisible(false)
    }
  }

  /* OBJECTS METHODS */

  fitToCenter(asset) {
    let w = asset.width
    let h = asset.height
    const _offsetType = "max"
    const px = CreateConfig.stageW / w;
    const py = CreateConfig.stageH / h;
    const div = _offsetType == "max" ? Math.max(px, py) : Math.min(px, py);
    w *= div;
    h *= div;
    const scale = w / asset.displayWidth
    asset.setScale(scale)
    let x = (CreateConfig.stageW / 2);
    let y = (CreateConfig.stageH / 2);
    asset.setPosition(x, y)
  }

  addAsset({ id, type, fileType, path }) {
    const card = this.add.image(0, 0, id);
    card.setData('assetData', { ...arguments[0] })
    card.setData('locked', false)
    let loader = new Phaser.Loader.LoaderPlugin(this);
    loader.image(id, path);
    loader.once(Phaser.Loader.Events.COMPLETE, () => {
      card.setTexture(id)
      if (type == 'avatar') {
        this.avatarContainer.removeAll(true);
        this.avatarContainer.add(card)
      }
      else if (type == 'sticker') {
        card.setData('type', 'sticker')
        this.stickerContainer.add(card)
      }
      this.fitToCenter(card)
      card.setInteractive({ pixelPerfect: true, alphaTolerance: 1 });
      card.on('pointerdown', () => { this.onAssetClicked(card) });
    });
    loader.start();
  }

  addAvatar(avatar) {
    // todo if it's already the same avatar just display it dont load it.
    if (this.selectedAvatar.id != avatar.id) {
      this.avatarContainer.removeAll(true);
      let loader = new Phaser.Loader.LoaderPlugin(this);
      avatar.layers.forEach((avatarLayer) => {
        loader.image(avatarLayer.id, avatarLayer.path);
      });
      loader.once(Phaser.Loader.Events.COMPLETE, () => {
        this.selectedAvatar.id = avatar.id
        for (let a = 0; a < avatar.layers.length; a++) {
          let card = this.add.image(0, 0, avatar.layers[a].id);
          card.name = avatar.layers[a].id;
          card.setAlpha(avatar.layers[a].visible ? 1 : 0)
          this.fitToCenter(card)
          this.avatarContainer.add(card)
        }
      })
      loader.start();
    }
  }

  onAssetClicked(obj) {
    if (this.step != AppSteps.Stickers) {
      console.warn('Cant Select Assets unless in step STICKERS');
      return;
    }


    if (obj.getData('assetData')['type'] !== 'sticker') {
      if (this.selectedObject)
        this.deselectAsset();
      return;
    }

    // Remove selection graphic
    if (this.selectedObject)
      this.postFxPlugin.remove(this.selectedObject);

    //Select new object 
    this.selectedObject = obj;
    this.toggleUiContainer();
    //this.dragMng.add(this.selectedObject);

    this.postFxPlugin.add(this.selectedObject, {
      thickness: 3,
      outlineColor: 0xffffff
    });
    this.postFxPlugin.add(this.selectedObject, {
      thickness: 1,
      outlineColor: 0xff0000
    });
  }

  exportImage = () => {
    this.deselectAsset();
    return new Promise(resolve => {
      setTimeout(() => {
        const dataURI = this.game.canvas.toDataURL('image/png');
        const canvasConfig = { w: CreateConfig.stageW, h: CreateConfig.stageH }
        const avatarLayers = this.avatarContainer.list.length ? this.avatarContainer.list[0].getData('assetData') : {}
        const stickerLayers = this.stickerContainer.list.length ? this.stickerContainer.list.map(function (ast) {
          //console.log(ast.x, ast.y, ast.rotation, ast.scaleX);
          const _positioning = { x: ast.x, y: ast.y, rotation: ast.rotation, scale: ast.scaleX }
          const _assetData = ast.getData('assetData')
          const _data = { ..._assetData, ..._positioning }
          return _data
        }) : [];
        const createdData = {
          config: {
            canvas: canvasConfig
          },
          layers: {
            avatar: avatarLayers,
            stickers: stickerLayers
          },
          dataURI: dataURI
        }
        resolve(createdData)
      }, 500)
    })
  }

  deselectAsset() {
    if (this.selectedObject) {
      this.postFxPlugin.remove(this.selectedObject);
    }
    this.selectedObject = null;
    this.toggleUiContainer();
  }



  initiateGestures() {
    this.rotate = this.rexGestures.add.rotate();

    this.rotate.on('rotate', function (rotate) {
      //console.log(`${rotate.rotation}, ${rotate.rotation * (180 / Math.PI)}`);
      if (this.selectedObject) {
        if (this.selectedObject.getData('locked'))
          return;
        let _rot = this.selectedObject.rotation + ((rotate.rotation * (180 / Math.PI)) * 0.02);
        this.selectedObject.setRotation(_rot);
      }
    }, this)
      .on('drag1', function (rotate) {
        if (this.selectedObject) {
          if (this.selectedObject.getData('locked'))
            return;
          this.selectedObject.setPosition(this.selectedObject.x + rotate.drag1Vector.x, this.selectedObject.y + rotate.drag1Vector.y)
        }
      }, this);
    this.pinch = this.rexGestures.add.pinch();
    this.pinch.on('pinch', function (pinch) {
      if (this.selectedObject) {
        if (this.selectedObject.getData('locked'))
          return;
        this.selectedObject.scaleX *= pinch.scaleFactor;
        this.selectedObject.scaleY *= pinch.scaleFactor;
      }
    }, this);
  }


}