// Запуск игры
//
// - создать элемент и добавить его на страницу
// - создать на этом элементе игру с помощью `createGameOfLife` с размерами поля x / y
import "./styles/style.scss";


const { createGameOfLife } = require("./createGameOfLife");

// - для проверки своего кода можно создать еще один элемент и создать вторую игру на этой же странице

const gameContainer = document.querySelector(".game-fields");
const gameWrapper1 = document.createElement("div");
const gameWrapper2 = document.createElement("div");

gameContainer?.append(gameWrapper1);
gameContainer?.append(gameWrapper2);

createGameOfLife(3, 3, gameWrapper1);
createGameOfLife(10, 10, gameWrapper2);
