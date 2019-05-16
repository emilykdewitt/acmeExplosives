import axios from 'axios';

const loadTypes = () => axios.get('../db/types.json');

const getTypesForEachCategory = categories => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((resp) => {
      const { types } = resp.data;
      const categoriesWithTypes = categories.map((category) => {
        const newCategory = category;
        const matchingTypes = types.filter(type => type.category === category.id);
        newCategory.types = matchingTypes;
        return newCategory;
      });
      resolve(categoriesWithTypes);
    })
    .catch(err => reject(err));
});

export default { getTypesForEachCategory, loadTypes };
