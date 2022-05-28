import createElement from '../../assets/lib/create-element.js';

let container = document.querySelector('.container');
let modal;
export default class Modal {
  constructor() {
    modal = createElement(`<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
    </div>`);

    let buttonClose = modal.querySelector('.modal__close');
    buttonClose.addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }

  open() {
    document.body.append(modal);
    document.body.classList.add('is-modal-open');
  }
  setTitle(title) {
    let titleContainer = modal.querySelector('.modal__title');
    titleContainer.innerHTML = `${title}`;

  }
  setBody(node) {
    let modalBody = modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.appendChild(node);

  }
  close() {
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
    document.body.innerHTML = '';
  }

}