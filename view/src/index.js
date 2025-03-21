import { init, Sprite, GameLoop } from '../../node_modules/kontra/kontra.mjs';
// import { init, Sprite, GameLoop } from 'kontra';

let { canvas } = init();  // canvasを初期化
console.log(canvas.width, canvas.height);

let sprite = Sprite({
  x: 100,        // x座標
  y: 80,         // y座標
  color: 'red',  // 色
  width: 20,     // 幅
  height: 40,    // 高さ
  dx: 2          // x座標の増加量
});

let loop = GameLoop({  // ゲームループ
  update: function() {
    sprite.update();  // スプライトを更新
    
    if (sprite.x > canvas.width) {
      sprite.x = -sprite.width;
    }
  },
  render: function() {
    sprite.render();  // スプライトを描画
  }
});

loop.start();  // ゲームループを開始