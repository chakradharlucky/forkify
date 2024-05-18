import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import { awrap } from 'regenerator-runtime';

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0) Rendering Spinner
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id) 

    // 2) Reanding recipe
    recipeView.render(model.state.recipe)
  } catch (error) {
    recipeView.renderError()
  }
}

async function contorlSearchRecipes() {
  try {
    const query = searchView.getQuery();
    if(!query) return

    await model.loadSearchResults(query);
    console.log(model.state.search.recipes)
  } catch (error) {
    console.log(error)
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSerch(contorlSearchRecipes)
}

init()