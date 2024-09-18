import {renderGallery} from './gallery.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce} from './util.js';
import {setOnFormSubmit, hideModal} from './form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import { init as initFilter, getFilteredPictures } from './filter.js';
//3
setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  initFilter(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch {
  showAlert();
}


//2
/*
getData(renderPicture, showAlert);
setOnFormSubmit();
*/
