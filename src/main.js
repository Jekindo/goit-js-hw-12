import getRefs from './js/getRefs';
import renderGalleryItems from './js/render-function';

import PixabayApiService from './js/pixabay-api';
import LoadMoreBtn from './js/load-more-btn';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onFormSubmit(evt) {
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

  loadMoreBtn.hide();

  pixabayApiService.query = searchQuery;
  refs.galleryContainer.innerHTML = '';

  pixabayApiService.resetPage();

  refs.loading.classList.remove('hidden');

  try {
    const { hits: images, totalHits } = await pixabayApiService.fetchImages(
      searchQuery
    );

    if (images.length === 0) {
      return iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    if (images.length < pixabayApiService.perPage) {
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.show();
    }

    renderGalleryItems(images);

    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Sorry, something is wrong',
    });
  } finally {
    form.reset();
    refs.loading.classList.add('hidden');
  }
}

async function onLoadMore() {
  loadMoreBtn.disable();

  try {
    const { hits, totalHits } = await pixabayApiService.fetchImages();
    const lastPage = Math.ceil(totalHits / pixabayApiService.perPage);

    if (pixabayApiService.page === lastPage) {
      loadMoreBtn.hide();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    renderGalleryItems(hits);
    smoothScroll();
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Sorry, something went wrong while loading more images.',
    });
  } finally {
    loadMoreBtn.enable();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-img');
  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    left: 0,
    top: cardHeight * 4,
    behavior: 'smooth',
  });
}
