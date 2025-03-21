import { init, Sprite, Pool, GameLoop, initKeys, keyPressed } from '../../node_modules/kontra/kontra.mjs';

let { canvas } = init();  // canvasを初期化
initKeys();  // キーボード入力を初期化

// プレイヤー
let player = Sprite({
  x: 100,        // x座標
  y: 80,         // y座標
  color: 'red',  // 色
  width: 20,     // 幅
  height: 40,    // 高さ
  // dx: 2          // x座標の増加量
  attackSpeed: 0.3,           // 攻撃速度 (秒)
  timeSinceLastFire: 0,       // 最後に弾丸を発射してからの経過時間
  anchor: { x: 0.5, y: 0.5 }, // 中心を基準にする
  
  update(dt) {
    this.timeSinceLastFire += dt;  // 経過時間を更新
    if (this.timeSinceLastFire >= this.attackSpeed) {
      fireBullet(this.x, this.y, 10); // 弾を発射
      this.timeSinceLastFire = 0;     // タイマーをリセット
    }
  }
});

// 弾丸のプール
let bulletPool = Pool({
  create: Sprite,
  maxSize: 10,  // 最大数
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

// 弾丸を発射する関数
const fireBullet = (x, y, dx) => {
  bulletPool.get({  // プールから取得
    x: x,
    y: y,
    width: 10,
    height: 5,
    color: 'black',
    ttl: 120, // 存在時間
    dx: dx,   // 速度
    anchor: { x: 0.5, y: 0.5 }
  });
}

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
    
    base.update();
    player.update(dt);
    bulletPool.update();
    
    
    
    // if (player.x > canvas.width) {
    //   player.x = -player.width;
    // }
  },
  render: function() {
    base.render();
    player.render();  // スプライトを描画
    bulletPool.render();
  }
});

loop.start();  // ゲームループを開始