import { keyPressed } from 'kontra';
import { Player } from './player.js';
import { Base } from './base.js';

export class GameScreen {
    constructor(game) {
        this.game = game;
        this.player = null;
        this.base = null;
        this.selectedDifficulty = 1;
        this.selectedPlayerType = 1;
    }
    init(selectedDifficulty, selectedPlayerType) {
        this.selectedDifficulty = selectedDifficulty;
        this.selectedPlayerType = selectedPlayerType;
        this.player = new Player(selectedPlayerType, this.game.canvas); // 選択されたタイプ
        this.base = new Base(this.game.canvas);
      }

    update(dt) {

        // プレイヤーの移動
        if (keyPressed('up') || keyPressed('w')) {
            this.player.moveUp();
        } else if (keyPressed('down') || keyPressed('s')) {
            this.player.moveDown();
        } else {
            this.player.stopMoving();
        }

        // プレイヤーが画面外に出ないようにする
        this.player.sprite.y = Math.max(0, this.player.sprite.y);
        this.player.sprite.y = Math.min(this.game.canvas.height - this.player.sprite.height, this.player.sprite.y);
        this.player.update(dt)
    }

    render() {
        this.base.render();
        this.player.render();
    }
}