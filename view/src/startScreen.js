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
    
    // 難易度選択
    this.difficultyCaption = Text({
      x: 100,
      y: 50,
      text: '難易度',
      ...this.textOptions
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
    this.playerTypeCaption = Text({
      x: 100,
      y: 150,
      text: 'プレイヤータイプ',
      ...this.textOptions
    });
    this.playerTypePrevButton = Button({
      text: {
        text: '<',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された機体を取得
        this.selectedPlayerType = this.playerTypes[(this.playerTypes.indexOf(this.selectedPlayerType) - 1 + this.playerTypes.length) % this.playerTypes.length];
      }
    });
    this.playerTypeNextButton = Button({
      text: {
        text: '>',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された機体を取得
        this.selectedPlayerType = this.playerTypes[(this.playerTypes.indexOf(this.selectedPlayerType) + 1) % this.playerTypes.length];
      }
    });
    this.playerTypeText = Text({
      width: 100,
      text: `${this.selectedPlayerType}`,
      ...this.textOptions,
      textAlign: 'center'
    });
    this.playerTypeSelect = Grid({
      x: 100,
      y: 200,
      colGap: 5,
      flow: 'row',
      anchor: { x: 0, y: 0.5 },
      children: [
        this.playerTypePrevButton,
        this.playerTypeText,
        this.playerTypeNextButton
      ]
    });

    // ヘルプボタン (簡易版)
    this.helpButton = Button({
      x: 100,
      y: 250,
      text: {
        text: '操作説明',
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
        text: 'ゲームスタート',
        color: 'white',
        font: '20px Arial'
      },
      onDown: () => {
        // 難易度とプレイヤータイプを数値に変換
        const difficultyMap = { 'Easy': 1, 'Normal': 2, 'Hard': 3 };
        const playerTypeMap = { 'Type1': 1, 'Type2': 2, 'Type3': 3 };
        const selectedDifficultyValue = difficultyMap[this.selectedDifficulty];
        const selectedPlayerTypeValue = playerTypeMap[this.selectedPlayerType];

        this.game.switchToScreen('game', {
          difficulty: selectedDifficultyValue,
          playerType: selectedPlayerTypeValue
        });
      }
    });
  }

  update() {
    this.difficultyText.text = this.selectedDifficulty;
    this.playerTypeText.text = this.selectedPlayerType;
    
    this.difficultySelect.update();
    this.playerTypeSelect.update();
    this.helpButton.update();
    this.startButton.update();
  }

  render() {
    this.difficultyCaption.render();
    this.difficultySelect.render();
    this.playerTypeCaption.render();
    this.playerTypeSelect.render();
    this.helpButton.render();
    this.startButton.render();
  }
}