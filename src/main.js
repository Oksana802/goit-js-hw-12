import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('form');
const loaderEl = document.querySelector('.loader');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let query = '';
let totalHits = 0;

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.target.elements.q.value.trim();
  
  if (!query) {
    iziToast.error({
        message: 'Please enter a search query.',
        title: '',
        backgroundColor: 'rgba(45, 173, 65, 1)',
        icon: 'my-custom-icon',
        iconColor: 'rgba(255, 255, 255, 1)',
        messageSize: '16px',
        titleLineHeight: '1.5',
        position: "topRight",
        messageColor: 'rgba(255, 255, 255, 1)',
        maxWidth: '432px'
    });
    
    return;
}
  
  page = 1;
  galleryEl.innerHTML = '';
  loaderEl.style.display = 'block';   
  loadMoreBtn.style.display = 'none';

  try {
    const data = await fetchImages({ q: query }, page);
    loaderEl.style.display = 'none';
    
    if (data.hits.length === 0) {
      iziToast.error({
        backgroundColor: 'rgba(239, 64, 64, 1)',
        message: 'Sorry, there are no images matching <br>your search query. Please try again!',
        icon: 'my-custom-icon',
        iconColor: 'rgba(255, 255, 255, 1)',
        messageSize: '16px',
        titleLineHeight: '1.5',
        position: "topRight",
        messageColor: 'rgba(255, 255, 255, 1)',
        maxWidth: '432px'
      });
      return;
    }

    renderGallery(data.hits);
    formEl.reset();
    totalHits = data.totalHits;
    
    if (page * 15 < totalHits) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    loaderEl.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  } 
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loaderEl.style.display = 'block';

  try {
    const data = await fetchImages({ q: query }, page);
    loaderEl.style.display = 'none';
    renderGallery(data.hits);

    if (page * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    window.scrollBy({
      top: galleryEl.lastElementChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });
  

  } catch (error) {
    loaderEl.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
});
