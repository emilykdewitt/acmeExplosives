import categoriesData from '../../helpers/data/categoriesData';
import productsData from '../../helpers/data/productsData';
import typesData from '../../helpers/data/typesData';
import util from '../../helpers/util';

const productCardBuilder = (array) => {
  let domString = '';
  const productsLength = Object.getOwnPropertyNames(array).length;
  const productsNames = Object.getOwnPropertyNames(array);
  let i = 0;
  for (i = 0; i < productsLength; i += 1) {
    const productName = productsNames[i];
    const product = array[productName];
    domString += '<div class="col-3">';
    domString += `<div class="card ${product.category} ${product.type} align-self">`;
    domString += `<h5 class="card-title">${product.name}</h4>`;
    domString += '<div class="card-body">';
    domString += '<h6>Description:</h6>';
    domString += `<p>${product.description}</p>`;
    domString += `<p>Category: ${product.category}</p>`;
    domString += `<p>Type: ${product.typeName}</p>`;
    domString += '</div>';
    domString += '</div>';
    domString += '</div>';
  }
  util.printToDom('productCards', domString);
};

const categoriesArray = [];
let productsArray = [];

const initCategories = () => new Promise((resolve, reject) => {
  categoriesData.loadCategories()
    .then(resp => typesData.getTypesForEachCategory(resp.data.categories))
    .then((categoriesWithTypes) => {
      categoriesArray.push(categoriesWithTypes);
      resolve(categoriesArray);
    })
    .catch(err => reject(err));
});

const initProducts = () => new Promise((resolve, reject) => {
  typesData.loadTypes()
    .then(resp => productsData.getProductsForEachType(resp.data.types))
    .then((allProductsObject) => {
      productsArray = allProductsObject;
      resolve(allProductsObject);
    })
    .catch(err => reject(err));
});

const matchProductsWithCategories = () => {
  categoriesArray[0].forEach((category) => {
    const typesArray = category.types;
    const categoryName = category.name;
    typesArray.forEach((type) => {
      const typeId = type.id;
      const productsLength = Object.getOwnPropertyNames(productsArray).length;
      const productsNames = Object.getOwnPropertyNames(productsArray);
      let i = 0;
      for (i = 0; i < productsLength; i += 1) {
        const productName = productsNames[i];
        if (productsArray[productName].type === typeId) {
          productsArray[productName].category = categoryName;
        }
      }
    });
  });
  let domString = '';
  categoriesArray[0].forEach((item) => {
    domString += `<a class="dropdown-item" id="${item.name}">${item.name}</a>`;
  });
  util.printToDom('dropdown-menu', domString);
  productCardBuilder(productsArray);
};

const showCardsByButton = (e) => {
  Array.from(document.getElementsByClassName('card')).forEach((card) => {
    card.classList.remove('show');
    card.classList.add('hide');
  });
  const buttonId = e.target.id;
  const selectedCardsArray = Array.from(document.getElementsByClassName(buttonId));
  console.error(selectedCardsArray);
  selectedCardsArray.forEach((card) => {
    card.classList.remove('hide');
    card.classList.add('show');
  });
};

const buttonEventListeners = () => {
  document.getElementById('Fireworks').addEventListener('click', showCardsByButton);
  document.getElementById('Demolition').addEventListener('click', showCardsByButton);
};

export default {
  initCategories,
  initProducts,
  matchProductsWithCategories,
  buttonEventListeners,
};
