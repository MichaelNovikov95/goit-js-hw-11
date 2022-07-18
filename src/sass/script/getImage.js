import Notiflix from 'notiflix';
const axios = require('axios');
import { PARAMS } from './PARAMS';
import { ref } from './refs';

let pageCount = 0;

export async function getImage(queryValue) {
  let previousQuery = localStorage.getItem('previousQuery');
  console.log(previousQuery);
  if (previousQuery !== queryValue) {
    pageCount = 1;
  } else {
    pageCount += 1;
  }

  const response = await axios.get(
    `${PARAMS.BASE_URL}?key=${PARAMS.API_KEY}&q=${queryValue}&${PARAMS.PARAM_LIST}&page=${pageCount}&per_page=${PARAMS.PER_PAGE}`
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
