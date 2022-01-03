const optionsObject = {
  meal: {
    pageTitle: 'Comidas',
    pagePath: '/comidas',
    API_URL_TYPE: 'meal',
    recipeType: 'meals',
    idType: 'idMeal',
  },
  drink: {
    pageTitle: 'Bebidas',
    pagePath: '/bebidas',
    API_URL_TYPE: 'cocktail',
    recipeType: 'drinks',
    idType: 'idDrink',
  },
  profile: {
    pageTitle: 'Perfil',
    pagePath: '/perfil',
  },
  explore: {
    pageTitle: 'Explorar',
    pagePath: '/explorar',
  },
  exploreDrinks: {
    pageTitle: 'Explorar Bebidas',
    pagePath: '/explorar/comidas',
  },
  exploreMeal: {
    pageTitle: 'Explorar Comidas',
    pagePath: '/explorar/bebidas',
  },
};
export default optionsObject;
