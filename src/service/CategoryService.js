import api from '../client/Api'
class CategoryService {

  currentMovie;

  getCategories = () => {
    return api.get(`/category`)
  };
}

const categoryService = new CategoryService();

export default categoryService;