export default class Validator {
  constructor(param = {
    form: false,
  }) {
    //must have items
    this.form = param.form;

    //listeners
    this.listener = e => this.handleSubmit(e);
    this.blurListener = e => this.handleBlurInput(e);
    this.changeListener = e => this.handleChangeInput(e);
  }

  init() {
    //check if there is a form
    if (this.form) {
      //add event listener
      this.form.addEventListener(`click`, this.listener);
    } else {
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    //check if the form is valid
    if (this.form.validity) {
      //clear all messages
      //send the data
    }
  }

  handleBlurInput(e, checks) {
    const $input = e.currentTarget;
    checks.forEach(check => {
      this.checkValidityByName($input, check);
    });
  }

  handleChangeInput(e, checks) {
    const $input = e.currentTarget;
    checks.forEach(check => {
      this.checkValidityByName($input, check, true, false);
    });
  }

  checkValidityByName($elem, check, canShowMessage = true, canShowError = true) {
    const isValid = $elem.validity[check.name];

    if (canShowMessage) {
      this.displayMessage($elem, this.getMessageByType(check.messages, isValid), !isValid && canShowError);
    }
  }

  displayMessage($elem, message, type = true) {
    const $errorElem = $elem.parentElement.querySelector(`.validator`);

    //add error class and remove oke class
    this.changeMessageClass($errorElem, type);

    //set message
    $errorElem.textContent = message;
  }

  getMessageByType(messages, type) {
    return type
      ? messages.error
      : messages.okey;
  }

  changeMessageClass($errorElem, type = true) {
    if (type) {
      $errorElem.classList.remove(`okey`);
      $errorElem.classList.add(`error`);
    } else {
      $errorElem.classList.remove(`error`);
      $errorElem.classList.add(`okey`);
    }
  }

  resetMessage($errorElem) {
    $errorElem.textContent = ``;
  }

  addValidationToInput(selector, checks = [
    {
      name: ``,
      message: ``,
      okeyMessage: ``,
    },
  ]) {
    const $elem = this.form.querySelector(selector);

    this.addEventListeners($elem, checks);
  }

  addEventListeners($elem, checks) {
    //create listeners
    this.createListeners(checks);

    //add listeners
    $elem.addEventListener(`blur`, this.blurListener);
    $elem.addEventListener(`change`, this.changeListener);
  }

  createListeners(checks) {
    this.blurListener = e => this.handleBlurInput(e, checks);
    this.changeListener = e => this.handleChangeInput(e, checks);
  }
}
