import { UI, CreateConfig } from "./Config";


export default class CreateScene extends Phaser.Scene {
  constructor() {
    super('CreateScene')
    this.selectedObject;
    this.uiButtons = [UI.ScaleUp, UI.ScaleDown, UI.RotateLeft, UI.RotateRight, UI.MoveFront, UI.MoveBack, UI.Delete]
  }

  preload() {
    this.load.svg(UI.ScaleUp, './assets/ui/scale-up.svg', { scale: CreateConfig.svgLoadScale });
    this.load.svg(UI.ScaleDown, './assets/ui/scale-down.svg', { scale: CreateConfig.svgLoadScale });
    this.load.svg(UI.RotateLeft, './assets/ui/rotate-left.svg', { scale: CreateConfig.svgLoadScale });
    this.load.svg(UI.RotateRight, './assets/ui/rotate-right.svg', { scale: CreateConfig.svgLoadScale });
    this.load.svg(UI.MoveFront, './assets/ui/move-front.svg', { scale: CreateConfig.svgLoadScale });
    this.load.svg(UI.MoveBack, './assets/ui/move-back.svg', { scale: CreateConfig.svgLoadScale });
    this.load.svg(UI.Delete, './assets/ui/trash.svg', { scale: CreateConfig.svgLoadScale });
  }

  /* UI METHODS */

  onRemoveObject() {
    if (this.selectedObject) {
      this.postFxPlugin.remove(this.selectedObject);
      this.selectedObject.destroy();
      this.selectedObject = null
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

  onBtnClick(btn) {
    if (!this.selectedObject) {
      console.log(`${btn.name} clicked but no object is selected`)
      return;
    }
    console.log(btn.name)
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

  addObject({ id, type, fileType, path }) {
    const card = this.add.image(0, 0, id);
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

  onAssetClicked(obj) {
    // Only allow stickers to be selected
    if (obj.getData('type') != 'sticker') {
      this.postFxPlugin.remove(this.selectedObject);
      this.selectedObject = null;
      return;
    }
    // Remove selection graphic
    if (this.selectedObject)
      this.postFxPlugin.remove(this.selectedObject);

    //Select new object 
    this.selectedObject = obj;
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

  create() {
    this.postFxPlugin = this.plugins.get('rexOutlinePipeline');
    //this.dragMng = this.plugins.get('rexDrag');
    this.rotate = this.rexGestures.add.rotate();

    this.rotate.on('rotate', function (rotate) {
      console.log(`${rotate.rotation}, ${rotate.rotation * (180 / Math.PI)}`);
      let _rot = this.selectedObject.rotation + ((rotate.rotation * (180 / Math.PI)) * 0.02);
      this.selectedObject.setRotation(_rot);
    }, this)
      .on('drag1', function (rotate) {
        this.selectedObject.setPosition(this.selectedObject.x + rotate.drag1Vector.x, this.selectedObject.y + rotate.drag1Vector.y)
      }, this);
    this.pinch = this.rexGestures.add.pinch();
    this.pinch.on('pinch', function (pinch) {
      if (this.selectedObject) {
        this.selectedObject.scaleX *= pinch.scaleFactor;
        this.selectedObject.scaleY *= pinch.scaleFactor;
      }
    }, this);
    // Containers
    this.screenZone = this.add.zone(0, 0, CreateConfig.stageW, CreateConfig.stageH);
    this.avatarContainer = this.add.container(0, 0);
    this.avatarContainer.name = 'avatarContainer';
    this.stickerContainer = this.add.container(0, 0);
    this.stickerContainer.name = 'stickerContainer';
    this.uiContainer = this.add.container(0, 0);
    this.uiContainer.name = 'uiContainer'
    //UI
    this.uiBg = this.add.rectangle(0, 0, CreateConfig.stageW, 30, 0xff0000)
    this.uiBg.setOrigin(0, 0)
    this.uiContainer.add(this.uiBg);
    for (let i = 0; i < this.uiButtons.length; i++) {
      let btn = this.add.image(25 * i + 5, 5, this.uiButtons[i]);
      btn.name = this.uiButtons[i];
      btn.setOrigin(0, 0);
      btn.setInteractive()
      btn.on('pointerdown', () => {
        this.onBtnClick(btn);
      });
    }

    //Catch the event from the React
    this.game.events.on('addAsset', this.addObject.bind(this));
  }
}