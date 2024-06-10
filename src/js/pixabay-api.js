import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 15;
  }

  async fetchImages() {
    const params = new URLSearchParams({
      key: '25232082-62f19a20a64b822fbbd43f9d6',
      q: this.searchQuery,
      page: this.page,
      per_page: this.perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    try {
      const response = await axios.get(`?${params}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
