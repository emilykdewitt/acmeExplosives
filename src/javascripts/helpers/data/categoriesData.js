import axios from 'axios';

// The function below returns a promise
const loadCategories = () => axios.get('../db/categories.json');

export default { loadCategories };
