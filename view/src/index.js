import { init, Sprite, Pool, GameLoop, initKeys, keyPressed, collides, randInt, Text } from '../../node_modules/kontra/kontra.mjs';
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
      fireBullet(this.x, this.y, 10, 10); // 弾を発射
      this.timeSinceLastFire = 0;     // タイマーをリセット
    }
  }
});

// 弾丸のプール
let bulletPool = Pool({
  create: Sprite,
  maxSize: 10,  // 最大数
});

// 敵のプール
let enemyPool = Pool({
  create: Sprite, // または、カスタムの Enemy クラス
  maxSize: 50,    // 敵の最大数 (調整可能)
});

// 陣地
let base = Sprite({
  x: 0,
  y: 0,
  color: 'gray',
  width: 300,
  height: canvas.height,
  health: 1200    // 耐久値
});

// スコア
let score = Text({
  text: 'Score: ' + base.health,
  font: '32px Arial',
  color: 'black',
  x: 16,
  y: 16,
  anchor: {x: 0, y: 0},
  textAlign: 'center'
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
};

// 敵を生成する関数 (game.js などで)
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
}

let loop = GameLoop({  // ゲームループ
  update: function(dt) {
    const enemies = enemyPool.getAliveObjects();
    const bullets = bulletPool.getAliveObjects();
    
    // プレイヤーの操作
    if((keyPressed('arrowup') || keyPressed('w')) && player.y > player.height / 2) {
      console.log('up');
      player.y -= 4;
    } else if((keyPressed('arrowdown') || keyPressed('s')) && player.y < canvas.height - player.height / 2) {
      console.log('down');
      player.y += 4;
    }
    
    // 敵の衝突判定
    enemies.forEach(enemy => {
      const bullet = bullets.find(bullet => collides(bullet, enemy));
      
      if(collides(enemy, base)) { // 陣地との衝突判定
        base.health -= enemy.attack;
        enemy.ttl = 0;
      } else if (bullet) {        // 弾丸との衝突判定
        enemy.color = 'white';    // ヒットエフェクト
        enemy.health -= bullet.damage;
        if (enemy.health <= 0) {
          enemy.ttl = 0;
        }
        bullet.ttl = 0;
      } else {
        enemy.color = ENEMY_SETTINGS[enemy.enemyType].color;
      }
    }, this);
    
    // 敵の生成
    if (enemies.length < 10) {
      spawnEnemy(1, 1, randInt(1, 3));
    }
    
    // スコアの更新
    score.text = 'Score: ' + base.health;
    
    base.update();
    player.update(dt);
    enemyPool.update();
    bulletPool.update();
  },
  render: function() {
    base.render();
    player.render();  // スプライトを描画
    enemyPool.render();
    bulletPool.render();
    score.render();
  }
});

loop.start();  // ゲームループを開始