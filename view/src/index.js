import { init, Sprite, GameLoop, initKeys, keyPressed } from '../../node_modules/kontra/kontra.mjs';

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

let loop = GameLoop({  // ゲームループ
  update: function() {
    // プレイヤーの操作
    if((keyPressed('arrowup') || keyPressed('w')) && player.y > 0) {
      console.log('up');
      player.y -= 2;
    } else if((keyPressed('arrowdown') || keyPressed('s')) && player.y < canvas.height - player.height) {
      console.log('down');
      player.y += 2;
    }
    base.update();
    player.update();  // スプライトを更新
    
    
    // if (player.x > canvas.width) {
    //   player.x = -player.width;
    // }
  },
  render: function() {
    base.render();
    player.render();  // スプライトを描画
  }
});

loop.start();  // ゲームループを開始