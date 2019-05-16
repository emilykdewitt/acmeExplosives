import productsPage from './components/productsPage/productsPage';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  console.error('hello world');
  productsPage.initCategories();
  productsPage.initTypes();
};

init();
