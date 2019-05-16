import categoriesData from '../../helpers/data/categoriesData';
import productsData from '../../helpers/data/productsData';
import typesData from '../../helpers/data/typesData';
// import util from '../../helpers/util';

const initCategories = () => {
  categoriesData.loadCategories()
    .then(resp => typesData.getTypesForEachCategory(resp.data.categories))
    .then((categoriesWithTypes) => {
      console.error(categoriesWithTypes);
    })
    .catch(err => console.error('error from initCategories requests', err));
};

const initTypes = () => {
  typesData.loadTypes()
    .then(resp => productsData.getProductsForEachType(resp.data.types))
    .then((typesWithProducts) => {
      console.error(typesWithProducts);
    })
    .catch(err => console.error('error from initTypes requests', err));
};

export default { initCategories, initTypes };
