const isPalindrome = (str) => {
  // Удаляем все ненужные символы и приводим строку к нижнему регистру
  const cleanedStr = str.replace(/[^A-Za-zА-Яа-я0-9]/g, '').toLowerCase();

  // Используем современные методы массива для проверки палиндрома
  return cleanedStr === [...cleanedStr].reverse().join('');
};

const extractDigits = (input) => {
  // Преобразуем входные данные в строку, если они не являются строкой
  const str = typeof input === 'string' ? input : input.toString();

  // Используем регулярное выражение для поиска всех цифр от 0 до 9 в строке
  const digits = str.match(/[0-9]/g);

  // Если нет цифр, возвращаем NaN
  if (!digits) {
    return NaN;
  }

  // Собираем все цифры в строку и преобразуем в целое число
  const number = parseInt(digits.join(''), 10);

  return number;
};

const padStart = (str, minLength, padString) => {
  // Проверяем, нужно ли дополнять строку
  if (str.length >= minLength) {
    return str; // Возвращаем исходную строку без изменений
  }

  // Вычисляем количество символов, которые нужно добавить
  const padLength = minLength - str.length;

  // Обрезаем лишние символы из строки с добавочными символами, если их длина больше необходимой
  const paddedString = padString.slice(-padLength) + str;

  return paddedString;
};

//Кекстаграм
const checkStringLength = (str, maxLength) => str.length <= maxLength;
