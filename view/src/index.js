import { init, Sprite, Pool, GameLoop, initKeys, keyPressed, collides, randInt, rand } from '../../node_modules/kontra/kontra.mjs';
import { ENEMY_SETTINGS } from './constants.js'; //敵のタイプごとの設定

let { canvas } = init();  // canvasを初期化
initKeys();  // キーボード入力を初期化

// プレイヤー
let player = Sprite({
  x: 100,        // x座標
  y: 80,         // y座標
  color: 'red',  // 色
  width: 20,     // 幅
  height: 40,    // 高さ
  attackSpeed: 0.3,           // 攻撃速度 (秒)
  timeSinceLastFire: 0,       // 最後に弾丸を発射してからの経過時間
  anchor: { x: 0.5, y: 0.5 }, // 中心を基準にする
  
  update(dt) {
    this.timeSinceLastFire += dt;  // 経過時間を更新
    if (this.timeSinceLastFire >= this.attackSpeed) {
      fireBullet(this.x, this.y, 10, 100); // 弾を発射
      this.timeSinceLastFire = 0;     // タイマーをリセット
    }
  }
});

// 弾丸のプール
let bulletPool = Pool({
  create: Sprite,
  maxSize: 10,  // 最大数
});

// enemyclass
// class Enemy extends Sprite {
//   constructor(properties) {
//     super(properties);
//     // this.health = properties.health;
//     // this.attack = properties.attack;
//     // this.enemyType = properties.enemyType;
//   }
  
//   update() {
//     this.advance();
//     if (this.x < -this.width) {
//       this.x = canvas.width;
//     }
//   }
// }

// 敵のプール
let enemyPool = Pool({
  create: Sprite, // または、カスタムの Enemy クラス
  maxSize: 50,    // 敵の最大数 (調整可能)
  
  // release() {
  //   this.isAlive = false;
  // },
});

// 敵を生成 (game.js などで)
function spawnEnemy(phase, difficulty, enemyType) {
  const settings = ENEMY_SETTINGS[enemyType]; // タイプ別の設定
  enemyPool.get({
    x: canvas.width,
    y: randInt(0, canvas.height - 30), // ランダムなy座標
    enemyType: enemyType,
    width: settings.width,
    height: settings.height,
    color: settings.color,
    dx: settings.speed,      // 敵の速度
    health: settings.health, // 敵の体力
    attack: settings.attack, // 敵の攻撃力
  });
  // enemies.push(enemy);
}
spawnEnemy(1, 1, 1);

// 陣地
let base = Sprite({
  x: 0,
  y: 0,
  color: 'gray',
  width: 300,
  height: canvas.height,
  health: 1200    // 耐久値
});

// 弾丸を発射する関数
const fireBullet = (x, y, dx, damage) => {
  bulletPool.get({  // プールから取得
    x: x,
    y: y,
    width: 10,
    height: 5,
    color: 'black',
    ttl: 120, // 存在時間
    dx: dx,   // 速度
    anchor: { x: 0.5, y: 0.5 },
    damage: damage,
  });
}
fireBullet(100, 100, 2, 10);

let loop = GameLoop({  // ゲームループ
  update: function(dt) {
    // プレイヤーの操作
    if((keyPressed('arrowup') || keyPressed('w')) && player.y > player.height / 2) {
      console.log('up');
      player.y -= 4;
    } else if((keyPressed('arrowdown') || keyPressed('s')) && player.y < canvas.height - player.height / 2) {
      console.log('down');
      player.y += 4;
    }
    
    // 敵と弾丸の衝突判定
    enemyPool.getAliveObjects().forEach(enemy => {
      const bullet = bulletPool.getAliveObjects().find(bullet => collides(bullet, enemy));
      if (bullet) {
        enemy.color = 'white';
        enemy.health -= bullet.damage;
        if (enemy.health <= 0) {
          enemy.ttl = 0;
        }
        bullet.ttl = 0;
      } else {
        enemy.color = 'green';
      }
    }, this);
    
    base.update();
    player.update(dt);
    enemyPool.update();
    bulletPool.update();
    
    
    
    // if (player.x > canvas.width) {
    //   player.x = -player.width;
    // }
  },
  render: function() {
    base.render();
    player.render();  // スプライトを描画
    enemyPool.render();
    bulletPool.render();
  }
});

loop.start();  // ゲームループを開始