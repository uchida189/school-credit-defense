import { keyPressed, randInt, Button, Text, Grid, collides } from '../../node_modules/kontra/kontra.mjs';
import { Player } from './player.js';
import { Base } from './base.js';
import { Enemy } from './enemy.js';
import { Bullet } from './bullet.js';
import { ENEMY_SETTINGS } from './constants.js';

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
				font: '20px Arial, sans-serif'
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
			
			// // アイテムの所持数
			// this.items = Grid({
			// 	x: 0,
			// 	y: 10,
			// 	width: this.game.canvas.width,
			// 	flow: 'row',
			// 	colGap: 5,
			// 	textAlign: 'center',
			// 	anchor: { x: 0, y: 0 },
			// 	children: [
			// 		this.score,
			// 		this.restartButton
			// 	]
			// });
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
						if (Math.random() < player.dropRate) {
							player.items[randInt(0, player.items.length - 1)] += 1;  // アイテムをドロップ
						}
					}
					bullet.ttl = 0;
				}
				// 衝突していない場合
				else {
					enemy.color = ENEMY_SETTINGS[enemy.enemyType].color;
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
			this.scoreText.update();
			this.dateText.update();
			// this.restartButton.update();
    }

    render() {
			this.base.render();
			this.player.render();
			this.enemy.render();
			this.bullet.render();
			
			this.scoreText.render();
			this.dateText.render();
			this.restartButton.render();
			// this.items.render();
    }
}

// import { init, Sprite, Pool, GameLoop, initKeys, keyPressed, collides, randInt, Text } from '../../node_modules/kontra/kontra.mjs';
// import { ENEMY_SETTINGS, PLAYER_TYPE_SETTINGS } from './constants.js'; //敵のタイプごとの設定

// let { canvas } = init();  // canvasを初期化
// initKeys();  // キーボード入力を初期化

// let playerType = 1;  // プレイヤータイプ

// // プレイヤー
// // let player = null;
// const playerSettings = PLAYER_TYPE_SETTINGS[playerType];

// let player = Sprite({
//   x: 100,                       // x座標
//   y: canvas.height / 2,         // y座標
//   width: 20,                    // 幅
//   height: 40,                   // 高さ
//   color: playerSettings.color,  // 色
//   moveSpeed: playerSettings.moveSpeed,      // 移動速度
//   attackSpeed: playerSettings.attackSpeed,  // 攻撃速度 (秒)
//   attackPower: playerSettings.attackPower,  // 攻撃力
//   dropRate: playerSettings.dropRate,        // 弾の発射率
//   timeSinceLastFire: 0,       // 最後に弾丸を発射してからの経過時間
//   anchor: { x: 0.5, y: 0.5 }, // 中心を基準にする
//   items: [0, 0, 0],           // アイテムの所持数
  
//   update(dt) {
//     this.timeSinceLastFire += dt;  // 経過時間を更新
//     if (this.timeSinceLastFire >= this.attackSpeed) {
//       fireBullet(this.x, this.y, 10, this.attackPower); // 弾を発射
//       this.timeSinceLastFire = 0;     // タイマーをリセット
//     }
//   }
// });

// // 弾丸のプール
// let bulletPool = Pool({
//   create: Sprite,
//   maxSize: 20,  // 最大数
// });

// // 敵のプール
// let enemyPool = Pool({
//   create: Sprite, // または、カスタムの Enemy クラス
//   maxSize: 20,    // 敵の最大数 (調整可能)
// });

// // 陣地
// let base = Sprite({
//   x: 0,
//   y: 0,
//   color: 'gray',
//   width: 200,
//   height: canvas.height,
//   health: 1200    // 耐久値
// });

// // アイテム2(ガバい)
// let item2 = Sprite({
//   x: 0,
//   y: 0,
//   color: 'darkred',
//   width: 10,
//   height: 50,
//   damage: 500,
//   anchor: { x: 0, y: 0.5 },
//   dx: 0,
//   ttl: 0,  // 存在時間
//   // timeSinceFire: 0,       // 弾丸を発射してからの経過時間
//   update() {
//     this.width *= 2;
//     if (this.width >= canvas.width) {
//       this.width /= 2;
//     }
//     if (this.width < 20) {
//       this.ttl = 0;
//     }
//     const enemies = enemyPool.getAliveObjects().filter(enemy => collides(this, enemy));
//     if (enemies.length > 0) {
//       enemies.forEach(enemy => {
//         enemy.health -= this.damage;
//         if (enemy.health <= 0) {
//           enemy.ttl = 0;
//         }
//       });
//     }
//   }
// });

// // スコア
// let score = Text({
//   text: 'Score: ' + base.health,
//   font: '32px Arial',
//   color: 'black',
//   x: 16,
//   y: 16,
//   anchor: {x: 0, y: 0},
//   textAlign: 'center'
// });
// // アイテムの所持数
// let itemText = Text({
//   text: 'Items: ' + player.items.join(', '),
//   font: '16px Arial',
//   color: 'black',
//   x: 16,
//   y: 48,
//   anchor: {x: 0, y: 0},
//   textAlign: 'center'
// });


// // 弾丸を発射する関数
// const fireBullet = (x, y, dx, damage) => {
//   bulletPool.get({  // プールから取得
//     x: x,
//     y: y,
//     width: 10,
//     height: 5,
//     color: 'black',
//     ttl: 120, // 存在時間
//     dx: dx,   // 速度
//     anchor: { x: 0.5, y: 0.5 },
//     damage: damage,
//   });
// };

// // 敵を生成する関数 (game.js などで)
// function spawnEnemy(phase, difficulty, enemyType) {
//   const settings = ENEMY_SETTINGS[enemyType]; // タイプ別の設定
//   enemyPool.get({
//     x: canvas.width,
//     y: randInt(0, canvas.height - 30), // ランダムなy座標
//     enemyType: enemyType,
//     width: settings.width,
//     height: settings.height,
//     color: settings.color,
//     dx: settings.speed,      // 敵の速度
//     health: settings.health, // 敵の体力
//     attack: settings.attack, // 敵の攻撃力
    
//     // update() {
//     //   this.advance();
//     // },
//   });
// }

// let loop = GameLoop({  // ゲームループ
//   update: function(dt) {
//     const enemies = enemyPool.getAliveObjects();
//     const bullets = bulletPool.getAliveObjects();
    
//     // プレイヤーの操作
//     if((keyPressed('arrowup') || keyPressed('w')) && player.y > player.height / 2) {
//       console.log('up');
//       player.y -= player.moveSpeed;
//     } else if((keyPressed('arrowdown') || keyPressed('s')) && player.y < canvas.height - player.height / 2) {
//       console.log('down');
//       player.y += player.moveSpeed;
//     };
    
//     // アイテムの使用
//     if(keyPressed('1') && player.items[0] > 0) {
//       player.items[0] -= 1;
//       player.attackPower += 50;
//     } else if(keyPressed('2') && player.items[1] > 0) {
//       player.items[1] -= 1;
//       item2.x = player.x + player.width;
//       item2.y = player.y;
//       item2.ttl = 120;
//     } else if(keyPressed('3') && player.items[2] > 0) {
//       player.items[2] -= 1;
//       base.health < 1100 ? base.health += 100 : base.health = 1200;
//     }
    
//     // 敵の衝突判定
//     enemies.forEach(enemy => {
//       const bullet = bullets.find(bullet => collides(bullet, enemy));
      
//       if(collides(enemy, base)) { // 陣地との衝突判定
//         base.health -= enemy.attack;
//         enemy.ttl = 0;
//       } else if (bullet) {        // 弾丸との衝突判定
//         enemy.color = 'white';    // ヒットエフェクト
//         enemy.health -= bullet.damage;
//         if (enemy.health <= 0) {  // 敵が倒された場合の処理
//           enemy.ttl = 0;
//           if (Math.random() < player.dropRate) {
//             player.items[randInt(0, player.items.length - 1)] += 1;  // アイテムをドロップ
//           }
//         }
//         bullet.ttl = 0;
//       } else {
//         enemy.color = ENEMY_SETTINGS[enemy.enemyType].color;
//       }
//     }, this);
    
//     // 敵の生成
//     if (enemies.length < 10) {
//       spawnEnemy(1, 1, randInt(1, 5));
//     }
    
//     // スコアの更新
//     score.text = 'Score: ' + base.health;
//     itemText.text = 'Items: ' + player.items.join(', ');
    
//     base.update();
//     player.update(dt);
//     enemyPool.update();
//     bulletPool.update();
//     item2.update();
//   },
//   render: function() {
//     base.render();
//     player.render();  // スプライトを描画
//     enemyPool.render();
//     bulletPool.render();
//     score.render();
//     itemText.render();
//     item2.render();
//   }
// });

// loop.start();  // ゲームループを開始