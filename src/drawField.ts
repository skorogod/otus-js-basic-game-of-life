/**
 * отрисовка поля
 * @param field {number[][]} - состояние поля
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисовано поле
 * @param onCellClick {(x: number, y: number) => void}
 * @returns void
 */
// @ts-ignore
export function drawField(
  htmlElement: Element,
  field: Array<Array<number>>,
  onCellClick: Function,
): void {
  const rowIterator = (row: Array<number>, rowIndex: number) =>
    `<tr>${row
      .map((cell: number, columnIndex: number) => {
        if (cell === 1) {
          return `<td 
        data-x=${columnIndex}
        data-y=${rowIndex}
        class="cell alive" 
        style="background-color:#FA58D0; height:10px; width:10px;"></td>`;
        }
        return `<td 
      data-x=${columnIndex}
      data-y=${rowIndex}
      class="cell dead" 
      style="background-color:#FFFFFF; height:10px; width:10px;"></td>`;
      })
      .join("")}</tr>`;

  const table = `<table border=1>${field.map(rowIterator).join("")}</table>`;

  // eslint-disable-next-line no-param-reassign
  htmlElement.innerHTML = table;
  console.log(htmlElement.innerHTML);

  htmlElement.querySelector("table")!.addEventListener("click", (ev: Event) => {
    const clickedElement = ev.target;
    // @ts-ignore
    const x = clickedElement.getAttribute("data-x");
    // @ts-ignore
    const y = clickedElement.getAttribute("data-y");
    if (x >= 0 && y >= 0) {
      onCellClick(Number(x), Number(y));
    }
  });
}
