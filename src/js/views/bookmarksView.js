import View from './view';
import preview from './preview';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMarkup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
    </div>`

  _genrateMarkup() {
    if (this._data.length === 0) return this._errorMarkup;
    return this._data
      .map(bookmark => preview._genrateMarkup(bookmark))
      .join('');
  }

  addhandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
