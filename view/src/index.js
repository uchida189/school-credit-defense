import { init, Sprite, Pool, GameLoop, initKeys, keyPressed, collides, randInt, Text } from '../../node_modules/kontra/kontra.mjs';
import { ENEMY_SETTINGS, PLAYER_TYPE_SETTINGS } from './constants.js'; //敵のタイプごとの設定

let { canvas } = init();  // canvasを初期化
initKeys();  // キーボード入力を初期化

let playerType = 1;  // プレイヤータイプ

// プレイヤー
// let player = null;
const playerSettings = PLAYER_TYPE_SETTINGS[playerType];

let player = Sprite({
  x: 100,                       // x座標
  y: canvas.height / 2,         // y座標
  width: 20,                    // 幅
  height: 40,                   // 高さ
  color: playerSettings.color,  // 色
  moveSpeed: playerSettings.moveSpeed,      // 移動速度
  attackSpeed: playerSettings.attackSpeed,  // 攻撃速度 (秒)
  attackPower: playerSettings.attackPower,  // 攻撃力
  dropRate: playerSettings.dropRate,        // 弾の発射率
  timeSinceLastFire: 0,       // 最後に弾丸を発射してからの経過時間
  anchor: { x: 0.5, y: 0.5 }, // 中心を基準にする
  items: [0, 0, 0],           // アイテムの所持数
  
  update(dt) {
    this.timeSinceLastFire += dt;  // 経過時間を更新
    if (this.timeSinceLastFire >= this.attackSpeed) {
      fireBullet(this.x, this.y, 10, this.attackPower); // 弾を発射
      this.timeSinceLastFire = 0;     // タイマーをリセット
    }
  }
});

// 弾丸のプール
let bulletPool = Pool({
  create: Sprite,
  maxSize: 20,  // 最大数
});

// 敵のプール
let enemyPool = Pool({
  create: Sprite, // または、カスタムの Enemy クラス
  maxSize: 20,    // 敵の最大数 (調整可能)
});

// 陣地
let base = Sprite({
  x: 0,
  y: 0,
  color: 'gray',
  width: 200,
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
// アイテムの所持数
let itemText = Text({
  text: 'Items: ' + player.items.join(', '),
  font: '16px Arial',
  color: 'black',
  x: 16,
  y: 48,
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
    
    // update() {
    //   this.advance();
    // },
  });
}

let loop = GameLoop({  // ゲームループ
  update: function(dt) {
    const enemies = enemyPool.getAliveObjects();
    const bullets = bulletPool.getAliveObjects();
    
    // プレイヤーの操作
    if((keyPressed('arrowup') || keyPressed('w')) && player.y > player.height / 2) {
      console.log('up');
      player.y -= player.moveSpeed;
    } else if((keyPressed('arrowdown') || keyPressed('s')) && player.y < canvas.height - player.height / 2) {
      console.log('down');
      player.y += player.moveSpeed;
    };
    
    // 敵の衝突判定
    enemies.forEach(enemy => {
      const bullet = bullets.find(bullet => collides(bullet, enemy));
      
      if(collides(enemy, base)) { // 陣地との衝突判定
        base.health -= enemy.attack;
        enemy.ttl = 0;
      } else if (bullet) {        // 弾丸との衝突判定
        enemy.color = 'white';    // ヒットエフェクト
        enemy.health -= bullet.damage;
        if (enemy.health <= 0) {  // 敵が倒された場合の処理
          enemy.ttl = 0;
          if (Math.random() < player.dropRate) {
            player.items[randInt(0, player.items.length - 1)] += 1;  // アイテムをドロップ
          }
        }
        bullet.ttl = 0;
      } else {
        enemy.color = ENEMY_SETTINGS[enemy.enemyType].color;
      }
    }, this);
    
    // 敵の生成
    if (enemies.length < 10) {
      spawnEnemy(1, 1, randInt(1, 5));
    }
    
    // スコアの更新
    score.text = 'Score: ' + base.health;
    itemText.text = 'Items: ' + player.items.join(', ');
    
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
    itemText.render();
  }
});

loop.start();  // ゲームループを開始