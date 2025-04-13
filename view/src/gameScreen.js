import { keyPressed, randInt, Button, Text, Grid, collides, imageAssets, Sprite } from '../../node_modules/kontra/kontra.mjs';
import { Player } from './player.js';
import { Base } from './base.js';
import { Enemy } from './enemy.js';
import { Bullet } from './bullet.js';
// import { ENEMY_SETTINGS } from './constants.js';

export class GameScreen {
	constructor(game) {
		this.game = game;
		this.player = null;
		this.base = null;
		this.enemy = null;
		this.bullet = null;
		this.difficulty = 1;
		this.playerType = 1;
		this.timer = 0;		// タイマー
		this.mounth = 4;	// 月
		this.date = 1;		// 日付
		
		// テキストのオプション
		this.textOptions = {
			color: 'white',
			font: '20px Arial, sans-serif',
		};
		
		// スコア
		this.scoreText = Text({
			x: 10,
			y: 10,
			text: 'スコア: ',
			...this.textOptions
		});
		
		// フェーズ
		this.dateText = Text({
			x: 10,
			y: 40,
			text: '4月1日',
			...this.textOptions
		});
		
		// スタートに戻るボタン
		this.restartButton = Button({
			x: this.game.canvas.width - 10,
			y: 10,
			anchor: { x: 1, y: 0 },
			text: {
				text: 'リスタート',
				textAlign: 'end',
				...this.textOptions
			},
			onDown: () => {
				// 選択された難易度を取得
				this.game.switchToScreen('start', {});
			}
		});
		
		// 過去問の画像を取得
		let kakomonImage = imageAssets['assets/kakomon.png'];
		kakomonImage.width = 60;
		kakomonImage.height = 80;
		
		// 過去問
		this.kakomon = Sprite({
			image: kakomonImage,
			width: 60,
			height: 80,
			anchor: { x: 0.5, y: 0.5 }
		});
		
		// 過去問の所持数
		this.kakomonText = Text({
			text: 'x 0',
			...this.textOptions
		});
		
		// エナドリの画像を取得
		let drinkImage = imageAssets['assets/drink.png'];
		drinkImage.width = 40;
		drinkImage.height = 80;
		
		// エナドリ
		this.drink = Sprite({
			image: drinkImage,
			width: 40,
			height: 80,
			anchor: { x: 0.5, y: 0.5 }
		});
		
		// エナドリの所持数
		this.drinkText = Text({
			text: 'x 0',
			...this.textOptions
		});
		
		// // メールの画像を取得
		// let mailImage = imageAssets['assets/mail.png'];
		// mailImage.width = 100;
		// mailImage.height = 100;
		
		// // 謝罪メール
		// this.mail = Sprite({
		// 	image: mailImage,
		// 	width: 100,
		// 	height: 100,
		// 	anchor: { x: 0.5, y: 0.5 }
		// });
		
		// アイテムの所持数
		this.items = Grid({
			x:  this.game.canvas.width / 2,
			y: 10,
			flow: 'row',
			colGap: 25,
			align: 'center',
			anchor: { x: 0.5, y: 0 },
			children: [
				this.kakomon,
				this.kakomonText,
				this.drink,
				this.drinkText,
			]
		});
	}
	
	// シーンの初期化
	init(options) {
		this.difficulty = options.difficulty;
		this.playerType = options.playerType;
		this.base = new Base(this.game.canvas);
		this.enemy = new Enemy(this.game.canvas, this.base);
		this.bullet = new Bullet(this.game.canvas);
		this.player = new Player(options.playerType, this.bullet, this.game.canvas);
		this.timer = 0;
		this.mounth = 4;
		this.date = 1;
	}
	
	update(dt) {
		const enemies = this.enemy.getAliveObjects();
		const bullets = this.bullet.getAliveObjects();
		
		// タイマーの更新
		this.timer += dt;
		
		// 1秒経過したら日付を進める
		this.date = Math.floor(this.timer) + 1;
		if(this.date === 31 + this.mounth % 2)	{
			this.timer = 0;
			this.date = 1;
			this.mounth++;
		}
		// 7月を過ぎたら終了
		if(this.mounth > 7) {
			this.game.switchToScreen('start', {});
		}
		
		// プレイヤーの移動
		if ((keyPressed('arrowup') || keyPressed('w')) && this.player.sprite.y > this.player.sprite.height / 2) {
			this.player.moveUp();
		} else if ((keyPressed('arrowdown') || keyPressed('s')) && this.player.sprite.y < this.game.canvas.height - this.player.sprite.height / 2) {
			this.player.moveDown();
		}
		
		// if(keyPressed('1')) {
		// 	this.player.fireMegaBullet();
		// }
		
		// 敵の衝突判定
		enemies.forEach(enemy => {
			const bullet = bullets.find(bullet => collides(bullet, enemy));
			
			// 陣地との衝突判定
			if(collides(enemy, this.base.sprite)) {
				this.base.takeDamage(enemy.attack);
				enemy.ttl = 0;
			} 
			// 弾丸との衝突判定
			else if (bullet) {
				enemy.color = 'white';		// ヒットエフェクト
				enemy.health -= bullet.damage;
				if (enemy.health <= 0) {	// 敵が倒された場合の処理
					enemy.ttl = 0;
					if (Math.random() < this.player.sprite.dropRate) {
						this.player.sprite.items[randInt(0, this.player.sprite.items.length - 1)] += 1;  // アイテムをドロップ
					}
				}
				bullet.ttl = 0;
			}
			// 衝突していない場合
			else {
				if(enemy.color !== null) {
					enemy.color = null;
				}
			}
		});
		
		this.enemy.spawnEnemy(randInt(1, 5));
		
		// // プレイヤーが画面外に出ないようにする
		// this.player.sprite.y = Math.max(0, this.player.sprite.y);
		// this.player.sprite.y = Math.min(this.game.canvas.height - this.player.sprite.height, this.player.sprite.y);
		this.base.update();
		this.player.update(dt);
		this.enemy.update();
		this.bullet.update();
		
		// スコアの更新
		this.scoreText.text = 'スコア: ' + this.base.getHealth();
		this.dateText.text = `${this.mounth}月${this.date}日`;
		this.kakomonText.text = 'x ' + this.player.sprite.items[0];
		this.drinkText.text = 'x ' + this.player.sprite.items[1];
		this.scoreText.update();
		this.dateText.update();
		this.kakomonText.update();
		this.drinkText.update();
	}

	render() {
		this.base.render();
		this.player.render();
		this.enemy.render();
		this.bullet.render();
		
		this.scoreText.render();
		this.dateText.render();
		this.restartButton.render();
		this.items.render();
	}
}
