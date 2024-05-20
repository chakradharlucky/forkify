import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  currentPage;

  _genrateMarkup() {
    const totalPages = Math.ceil(
      this._data.recipes.length / this._data.resultsPerPage
    );
    console.log(totalPages);
    this.currentPage = this._data.currentPage;
    console.log(this._data.currentPage);
    if (this.currentPage === 1 && totalPages > 1) {
      return this._genrateMarkupNextBtn();
    }
    if (this.currentPage === totalPages && totalPages > 1) {
      return this._genrateMarkupPreviousBtn();
    }
    if (this.currentPage === 1 && totalPages === 1) {
      return '';
    }

    return this._genrateMarkupPreviousBtn() + this._genrateMarkupNextBtn();
  }

  _genrateMarkupPreviousBtn() {
    return `<button data-goto = ${this.currentPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.currentPage - 1}</span>
    </button>`;
  }

  _genrateMarkupNextBtn() {
    return `
    <button data-goto = ${
      this.currentPage + 1
    } class="btn--inline pagination__btn--next">
        <span>Page ${this.currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function(event){
        const btn = event.target.closest('.btn--inline')
        if(!btn) return

        const goto = +btn.dataset.goto
        handler(goto)
    })
  }
}


export default new PaginationView();