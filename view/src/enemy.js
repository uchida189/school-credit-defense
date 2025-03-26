import { Pool, Sprite, collides, randInt } from '../../node_modules/kontra/kontra.mjs';
import { ENEMY_SETTINGS } from './constants.js';

// 敵のクラス
export class Enemy {
  constructor(canvas) {
    this.canvas = canvas;
    // 敵のプール
    this.enemyPool = Pool({
      create: Sprite, // または、カスタムの Enemy クラス
      maxSize: 20,    // 敵の最大数 (調整可能)
    });
  }
  
  update() {
    this.enemyPool.update();
  }

  render() {
    this.enemyPool.render();
  }

  
   // 敵を生成する関数 (game.js などで)
  spawnEnemy(enemyType) {
    const settings = ENEMY_SETTINGS[enemyType]; // タイプ別の設定
    this.enemyPool.get({
      x: this.canvas.width,
      y: randInt(0, this.canvas.height - 30), // ランダムなy座標
      enemyType: enemyType,
      width: settings.width,
      height: settings.height,
      color: settings.color,
      dx: settings.speed,      // 敵の速度
      health: settings.health, // 敵の体力
      attack: settings.attack, // 敵の攻撃力
      
      // update() {
      //   this.advance();
      // },
    });
  }
}