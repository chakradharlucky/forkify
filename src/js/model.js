import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { API_URL, KEY, RESULTS_PER_PAGE } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query:'',
    recipes: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE
  },
  bookmarks: [],

};

const createRecipeObject = function (recipe) {
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
   ...(recipe.key && {key : recipe.key })
  };
  // state.recipe.bookmarked = state.bookmarks.find( bookmarks => bookmarks.id === id) ? true : false
  state.recipe.bookmarked = state.bookmarks.some( bookmarks => bookmarks.id === recipe.id ) ? true : false;
};

export const loadRecipe = async function (id) {
 try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
        const { recipe } = data.data;
        createRecipeObject(recipe)
    } catch(error) {
        throw(error)
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.currentPage = 1
        state.search.query = query
        const { recipes } = (await AJAX(`${API_URL}?search=${query}&key=${KEY}`)).data;
        state.search.recipes = recipes.map(recipe => {
            return {
              id: recipe.id,
              title: recipe.title,
              publisher: recipe.publisher,
              image: recipe.image_url,
              ...(recipe.key && { key: recipe.key }),
            };
        })
    } catch (error) {
        throw error
    }
}

export const getSearchResultPage =  function(page = state.search.currentPage) {
    state.search.currentPage = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.recipes.slice(start, end);
}

export const updateServings = function( newServings ) {
    state.recipe.ingredients.forEach(
      ing =>
        (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
    );
    state.recipe.servings = newServings;
}

export const addBookmark = function(recipe){
    state.bookmarks.push(recipe)

    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))
}

export const deleteBookmark = function (recipe) {
//   state.bookmarks.pop(recipe.id); don't use pop to remove a element at other then last
    const index = state.bookmarks.findIndex( bookmarks => bookmarks.id === recipe.id)
    state.bookmarks.splice(index,1)

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

function init() {
   const storage = JSON.parse(localStorage.getItem('bookmarks'))
   if(storage) state.bookmarks = storage
}

init()

export async function uploadRecipe(newRecipe) {
    const ingredients = Object.entries(newRecipe).filter( entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if(ingArr.length != 3) throw new Error('Wrong ingredient fromat! Please use the correct format :)')
        const [quantity, unit, description] = ingArr
        return { quantity: quantity ? +quantity : null, unit, description };
    })
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };
    const { data } = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    addBookmark(data.recipe);
    createRecipeObject(data.recipe);
}