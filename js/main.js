import {getPictures} from './data.js';
import {renderGallery} from './gallery.js';

//3
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {setOnFormSubmit, hideModal} from './form.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
//1
//import './form.js'; // не все добавлены

//1

renderGallery(getPictures());

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
  renderGallery(data);
} catch {
  showAlert();
}


//2
/*
getData(renderPicture, showAlert);
setOnFormSubmit();
*/
