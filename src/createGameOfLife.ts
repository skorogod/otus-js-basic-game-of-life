/* eslint-disable no-param-reassign */

import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";

/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(sizeX: number, sizeY: number, htmlElement: Element): void {
  const speedInput: HTMLInputElement | null = document.querySelector('.speed-input');
  const speedValueField: HTMLElement | null = document.querySelector('.speed-value');
  let timeout: number;

  if (!speedInput || !speedValueField) {
    throw new Error("speed input field not found");
  }

  speedValueField.innerHTML = speedInput?.value;
  timeout = Number(speedInput.value);

  speedInput.addEventListener('input', function() {
    if (speedValueField) {
      speedValueField.innerHTML = speedInput.value;
      timeout = Number(speedInput.value);
    }
  })

  let gameIsRunning = false;
  let timer:  ReturnType<typeof setInterval>;

  // Создать блок для поля
  // Создать кнопку управления игрой
  htmlElement.innerHTML = `<div class="field-wrapper"></div><button>Start</button>`;
  const fieldWrapper = htmlElement.querySelector(".field-wrapper") as Element;
  const button = htmlElement.querySelector("button");

  if(!button) {
    throw new Error("Button not found");
  }

  // Создать поле заданного размера
  let field = Array.from({ length: sizeY }).map(() =>
    Array.from({ length: sizeX }).fill(0)
  ) as Array<Array<number>>;

  console.log(field);

  const cellClickHandler = (x: number, y: number) => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(fieldWrapper, field, cellClickHandler);
  };

  // Отрисовать поле заданного размера
  drawField(fieldWrapper, field, cellClickHandler);
  console.log(fieldWrapper.innerHTML);
  // При клике по ячейке поля
  // - поменять его состояние
  // - перерисовать поле
  function stopGame(): void {
    if(!button) {
      throw new Error("Button not found");
    }
    gameIsRunning = false;
    button.innerHTML = "Start";
    // При клике на кнопке `Stop` остановить таймер
    clearInterval(timer);
  }
  function startGame(): void{
    if(!button) {
      throw new Error("Button not found");
    }
    // При клике по кнопке старт
    // - поменять надпись на `Stop`
    gameIsRunning = true;
    button.innerHTML = "Stop";
    // - запустить таймер для обновления поля
    timer = setInterval(() => {
      // В таймере обновления поля
      // - посчитать новое состояние поля
      // - отрисовать новое состояние поля
      // - проверить, что есть живые клетки
      // - если живых клеток нет
      //    - остановить таймер
      //    - вывести сообщение
      field = getNextState(field);
      drawField(fieldWrapper, field, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        alert("Death on the block");
        stopGame();
      }
    }, 1000/timeout);
  }

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
}
