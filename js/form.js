import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';
import { isEscapeKey } from './util.js';
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const TAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...'
};

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const body = document.querySelector ('body');
const cancelButton = form.querySelector('#upload-cancel');
const fileField = form.querySelector('#upload-file');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text_description');
const submitButton = form.querySelector('.img-upload__submit');
const photoPreview = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown',onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  showModal();
};

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag)=>tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SUBMITTING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

pristine.addValidator(hashtagField,validateTags,TAG_ERROR_TEXT);

const setOnFormSubmit = (callback) => {
  form.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if(isValid) {
      blockSubmitButton();
      await callback(new FormData(form));
      unblockSubmitButton();
    }
  });
};


fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export {setOnFormSubmit, hideModal, onDocumentKeydown};
