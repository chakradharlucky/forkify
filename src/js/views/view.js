import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    this._data = data;
    const markup = this._genrateMarkup();
    this._clear();
    this._insertHTML(markup);
  }

  update(data) {
    if (!data) return;
    this._data = data;
    const newMarkup = this._genrateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((ele, i) => {
      if (
        !ele.isEqualNode(curElements[i]) && // ele.firstChild &&  -- > use optional chaining
        ele.firstChild?.nodeValue.trim() !== ''
      ) {
        curElements[i].textContent = ele.textContent;
      }

      if (!ele.isEqualNode(curElements[i])) {
        Array.from(ele.attributes).forEach(att => {
          curElements[i].setAttribute(att.name, att.value);
        });
      }
    });
  }

  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href= "${icons}#icon-loader"></use>
          </svg>
        </div> `;
    this._clear();
    this._insertHTML(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;
    this._clear();
    this._insertHTML(markup);
  }

  renderMessage() {
    const markup = `
    <div class="message">
        <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${this._message}</p>
    </div>`;
    this._clear();
    this._insertHTML(markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _insertHTML(markup) {
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
