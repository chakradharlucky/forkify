import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultview from './views/resultview';
import paginationView from './views/paginationView';
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

    resultview.renderSpinner()

    await model.loadSearchResults(query);
    
    resultview.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error)
  }
}

function contorlPagination(goto) {
  resultview.render(model.getSearchResultPage(goto));
  paginationView.render(model.state.search);
}



function init() {
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(contorlSearchRecipes);
  paginationView.addHandlerPagination(contorlPagination)
}

init()