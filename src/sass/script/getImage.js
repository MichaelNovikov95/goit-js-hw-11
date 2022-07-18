import Notiflix from 'notiflix';
const axios = require('axios');
import { PARAMS } from './PARAMS';

let pageCount = 1;

export async function getImage(value) {
  const response = await axios.get(
    `${PARAMS.BASE_URL}?key=${PARAMS.API_KEY}&q=${value}&${PARAMS.PARAM_LIST}&page=${pageCount}&per_page=40`
  );
  const image = await response.data;
  if (!image.total) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    ref.inputSearch.reset();
    return;
  } else {
    return image;
  }
}
