import { Sprite } from 'kontra';
import { PLAYER_TYPE_SETTINGS } from './constants.js';

export class Player {
    constructor(playerType, canvas) {
        this.canvas = canvas;
        const settings = PLAYER_TYPE_SETTINGS[playerType]; // 定数からプレイヤーのタイプ別設定を取得

        this.sprite = Sprite({
            x: 50, // 陣地内からスタート
            y: canvas.height / 2 - 16, // 画面中央
            color: settings.color, // タイプ別の色
            width: 20,
            height: 32,
            moveSpeed: settings.moveSpeed,
            attackSpeed: settings.attackSpeed,
            attackPower: settings.attackPower,
            dropRate: settings.dropRate,
          });

        this.playerType = playerType;
    }

    update(dt) {
        this.sprite.update(dt);
    }

    render() {
        this.sprite.render();
    }

    moveUp() {
        this.sprite.dy = -this.sprite.moveSpeed;
      }

      moveDown() {
        this.sprite.dy = this.sprite.moveSpeed;
      }

      stopMoving() {
        this.sprite.dy = 0;
      }
}

// const playerSettings = PLAYER_TYPE_SETTINGS[playerType];

// let player = Sprite({
//   x: 100,                       // x座標
//   y: canvas.height / 2,         // y座標
//   width: 20,                    // 幅
//   height: 40,                   // 高さ
//   color: playerSettings.color,  // 色
//   moveSpeed: playerSettings.moveSpeed,      // 移動速度
//   attackSpeed: playerSettings.attackSpeed,  // 攻撃速度 (秒)
//   attackPower: playerSettings.attackPower,  // 攻撃力
//   dropRate: playerSettings.dropRate,        // 弾の発射率
//   timeSinceLastFire: 0,       // 最後に弾丸を発射してからの経過時間
//   anchor: { x: 0.5, y: 0.5 }, // 中心を基準にする
//   items: [0, 0, 0],           // アイテムの所持数
  
//   update(dt) {
//     this.timeSinceLastFire += dt;  // 経過時間を更新
//     if (this.timeSinceLastFire >= this.attackSpeed) {
//       fireBullet(this.x, this.y, 10, this.attackPower); // 弾を発射
//       this.timeSinceLastFire = 0;     // タイマーをリセット
//     }
//   }
// });