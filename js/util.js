const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  // Обмен значениями, если min больше max
  if (min > max) {
    [min, max] = [max, min];
  }
  // Округляем min и max до ближайших целых чисел
  min = Math.ceil(min);
  max = Math.floor(max);
  // Возвращаем случайное целое число в диапазоне от min до max включительно
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/*
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
*/

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, ALERT_SHOW_TIME);
};
export {getRandomInteger, getRandomArrayElement, isEscapeKey, showAlert};
