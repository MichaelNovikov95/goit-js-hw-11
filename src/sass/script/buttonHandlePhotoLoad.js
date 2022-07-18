import Notiflix from 'notiflix';
import { galleryMarkup } from '../script/galleryMarkup';
import SimpleLightbox from 'simplelightbox';
import { ref } from './refs';
import { PARAMS } from './PARAMS';

let pageCount = 1;

export function buttonHandlePhotoLoad() {
  pageCount += 1;

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
    ref.inputSearch.reset();
  });
}
