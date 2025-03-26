// src/game.js (シーンマネージャー)
import { StartScreen } from './startScreen.js';
import { GameScreen } from './gameScreen.js';

export const game = {
    canvas: null,
    loop: null,
    currentScene: null,
    startScreen: null,
    gameScreen: null,

    init(canvas, loop) {
      this.canvas = canvas;
      this.loop = loop;

      // シーンの初期化
      this.startScreen = new StartScreen(this);
      this.gameScreen = new GameScreen(this);

      // 最初のシーンを設定
      this.currentScene = this.startScreen;
    },

    // シーンの切り替えを行う関数
    switchToScreen(screenName, options = {}) {
      // シーンの終了処理 (必要に応じて)
      if (this.currentScene.deinit) {
        this.currentScene.deinit();
      }
      
      let nextScene = null;
      // 次のシーンを設定
      switch (screenName) {
          case 'start':
            nextScene = this.startScreen;
            break;
          case 'game':
            nextScene = this.gameScreen;
            break;
          // ...
        }
        
        // 次のシーンが見つかった場合
        if (nextScene) {
          this.currentScene = nextScene;  // シーンを切り替え
          // 新しいシーンの init メソッドを呼び出し、options を渡す
          if (this.currentScene.init) {
            this.currentScene.init(options);
          }
        } else {
          console.error(`Scene "${screenName}" not found!`);
        }
    },

    update(dt) {
        this.currentScene.update(dt); // 現在のシーンの update を呼び出す
    },

    render() {
        this.currentScene.render(); // 現在のシーンの render を呼び出す
    }
};
// import { Player } from './player.js';
// import { Base } from './base.js';
// import { StartScreen } from './startScreen.js';
// import { GameScreen } from './gameScreen.js';


// export const game = {
//     canvas: null,
//     loop: null,
//     player: null,
//     base: null,
//     startScreen: null,
//     gameScreen: null,
//     currentScreen: 'start', // 現在の画面 ('start', 'game', 'gameover', 'clear')

//     init(canvas, loop) {
//         this.canvas = canvas;
//         this.loop = loop;

//         // スタート画面の初期化
//         this.startScreen = new StartScreen(this);
//         this.gameScreen = new GameScreen(this);

//     },

//     switchToGameScreen(selectedDifficulty, selectedPlayerType) {
//         // プレイヤーの初期化 (選択されたタイプに基づいて)
//         this.player = new Player(selectedPlayerType, this.canvas);
//         // 陣地の初期化
//         this.base = new Base(this.canvas);
//         this.gameScreen.init(selectedDifficulty, selectedPlayerType);
//         this.currentScreen = 'game';
//       },

//       switchToStartScreen() {
//         this.currentScreen = 'start';
//     },

//     update(dt) {
//         switch (this.currentScreen) {
//             case 'start':
//               this.startScreen.update(dt);
//               break;
//             case 'game':
//               this.gameScreen.update(dt);
//               break;
//             case 'gameover':
//               // ゲームオーバー画面の更新処理
//               break;
//             case 'clear':
//               // クリア画面の更新処理
//               break;
//           }

//     },

//     render() {
//         switch (this.currentScreen) {
//             case 'start':
//                 this.startScreen.render();
//                 break;
//             case 'game':
//                 this.gameScreen.render();
//                 break;
//             case 'gameover':
//                 // ゲームオーバー画面の描画処理
//                 break;
//             case 'clear':
//                 // クリア画面の描画処理
//                 break;
//         }
//     }
// };