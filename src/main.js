import getRefs from './js/getRefs';
import renderGalleryItems from './js/render-function';

import * as PixabayAPI from './js/pixabay-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const query = form.elements.query;
  const searchQuery = query.value.trim();

  if (searchQuery === '') {
    return iziToast.warning({
      position: 'topRight',
      message: 'Search query can not be an empty string !',
    });
  }

  refs.galleryContainer.innerHTML = '';

  refs.loading.classList.remove('hidden');

  PixabayAPI.fetchImages(searchQuery)
    .then(({ hits: images }) => {
      if (images.length === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      renderGalleryItems(images);

      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, something is wrong',
      });
    })
    .finally(() => {
      form.reset();
      refs.loading.classList.add('hidden');
    });
}
