const isPalindrome = (str) => {
  // Удаляем все ненужные символы и приводим строку к нижнему регистру
  const cleanedStr = str.replace(/[^A-Za-zА-Яа-я0-9]/g, '').toLowerCase();

  // Используем современные методы массива для проверки палиндрома
  return cleanedStr === [...cleanedStr].reverse().join('');
};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

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

extractDigits('2023 год'); // 2023
extractDigits('ECMAScript 2022'); // 2022
extractDigits('1 кефир, 0.5 батона'); // 105
extractDigits('агент 007'); // 7
extractDigits('а я томат'); // NaN

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

// Добавочный символ использован один раз
padStart('1', 2, '0'); // '01'

// Добавочный символ использован три раза
padStart('1', 4, '0'); // '0001'

// Добавочные символы обрезаны с конца
padStart('q', 4, 'werty'); // 'werq'

// Добавочные символы использованы полтора раза
padStart('q', 4, 'we'); // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
padStart('qwerty', 4, '0'); // 'qwerty'

//Кекстаграм
const checkStringLength = (str, maxLength) => str.length <= maxLength;

// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false
