export default class Validator {
  constructor(param = {
    form: false,
  }) {
    //must have items
    this.form = param.form;
    this.action = this.form.getAttribute(`action`);
    this.method = this.form.getAttribute(`method`);
    this.inputs = [];

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
    if (this.form.checkValidity()) {
      //clear all messages
      this.restInputAllMessages();

      //send the data
      this.sendData();
    } else {
      //check all the inputs for mistakes
      this.checkInputs();
    }
  }

  checkInputs() {
    this.inputs.forEach(input => {
      input.checks.forEach(check => {
        this.checkValidityByName(input.inputElem, check);
      });
    });
  }

  sendData() {
    return fetch(this.action, {
      headers: new Headers({Accept: `application/json`}),
      credentials: `same-origin`,
      method: this.method,
      body: new FormData(this.form),
    }).then(responce => responce.json()).then(this.handleAjaxResult);
  }

  handleAjaxResult(result) {
    console.log(result);
  }

  restInputAllMessages() {
    const inputs = [...this.form.querySelectorAll(`.validator`)];

    inputs.forEach($input => {
      this.resetMessage($input);
    });
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
      this.checkValidityByName($input, check, false);
    });
  }

  checkValidityByName($elem, check, canShowError = true) {
    const isValid = $elem.validity[check.name];
    if (canShowError || !isValid) {
      this.displayMessage($elem, this.getMessageByType(check.messages, isValid), !isValid);
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

  addValidationToInput(selector, checks = []) {
    this.inputs.push({inputElem: this.form.querySelector(selector), checks: checks});

    this.addEventListeners(this.inputs[this.inputs.length - 1].inputElem, checks);
  }

  addEventListeners($elem, checks) {
    //create listeners
    this.createListeners(checks);

    //add listeners
    $elem.addEventListener(`blur`, this.blurListener);
    $elem.addEventListener(`input`, this.changeListener);
  }

  createListeners(checks) {
    this.blurListener = e => this.handleBlurInput(e, checks);
    this.changeListener = e => this.handleChangeInput(e, checks);
  }
}
