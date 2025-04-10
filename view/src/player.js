import { Sprite } from '../../node_modules/kontra/kontra.mjs';
import { PLAYER_TYPE_SETTINGS } from './constants.js';

export class Player {
    constructor(playerType, bullet, canvas) {
        this.canvas = canvas;
        this.playerType = playerType;
        this.bullet = bullet;
        const settings = PLAYER_TYPE_SETTINGS[playerType]; // 定数からプレイヤーのタイプ別設定を取得
        const playerWidth = 120;
        const playerHeight = 20;
        let image = new Image(playerWidth, playerHeight);
        image.src = `assets/player${playerType}.png`; // プレイヤーの画像を取得

        this.sprite = Sprite({
          x: 100,    // 陣地内からスタート
          y: canvas.height / 2,   // 画面中央
          image: image,
          width: playerWidth,  // プレイヤーの幅
          height: playerHeight, // プレイヤーの高さ
          anchor: { x: 0.5, y: 0.5 },   // 中心を基準にする
          moveSpeed: settings.moveSpeed,      // 移動速度
          attackSpeed: settings.attackSpeed,  // 攻撃速度 (秒)
          attackPower: settings.attackPower,  // 攻撃力
          dropRate: settings.dropRate,        // 弾の発射率
          timeSinceLastFire: 0,       // 最後に弾丸を発射してからの経過時間
          items: [0, 0, 0],           // アイテムの所持数
        });
        console.log('Player created:', this.sprite);
    }

    update(dt) {
      // 弾丸を発射
      this.sprite.timeSinceLastFire += dt;  // 経過時間を更新
      if (this.sprite.timeSinceLastFire >= this.sprite.attackSpeed) {
        this.fireBullet(); // 弾を発射
        this.sprite.timeSinceLastFire = 0;     // タイマーをリセット
      }
      this.sprite.update();
    }

    render() {
      this.sprite.render();
    }

    moveUp() {
      this.sprite.y -= this.sprite.moveSpeed;
    }

    moveDown() {
      this.sprite.y += this.sprite.moveSpeed;
    }

    // stopMoving() {
    
    fireBullet() {
      this.bullet.fireBullet(this.sprite.x + this.sprite.width / 2, this.sprite.y, 10, this.sprite.attackPower);
    }
    
    // fireMegaBullet() {
    //   this.bullet.fireBullet(this.sprite.x, this.sprite.y, 50, this.sprite.attackPower * 10);
    // }
}
