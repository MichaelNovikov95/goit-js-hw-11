import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImage } from '../src/sass/script/getImage';
import { galleryMarkup } from '../src/sass/script/galleryMarkup';
import { buttonHandlePhotoLoad } from '../src/sass/script/buttonHandlePhotoLoad';
import { ref } from './sass/script/refs';
import { PARAMS } from './sass/script/PARAMS';

let pageCount = 1;
let searchQuery = '';

//SUBMIT FUNCTION
function inputHandle(e) {
  e.preventDefault();
  const { value } = ref.inputSearch.elements[0];

  searchQuery = value.trim();

  if (!searchQuery) {
    Notiflix.Notify.failure('Please, enter a word!');
    return;
  }

  ref.galleryBox.innerHTML = '';
  ref.buttonLoad.classList.add('is-hidden');

  getImage(searchQuery)
    .then(({ hits: results, totalHits, total }) => {
      let totalPages = totalHits / PARAMS.PER_PAGE;
      const markup = galleryMarkup(results);
      ref.galleryBox.insertAdjacentHTML('beforeend', markup);
      let lightbox = new SimpleLightbox('.photo-card a', {
        captions: true,
        captionDelay: 250,
      });
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      Notiflix.Notify.success(`Hooray! We found ${total} images.`);
      ref.inputSearch.reset();

      if (pageCount === 1 && totalPages > 1) {
        ref.buttonLoad.classList.remove('is-hidden');
      }
    })
    .catch(console.log);
}

//LOAD MORE IMAGES

//CREATE MARKUP

//GET IMAGES FROM BACKEND

//SUBMIT EVENTlISTENER
ref.buttonLoad.addEventListener('click', buttonHandlePhotoLoad);
ref.inputSearch.addEventListener('submit', inputHandle);
