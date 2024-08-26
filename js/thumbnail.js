const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const createThumbnail = (picture) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = picture.url;
  thumbnail.querySelector('.picture__img').alt = picture.deskription;
  thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = picture.likes;
  thumbnail.dataset.thumbnailId = picture.id;
  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};

export {renderThumbnails};
