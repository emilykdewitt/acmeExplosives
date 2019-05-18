import productsPage from './components/productsPage/productsPage';

import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  let categories = [];
  let products = [];
  productsPage.initCategories()
    .then((cats) => {
      categories = cats;
      productsPage.initProducts()
        .then((prods) => {
          products = prods;
          productsPage.matchProductsWithCategories(categories, products);
        });
    });
  productsPage.buttonEventListeners();
};

init();
