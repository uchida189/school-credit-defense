import { Sprite } from '../../node_modules/kontra/kontra.mjs';
import { PLAYER_TYPE_SETTINGS } from './constants.js';

export class Player {
    constructor(playerType, canvas) {
        this.canvas = canvas;
        this.playerType = playerType;
        const settings = PLAYER_TYPE_SETTINGS[playerType]; // 定数からプレイヤーのタイプ別設定を取得

        this.sprite = Sprite({
          x: canvas.width / 2,    // 陣地内からスタート
          y: canvas.height / 2,   // 画面中央
          color: settings.color,  // タイプ別の色
          width: 20,
          height: 40,
          anchor: { x: 0.5, y: 0.5 },   // 中心を基準にする
          color: settings.color,  // 色
          moveSpeed: settings.moveSpeed,      // 移動速度
          attackSpeed: settings.attackSpeed,  // 攻撃速度 (秒)
          attackPower: settings.attackPower,  // 攻撃力
          dropRate: settings.dropRate,        // 弾の発射率
          timeSinceLastFire: 0,       // 最後に弾丸を発射してからの経過時間
          items: [0, 0, 0],           // アイテムの所持数
          
          update(dt) {
            this.timeSinceLastFire += dt;  // 経過時間を更新
            if (this.timeSinceLastFire >= this.attackSpeed) {
              // fireBullet(this.x, this.y, 10, this.attackPower); // 弾を発射
              this.timeSinceLastFire = 0;     // タイマーをリセット
            }
          }
        });
    }

    update(dt) {
      this.sprite.update(dt);
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
      
    // }
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