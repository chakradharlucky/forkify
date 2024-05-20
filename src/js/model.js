import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
import { RESULTS_PER_PAGE } from './config';


export const state = {
  recipe: {},
  search: {
    query:'',
    recipes: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE
  },

};

export const loadRecipe = async function (id) {
 try {
        const data = await getJSON(`${API_URL}${id}`);
        const { recipe } = data.data;
        
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }
    } catch(error) {
        throw(error)
    }
}

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query
        const { recipes } = (await getJSON(`${API_URL}?search=${query}`)).data;
        state.search.recipes = recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
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