import { Text, Button, Grid } from '../../node_modules/kontra/kontra.mjs';

export class StartScreen {
  constructor(game) {
    this.game = game;
    this.difficulties = ['Easy', 'Normal', 'Hard'];
    this.playerTypes = ['Type1', 'Type2', 'Type3'];
    this.selectedDifficulty = 'Normal'; // 初期難易度
    this.selectedPlayerType = 'Type1';   // 初期プレイヤータイプ
    
    // テキストのオプション
    this.textOptions = {
      color: 'white',
      font: '20px Arial, sans-serif'
    };
    
    // 難易度選択ドロップダウン (簡易版)
    this.difficultyCaption = Text({
      x: 100,
      y: 50,
      text: '難易度',
      font: '20px Arial',
      color: 'white'
    });
    this.difficultyPrevButton = Button({
      text: {
        text: '<',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された難易度を取得
        this.selectedDifficulty = this.difficulties[(this.difficulties.indexOf(this.selectedDifficulty) - 1 + this.difficulties.length) % this.difficulties.length];
      }
    });
    this.difficultyNextButton = Button({
      text: {
        text: '>',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された難易度を取得
        this.selectedDifficulty = this.difficulties[(this.difficulties.indexOf(this.selectedDifficulty) + 1) % this.difficulties.length];
      }
    });
    this.difficultyText = Text({
      width: 100,
      text: `${this.selectedDifficulty}`,
      ...this.textOptions,
      textAlign: 'center'
    });
    this.difficultySelect = Grid({
      x: 100,
      y: 100,
      rowGap: 5,
      colGap: 5,
      flow: 'row',
      anchor: { x: 0, y: 0.5 },
      children: [
        this.difficultyPrevButton,
        this.difficultyText,
        this.difficultyNextButton
      ]
    });
    
    
    // 機体選択
    this.playerTypeText = Text({
      x: 100,
      y: 200,
      text: `Player Type: ${this.selectedPlayerType}`,
      font: '20px Arial',
      color: 'white',
      onDown: () => {
        let currentIndex = this.playerTypes.indexOf(this.selectedPlayerType);
        this.selectedPlayerType = this.playerTypes[(currentIndex + 1) % this.playerTypes.length];
        this.playerTypeText.text = `Player Type: ${this.selectedPlayerType}`;
        }
    });

    // ヘルプボタン (簡易版)
    this.helpButton = Button({
      x: 100,
      y: 250,
      text: {
        text: 'Help',
        color: 'white',
        font: '20px Arial'
      },
      onDown: () => {
        // ヘルプ表示 (簡易版: アラート)
        alert('操作方法: ↑↓/WS で移動, 1/2 でアイテム使用');
      }
    });

    // ゲーム開始ボタン
    this.startButton = Button({
      x: 100,
      y: 300,
      text: {
        text: 'Start Game',
        color: 'white',
        font: '20px Arial'
      },
      onDown: () => {
        // 難易度とプレイヤータイプを数値に変換
        const difficultyMap = { 'Easy': 1, 'Normal': 2, 'Hard': 3 };
        const playerTypeMap = { 'Type1': 1, 'Type2': 2, 'Type3': 3 };
        const selectedDifficultyValue = difficultyMap[this.selectedDifficulty];
        const selectedPlayerTypeValue = playerTypeMap[this.selectedPlayerType];

        this.game.switchToGameScreen(selectedDifficultyValue, selectedPlayerTypeValue);
      }
    });
  }

  update() {
    this.difficultyText.text = this.selectedDifficulty;
    
    // this.difficultyText.update();
    // this.difficultyPrevButton.update();
    // this.difficultyNextButton.update();
    this.difficultySelect.update();
    this.playerTypeText.update();
    this.helpButton.update();
    this.startButton.update();
  }

  render() {
    this.difficultyCaption.render();
    // this.difficultyPrevButton.render();
    // this.difficultyNextButton.render();
    // this.difficultyText.render();
    this.difficultySelect.render();
    this.playerTypeText.render();
    this.helpButton.render();
    this.startButton.render();
  }
}