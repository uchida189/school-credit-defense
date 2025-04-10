import { Pool, Sprite, randInt, imageAssets } from '../../node_modules/kontra/kontra.mjs';
import { ENEMY_SETTINGS } from './constants.js';

// 敵のクラス
export class Enemy {
  constructor(canvas, base) {
    this.canvas = canvas;
    this.base = base;
    // 敵のプール
    this.pool = Pool({
      create: Sprite, // または、カスタムの Enemy クラス
      maxSize: 20,    // 敵の最大数 (調整可能)
    });
  }
  
  update() {
    this.pool.update();
  }

  render() {
    this.pool.render();
  }
  
  getAliveObjects() {
    return this.pool.getAliveObjects();
  }
  
   // 敵を生成する関数 (game.js などで)
  spawnEnemy(enemyType) {
    const settings = ENEMY_SETTINGS[enemyType]; // タイプ別の設定
    const enemyWidth = settings.width; // 敵の幅
    const enemyHeight = settings.height; // 敵の高さ
    let imageKey = `assets/homework.png`; // デフォルトの画像キー
    switch (enemyType) {
      case 1:
        break;
      case 2:
        imageKey = `assets/class.png`;
        break;
      case 3:
        imageKey = `assets/experiment.png`;
        break;
      case 4:
        imageKey = `assets/report.png`;
        break;
      case 5:
        imageKey = `assets/exam.png`;
        break;
      default:
        console.error(`Unknown enemy type: ${enemyType}`);
    }
    let image = imageAssets[imageKey]; // 敵の画像を取得
    image.width = enemyWidth;  // 敵の幅
    image.height = enemyHeight; // 敵の高さ
    
    this.pool.get({
      x: this.canvas.width,
      y: randInt(0, this.canvas.height - 30), // ランダムなy座標
      enemyType: enemyType,
      width: enemyWidth,
      height: enemyHeight,
      image: image,
      dx: settings.speed,      // 敵の速度
      health: settings.health, // 敵の体力
      attack: settings.attack, // 敵の攻撃力
      anchor: { x: 0.5, y: 0.5 },
      // ttl: this.canvas.width / settings.speed, // 存在時間
    });
  }
}