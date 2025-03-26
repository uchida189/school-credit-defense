import { Pool, Sprite } from '../../node_modules/kontra/kontra.mjs';

export class Bullet {
  constructor(canvas) {
    this.canvas = canvas;
    // 弾のプール
    this.pool = Pool({
      create: Sprite,
      maxSize: 20,  // 最大数
    });
  }
  
  update() {
    this.pool.update();
  }

  render() {
    this.pool.render();
  }

  // 弾丸を発射する関数
  fireBullet = (playerX, playerY, dx, damage) => {
    this.pool.get({  // プールから取得
      x: playerX,
      y: playerY,
      width: 10,
      height: 5,
      color: 'black',
      // ttl: 120, // 存在時間
      ttl: this.canvas.width / Math.abs(dx), // 存在時間
      dx: dx,   // 速度
      anchor: { x: 0.5, y: 0.5 },
      damage: damage,
    });
  };
}