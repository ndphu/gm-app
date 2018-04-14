import api from '../client/Api'

class CategoryService {
  getCategoryByKey = (key) => {
    return this.categories.filter(category => category.key === key)[0];
  };

  fetchCategory = () => {
    if (!this.categories) {
      return api.get('/category');
    } else {
      return Promise.resolve({docs: this.categories});
    }
  };

  getCategories = () => {
    return this.categories;
  };

  setCategories = (categories) => {
    this.categories = categories;
  };

  getMoviesByCategory = (category, page, size) => {
    return api.get(`/category/${category._id}/items?page=${page}&size=${size}`);
  };

  getCategoryByTitle(title) {
    return this.categories.filter(category => category.title === title)[0];
  }
}

const categoryService = new CategoryService();

export default categoryService;