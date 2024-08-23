/*
1 Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.

2 Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
Описание фотографии description вставьте строкой в блок .social__caption.

3 После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

4 После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

5 Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

6 Подключите модуль в проект.


*/

//const bigPictureElement = document.querySelector('.big-picture');

//const userModalOpenElement = document.querySelector('.setup-open');
//const userModalCloseElement = bigPictureElement.querySelector('.setup-close');

//bigPictureElement.classList.remove('hidden');


const COMMENTS_FOR_TIME = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

let commentsShown = 0;
let comments = [];

const createComment = ({avatar,name,message}) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += COMMENTS_FOR_TIME;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentShownCountElement.textContent = commentsShown;
  commentTotalCountElement.textContent = comments.length;
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const onCommentsLoaderClick = () => renderComments();

const renderPictureDetails = ({url,likes,description}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  comments = data.comments;

  if(comments.length > 0) {
    renderComments();
  }
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export {showBigPicture};
