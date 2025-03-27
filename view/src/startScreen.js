import { Text, Button, Grid } from '../../node_modules/kontra/kontra.mjs';

export class StartScreen {
  constructor(game) {
    this.game = game;
    this.difficulties = ['情報経営', '機械科', '電気科'];
    this.difficultyExplanation = ['最も簡単な学科です. 暇です', '一般的な難易度の学科です. つらいです', '地獄のような学科です. おすすめしません'];
    this.playerTypes = ['真面目', '詰め込み', 'コミュ強'];
    this.playerTypeExplanation = ['最強の学生です. 全能力がバランスよく高水準です', '詰め込み学習が得意な学生です. 4・6月は最弱, 5・7月は最強になります', 'コミュニケーションが得意な学生です. アイテムのドロップ率が高いです'];
    this.selectedDifficulty = 1; // 初期難易度
    this.selectedPlayerType = 1;   // 初期プレイヤータイプ
    
    // テキストのオプション
    this.textOptions = {
      color: 'white',
      font: '20px Arial, sans-serif'
    };
    
    // 難易度選択
    this.difficultyCaption = Text({
      x: 80,
      y: 50,
      text: '【難易度】',
      ...this.textOptions
    });
    this.difficultyPrevButton = Button({
      text: {
        text: '<',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された難易度を取得
        // this.selectedDifficulty = this.difficulties[(this.difficulties.indexOf(this.selectedDifficulty) - 1 + this.difficulties.length) % this.difficulties.length];
        this.selectedDifficulty = (this.selectedDifficulty - 2 + this.difficulties.length) % this.difficulties.length;
      }
    });
    this.difficultyNextButton = Button({
      text: {
        text: '>',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された難易度を取得
        // this.selectedDifficulty = this.difficulties[(this.difficulties.indexOf(this.selectedDifficulty) + 1) % this.difficulties.length];
        this.selectedDifficulty = (this.selectedDifficulty % this.difficulties.length) + 1;
      }
    });
    this.difficultyText = Text({
      width: 100,
      // text: `${this.selectedDifficulty}`,
      text: `${this.difficulties[this.selectedDifficulty - 1]}`,
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
    this.difficultyExplanationText = Text({
      x: 100,
      y: 125,
      // width: 300,
      text: `${this.difficultyExplanation[this.selectedDifficulty - 1]}`,
      color: 'white',
      font: '16px Arial, sans-serif',
      textAlign: 'start'
    });
    
    // 機体選択
    this.playerTypeCaption = Text({
      x: 80,
      y: 175,
      text: '【プレイヤータイプ】',
      ...this.textOptions
    });
    this.playerTypePrevButton = Button({
      text: {
        text: '<',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された機体を取得
        // this.selectedPlayerType = this.playerTypes[(this.playerTypes.indexOf(this.selectedPlayerType) - 1 + this.playerTypes.length) % this.playerTypes.length];
        this.selectedPlayerType = (this.selectedPlayerType - 2 + this.playerTypes.length) % this.playerTypes.length;
      }
    });
    this.playerTypeNextButton = Button({
      text: {
        text: '>',
        ...this.textOptions
      },
      onDown: () => {
        // 選択された機体を取得
        // this.selectedPlayerType = this.playerTypes[(this.playerTypes.indexOf(this.selectedPlayerType) + 1) % this.playerTypes.length];
        this.selectedPlayerType = (this.selectedPlayerType % this.playerTypes.length) + 1;
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
      y: 225,
      colGap: 5,
      flow: 'row',
      anchor: { x: 0, y: 0.5 },
      children: [
        this.playerTypePrevButton,
        this.playerTypeText,
        this.playerTypeNextButton
      ]
    });
    this.playerTypeExplanationText = Text({
      x: 100,
      y: 250,
      // width: 300,
      text: `${this.playerTypeExplanation[this.selectedPlayerType - 1]}`,
      color: 'white',
      font: '16px Arial, sans-serif',
      textAlign: 'start'
    });

    // ヘルプボタン (簡易版)
    this.helpCaption = Text({
      x: 80,
      y: 325,
      text: '【操作説明】',
      color: 'white',
      font: '20px Arial'
    });
    this.helpText = Text({
      x: 100,
      y: 360,
      text: '・迫り来る課題からGPAを守りましょう \n・期間は4~7月の4ヶ月です\n・5月と7月はテスト期間なので課題が爆増します \n・↑ または W で上に移動,  ↓ または S で下に移動 \n・1, 2, 3 でアイテム使用',
      lineHeight: 1.5,
      color: 'white',
      font: '16px Arial, sans-serif',
    });

    // ゲーム開始ボタン
    this.startButton = Button({
      x: 100,
      y: 525,
      text: {
        text: 'ゲームスタート',
        color: 'white',
        font: '20px Arial'
      },
      onDown: () => {
        this.game.switchToScreen('game', {
          difficulty: this.selectedDifficulty,
          playerType: this.selectedPlayerType
        });
      }
    });
  }

  update() {
    this.difficultyText.text = this.difficulties[this.selectedDifficulty - 1];
    this.playerTypeText.text = this.playerTypes[this.selectedPlayerType - 1];
    this.difficultyExplanationText.text = this.difficultyExplanation[this.selectedDifficulty - 1];
    this.playerTypeExplanationText.text = this.playerTypeExplanation[this.selectedPlayerType - 1];
    
    this.difficultySelect.update();
    this.playerTypeSelect.update();
    this.difficultyExplanationText.update();
    this.playerTypeExplanationText.update();
    this.startButton.update();
  }

  render() {
    this.difficultyCaption.render();
    this.difficultySelect.render();
    this.difficultyExplanationText.render();
    this.playerTypeCaption.render();
    this.playerTypeSelect.render();
    this.playerTypeExplanationText.render();
    this.helpCaption.render();
    this.helpText.render();
    this.startButton.render();
  }
}