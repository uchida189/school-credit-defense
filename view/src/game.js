import { Player } from './player.js';
import { Base } from './base.js';
import { StartScreen } from './startScreen.js';
import { GameScreen } from './gameScreen.js';


export const game = {
    canvas: null,
    loop: null,
    player: null,
    base: null,
    startScreen: null,
    gameScreen: null,
    currentScreen: 'start', // 現在の画面 ('start', 'game', 'gameover', 'clear')

    init(canvas, loop) {
        this.canvas = canvas;
        this.loop = loop;

        // スタート画面の初期化
        this.startScreen = new StartScreen(this);
        this.gameScreen = new GameScreen(this);

    },

    switchToGameScreen(selectedDifficulty, selectedPlayerType) {
        // プレイヤーの初期化 (選択されたタイプに基づいて)
        this.player = new Player(selectedPlayerType, this.canvas);
        // 陣地の初期化
        this.base = new Base(this.canvas);
        this.gameScreen.init(selectedDifficulty, selectedPlayerType);
        this.currentScreen = 'game';
      },

      switchToStartScreen() {
        this.currentScreen = 'start';
    },

    update(dt) {
        switch (this.currentScreen) {
            case 'start':
              this.startScreen.update(dt);
              break;
            case 'game':
              this.gameScreen.update(dt);
              break;
            case 'gameover':
              // ゲームオーバー画面の更新処理
              break;
            case 'clear':
              // クリア画面の更新処理
              break;
          }

    },

    render() {
        switch (this.currentScreen) {
            case 'start':
                this.startScreen.render();
                break;
            case 'game':
                this.gameScreen.render();
                break;
            case 'gameover':
                // ゲームオーバー画面の描画処理
                break;
            case 'clear':
                // クリア画面の描画処理
                break;
        }
    }
};