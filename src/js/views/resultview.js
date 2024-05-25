import View from "./view";
import preview from "./preview";

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again :)'
  _genrateMarkup() {
    return this._data.map( result => preview._genrateMarkup(result)).join('');
  }
}

export default new ResultView()