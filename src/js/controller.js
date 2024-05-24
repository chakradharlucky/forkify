import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    
    resultView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks)
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

async function controlSearchRecipes() {
  try {
    const query = searchView.getQuery();
    if(!query) return

    resultView.renderSpinner()

    await model.loadSearchResults(query);
    
    resultView.render(model.getSearchResultPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error)
  }
}

function controlPagination(goto) {
  resultView.render(model.getSearchResultPage(goto));
  paginationView.render(model.state.search);
}

function controlUpdateServings( updateTo ) {
  model.updateServings(updateTo);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark(recipe) {
  if(recipe.bookmarked) model.deleteBookmark(recipe)
  else model.addBookmark(recipe)
  recipeView.update(recipe);
  bookmarksView.render(model.state.bookmarks)
}

function controlbookmarks() {
  bookmarksView.render(model.state.bookmarks)
}

function init() {
  bookmarksView.addhandlerRender(controlbookmarks)
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerPagination(controlPagination)
  recipeView.addHandlerUpdateServings(controlUpdateServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
}

init()