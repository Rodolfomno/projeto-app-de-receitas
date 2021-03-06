const optionsObject = {
  login: {
    pageTitle: 'Login',
    pagePath: '/',
  },
  meal: {
    pageTitle: 'Comidas',
    type: 'comida',
    pagePath: '/comidas',
    API_URL_TYPE: 'meal',
    recipeType: 'meals',
    idType: 'idMeal',
    image: 'strMealThumb',
    name: 'strMeal',
    category: 'strCategory',
    area: 'strArea',
  },
  drink: {
    pageTitle: 'Bebidas',
    type: 'bebida',
    pagePath: '/bebidas',
    API_URL_TYPE: 'cocktail',
    recipeType: 'drinks',
    idType: 'idDrink',
    image: 'strDrinkThumb',
    name: 'strDrink',
    category: 'strCategory',
    alcoholic: 'strAlcoholic',

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
    pagePath: '/explorar/bebidas/ingredientes',
    recipeType: 'drinks',
  },
  exploreMealsByIngredients: {
    pageTitle: 'Explorar Ingredientes',
    pagePath: '/explorar/comidas/ingredientes',
    recipeType: 'meals',
  },
  exploreMealsByArea: {
    pageTitle: 'Explorar Origem',
    pagePath: '/explorar/comidas/area',
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
