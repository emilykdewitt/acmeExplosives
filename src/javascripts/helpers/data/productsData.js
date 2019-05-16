import axios from 'axios';

const getProductsForEachType = types => new Promise((resolve, reject) => {
  axios.get('../db/products.json')
    .then((resp) => {
      const { products } = resp.data;
      const typesWithProducts = types.map((type) => {
        const newType = type;
        const matchingProducts = products.filter(product => product.type === type.id);
        newType.products = matchingProducts;
        return newType;
      });
      resolve(typesWithProducts);
    })
    .catch(err => reject(err));
});

export default { getProductsForEachType };
