export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene')
  }

  preload() {
    let text = this.add.text(20, 20, 'Booting', {
      font: '16px Courier',
      fill: '#00ff00',
    })

  }
  create() {
    this.scene.start('CreateScene')
  }
}
