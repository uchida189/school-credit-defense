import { init, initKeys, initPointer, GameLoop } from 'kontra';
import { game } from './game.js';

let { canvas, context } = init();
initKeys();
initPointer();

// ゲームループの開始 (game.js に処理を委譲)
let loop = GameLoop({
    update: game.update.bind(game),  // 1フレームごとの処理
    render: game.render.bind(game)   // 1フレームごとの描画処理
});

game.init(canvas, loop); // ゲームの初期化処理 (game.js で定義)
loop.start();