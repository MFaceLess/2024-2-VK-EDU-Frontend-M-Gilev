/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Округление, максимум,
 * до 2 знаков после запятой, исключая нули.
 *  Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * `convertBytesToHuman(1610612736) === '1.5 GB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа).
 * В случае передачи неподходящего аргумента,
 * функция должна вернуть false.
 */

export default function convertBytesToHuman(bytes) {
  if (typeof(bytes) !== 'number' || bytes < 0) {
    return false;
  }
  var suffix = new Map([
    [0, "B"],
    [1, "KB"],
    [2, "MB"],
    [3, "GB"],
    [4, "TB"],
    [5, "PB"],
    [6, "EB"],
    [7, "ZB"],
    [8, "YB"],
    [9, "RB"],
    [10, "QB"]
  ]);
  const DIVIDER = 1024;

  let sfx = 0;
  while (bytes / DIVIDER % 10 >= 1) {
    sfx += 1;
    bytes /= DIVIDER;
  }

  if (sfx > 10) {
    throw new TypeError("Too Large Number");
  }
  return parseFloat(bytes.toFixed(2)) + " " + suffix.get(sfx);
}
