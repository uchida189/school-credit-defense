import { Sprite } from '../../node_modules/kontra/kontra.mjs';

export class Base {
    constructor(canvas) {
        this.sprite = Sprite({
            x: 0,
            y: 0,
            color: 'gray',
            width: 200,          // 陣地の幅
            height: canvas.height, // 画面の高さ
            health: 1200      // 耐久値
        });
    }

    render() {
        this.sprite.render();
    }

    takeDamage(damage) {
        this.sprite.health -= damage;
        if (this.sprite.health < 0) {
            this.sprite.health = 0; // 耐久値は0未満にならない
        }
    }
    getHealth() {
        return this.sprite.health;
    }
}