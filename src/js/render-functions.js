import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderGallery(images) {
  const galleryEl = document.querySelector('.gallery');
  const markupEl = images.reduce((acc, item) => {
    return acc + `
      <li class="gallery-el">
        <a href="${item.largeImageURL}" class="gallery-item">
          <div class="gallery-card">
            <img class="gallery-img" src="${item.webformatURL}" alt="${item.tags}" />
            <ul class="list-statistics">
              <li><h2 class="title-statistics">Likes</h2><p class="data-statistics">${item.likes}</p></li>
              <li><h2 class="title-statistics">Views</h2><p class="data-statistics">${item.views}</p></li>
              <li><h2 class="title-statistics">Comments</h2><p class="data-statistics">${item.comments}</p></li>
              <li><h2 class="title-statistics">Downloads</h2><p class="data-statistics">${item.downloads}</p></li>
            </ul>
          </div>
        </a>
      </li>`;
  }, '');

  galleryEl.insertAdjacentHTML('beforeend', markupEl);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}