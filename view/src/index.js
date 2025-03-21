import { init, Sprite, GameLoop, initKeys, keyPressed } from '../../node_modules/kontra/kontra.mjs';
// import { init, Sprite, GameLoop } from 'kontra';

let { canvas } = init();  // canvasを初期化
console.log(canvas.width);
initKeys();  // キーボード入力を初期化

let player = Sprite({
  x: 100,        // x座標
  y: 80,         // y座標
  color: 'red',  // 色
  width: 20,     // 幅
  height: 40,    // 高さ
  // dx: 2          // x座標の増加量
});

let loop = GameLoop({  // ゲームループ
  update: function() {
    if((keyPressed('arrowup') || keyPressed('w')) && player.y > 0) {
      console.log('up');
      player.y -= 2;
    } else if((keyPressed('arrowdown') || keyPressed('s')) && player.y < canvas.height - player.height) {
      console.log('down');
      player.y += 2;
    }
    player.update();  // スプライトを更新
    
    // if (player.x > canvas.width) {
    //   player.x = -player.width;
    // }
  },
  render: function() {
    player.render();  // スプライトを描画
  }
});

loop.start();  // ゲームループを開始