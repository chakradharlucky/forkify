import * as model from './model';
import recipeView from './views/recipeView';
import { awrap } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

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

function init() {
  recipeView.addHandlerRender(controlRecipes)
}

init()