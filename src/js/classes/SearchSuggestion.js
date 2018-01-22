import CustomDropDown from './CustomDropDown';

export default class SearchSuggestion extends CustomDropDown {
  constructor(param = {
    selector: ``,
    customClass: ``,
    customOpenClass: ``,
    customSelectedClass: ``,
  }) {
    super({selector: param.selector, customClass: param.customClass, customOpenClass: param.customOpenClass, customSelectedClass: param.customSelectedClass});

    //listeners
    this.inputListener = e => this.handleInput(e);
    this.ajaxResult = r => this.handleAjaxResult(r);
  }

  init() {
    //add addEventListeners to inputs
    this.inputs.forEach($input => {
      $input.addEventListener(`input`, this.inputListener);
    });
  }

  handleInput(e) {
    const $input = e.currentTarget;
    this.getSuggestions($input);
  }

  handleClickOption() {}

  getSuggestions($input) {
    const formData = new FormData();

    formData.append(`inputName`, $input.name);
    formData.append(`action`, `getFilter`);
    formData.append($input.name, $input.value);

    fetch(this.getFilterUrl($input), {
      headers: new Headers({Accept: `application/json`}),
      credentials: `same-origin`,
      method: `POST`,
      body: formData,
    }).then(r => r.json()).then(this.ajaxResult);
  }

  handleAjaxResult(results) {
    const $input = document.querySelector(`input[name="${results.inputName}"]`);
    const $customSuggestion = this.getCustomSuggestion($input);

    if (!$customSuggestion) {
      this.createCustomDropDown($input, results.options);
    }

    //add the created list
    this.fillCustomDropDown($input, this.createOptions(results.inputName, results.options));
  }

  createOptions(inputName, options) {
    const results = [];

    options.forEach(option => {
      const $li = document.createElement(`li`);
      const $a = this.createEmptyLink(``);

      //set value data
      $a.dataset.inputName = inputName;

      //set content
      $a.innerHTML = `<span>${option.type}</span>`;
      $a.innerHTML += `<span>${option.name}</span>`;

      //add listener
      $a.addEventListener(`click`, this.clickOptionListener);

      //add link to list item
      this.addElemToElem($a, $li);

      results.push($li);
    });

    return results;
  }

  getFilterUrl($input) {
    return $input.parentElement.parentElement.getAttribute(`action`);
  }

  getCustomSuggestion($input) {
    return $input.parentElement.querySelector(`.${this.customClass}`);
  }

  fillCustomDropDown($input, options) {
    const $customSuggestion = this.getCustomSuggestion($input);
    this.wipeElement($customSuggestion);
    this.addElemsToElem(options, $customSuggestion);
  }

  wipeElement($elem) {
    $elem.innerHTML = ``;
  }

  createCustomDropDown($input) {
    const $customSuggestion = document.createElement(`ul`);

    //add customDropdownClass
    $customSuggestion.classList.add(this.customClass);

    //add customselect to the select parent
    this.addElemToElem($customSuggestion, $input.parentElement);
  }

}
