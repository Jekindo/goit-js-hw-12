import getRefs from '../js/getRefs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = getRefs();

export default function renderGalleryItems(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <li class="gallery-item">
            <div class="thumb">
              <a href="${largeImageURL}">
                <img class="gallery-img" src="${webformatURL}" alt="${tags}" />
              </a>
            </div>
            <div class="meta">
              <div class="meta-column">
                <h3 class="meta-title">Likes</h3>
                <p class="meta-text">${likes}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Views</h3>
                <p class="meta-text">${views}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Comments</h3>
                <p class="meta-text">${comments}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Downloads</h3>
                <p class="meta-text">${downloads}</p>
              </div>
            </div>
          </li>
        `;
      }
    )
    .join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
