// 定数を定義
export const PLAYER_TYPE_SETTINGS = {
    1: { // タイプ1
        color: 'red',
        moveSpeed: 8,
        attackSpeed: 0.1, // 例: 0.5秒ごとに攻撃
        attackPower: 50,
        dropRate: 0.1, // 例: 10%
    },
    2: { // タイプ2
        color: 'orange',
        moveSpeed: 4,
        attackSpeed: 0.3,
        attackPower: 30,
        dropRate: 0.1,
    },
    3: { // タイプ3
        color: 'yellow',
        moveSpeed: 6,
        attackSpeed: 0.2,
        attackPower: 40,
        dropRate: 0.3,
    }
};

export const ENEMY_SETTINGS = {
    1: { // タイプ1
        color: 'lightgreen',
        width: 150,
        height: 200,
        speed: -1,
        health: 100,
        attack: 10,
    },
    2: { // タイプ2
        color: 'green',
        width: 150,
        height: 200,
        speed: -0.5,
        health: 200,
        attack: 20,
    },
    3: { // タイプ3
        color: 'blue',
        width: 150,
        height: 200,
        speed: -0.4,
        health: 300,
        attack: 50,
    },
    4: { // タイプ4
        color: 'purple',
        width: 150,
        height: 200,
        speed: -0.2,
        health: 500,
        attack: 100,
    },
    5: { // タイプ5
        color: 'black',
        width: 150,
        height: 200,
        speed: -0.1,
        health: 1000,
        attack: 300,
    }
};