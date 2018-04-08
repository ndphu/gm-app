import api from '../client/Api'
class CategoryService {

  currentMovie;

  getCategories = () => {
    return api.get(`/category?page=${0}&size=${50}`)
  };
}

const categoryService = new CategoryService();

export default categoryService;