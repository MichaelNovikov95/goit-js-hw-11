import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImage } from '../src/sass/script/getImage';
import { galleryMarkup } from '../src/sass/script/galleryMarkup';
import { ref } from './sass/script/refs';
import { PARAMS } from './sass/script/PARAMS';

let pageCount = 1;
let searchQuery = '';

//SUBMIT FUNCTION
export function inputHandle(e) {
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
      localStorage.setItem('previousQuery', ref.inputSearch.elements[0].value);
      if (pageCount === 1 && totalPages > 1) {
        ref.buttonLoad.classList.remove('is-hidden');
      }
    })
    .catch(console.log);
}

//LOAD MORE IMAGES
function buttonHandlePhotoLoad() {
  getImage(searchQuery).then(({ hits: results, totalHits, total }) => {
    let totalPages = totalHits / PARAMS.PER_PAGE;

    if (pageCount >= Math.round(totalPages)) {
      ref.buttonLoad.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
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
  });
}

//GET IMAGES

//SUBMIT EVENTlISTENER
ref.buttonLoad.addEventListener('click', buttonHandlePhotoLoad);
ref.inputSearch.addEventListener('submit', inputHandle);
