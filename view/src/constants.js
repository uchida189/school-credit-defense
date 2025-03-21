// 定数を定義
export const PLAYER_TYPE_SETTINGS = {
    1: { // タイプ1
        color: 'skyblue',
        moveSpeed: 5,
        attackSpeed: 0.5, // 例: 0.5秒ごとに攻撃
        attackPower: 10,
        dropRate: 0.1, // 例: 10%
    },
    2: { // タイプ2
        color: 'orange',
        moveSpeed: 3,
        attackSpeed: 0.7,
        attackPower: 8,
        dropRate: 0.05,
    },
    3: { // タイプ3
        color: 'yellow',
        moveSpeed: 4,
        attackSpeed: 0.6,
        attackPower: 9,
        dropRate: 0.2,
    }
};

export const ENEMY_SETTINGS = {
    1: { // タイプ1
        color: 'green',
        width: 20,
        height: 40,
        speed: -2,
        health: 100,
        attack: 5,
    },
    2: { // タイプ2
        color: 'blue',
        width: 30,
        height: 60,
        speed: -1,
        health: 200,
        attack: 10,
    },
    3: { // タイプ3
        color: 'purple',
        width: 40,
        height: 80,
        speed: -0.5,
        health: 300,
        attack: 15,
    }
};