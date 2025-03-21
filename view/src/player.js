import { Sprite } from 'kontra';
import { PLAYER_TYPE_SETTINGS } from './constants.js';

export class Player {
    constructor(playerType, canvas) {
        this.canvas = canvas;
        const settings = PLAYER_TYPE_SETTINGS[playerType]; // 定数からプレイヤーのタイプ別設定を取得

        this.sprite = Sprite({
            x: 50, // 陣地内からスタート
            y: canvas.height / 2 - 16, // 画面中央
            color: settings.color, // タイプ別の色
            width: 20,
            height: 32,
            moveSpeed: settings.moveSpeed,
            attackSpeed: settings.attackSpeed,
            attackPower: settings.attackPower,
            dropRate: settings.dropRate,
          });

        this.playerType = playerType;
    }

    update(dt) {
        this.sprite.update(dt);
    }

    render() {
        this.sprite.render();
    }

    moveUp() {
        this.sprite.dy = -this.sprite.moveSpeed;
      }

      moveDown() {
        this.sprite.dy = this.sprite.moveSpeed;
      }

      stopMoving() {
        this.sprite.dy = 0;
      }
}