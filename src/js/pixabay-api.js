import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46194524-ed8204bc29acf0aaf22e3d7ea';

export async function fetchImages(params, page = 1) {
  const urlParams = new URLSearchParams({
    q: params.q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${urlParams}`);
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong with the request');
  }
}

