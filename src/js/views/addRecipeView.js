import View from './view';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded :)'

  toggleWindow() {
    this._window.classList.toggle('hidden')
    this._overlay.classList.toggle('hidden')
  }

  

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
  }
  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
    this._overlay.addEventListener('click',this.toggleWindow.bind(this))
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(event) {
        event.preventDefault()
        const dataArr = [...new FormData(this)]
        const data = Object.fromEntries(dataArr)
        handler(data)
    })
  }

  constructor() {
    super()
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  _genrateMarkup() {}
}

export default new AddRecipeView();
