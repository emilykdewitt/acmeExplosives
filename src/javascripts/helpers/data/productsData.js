import axios from 'axios';

const loadProducts = () => axios.get('../db/products.json');

const getProductsForEachType = types => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((resp) => {
      const allProductsObject = resp.data.products[0];
      const objectLength = Object.keys(allProductsObject).length;
      const productNames = Object.getOwnPropertyNames(allProductsObject);
      types.forEach((type) => {
        let i = 0;
        for (i = 0; i < objectLength; i += 1) {
          const productName = productNames[i];
          if (allProductsObject[productName].type === type.id) {
            allProductsObject[productName].typeName = type.name;
          }
        }
      });
      resolve(allProductsObject);
    })
    .catch(err => reject(err));
});

export default { getProductsForEachType, loadProducts };
