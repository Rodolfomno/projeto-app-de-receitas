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
    pagePath: '/explorar/bebidas',
  },
  exploreMeal: {
    pageTitle: 'Explorar Comidas',
    pagePath: '/explorar/comidas',
  },
  exploreDrinksByIngredients: {
    pageTitle: 'Explorar Ingredientes',
    pagePath: '/explorar/bebidas/:ingrediente',
  },
  exploreMealsByIngredients: {
    pageTitle: 'Explorar Ingredientes',
    pagePath: '/explorar/comidas/:ingrediente',
  },
  exploreMealsByArea: {
    pageTitle: 'Explorar Origem',
    pagePath: '/explorar/comidas/:area',
  },
  favorites: {
    pageTitle: 'Receitas Favoritas',
    pagePath: '/receitas-favoritas',
  },
  recipesMade: {
    pageTitle: 'Receitas Feitas',
    pagePath: '/receitas-feitas',
  },
};
export default optionsObject;
