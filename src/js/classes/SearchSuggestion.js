import CustomDropDown from './CustomDropDown';

export default class SearchSuggestion extends CustomDropDown {
  constructor(param = {
    selector: ``,
    customClass: ``,
    customOpenClass: ``,
    customSelectedClass: ``,
    tagsHolderClass: ``,
  }) {
    super({selector: param.selector, customClass: param.customClass, customOpenClass: param.customOpenClass, customSelectedClass: param.customSelectedClass});

    this.tagsHolder = document.querySelector(`.${param.tagsHolderClass}`);

    //listeners
    this.inputListener = e => this.handleInput(e);
    this.ajaxResult = r => this.handleAjaxResult(r);
    this.removeFilter = e => this.handleRemoveFilter(e);
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

  handleClickOption(e) {
    e.preventDefault();
    const $option = e.currentTarget;

    //add options to tags
    this.addOptionToSelectedTags($option);

    //preforme reset
    this.clearValue($option.parentElement.parentElement.parentElement.querySelector(`input`));
    this.wipeElement($option.parentElement.parentElement);
  }

  addOptionToSelectedTags($option) {
    const optionData = this.getOptionData($option);

    this.removeDoubleType(optionData);

    this.tagsHolder.append(this.createTag(optionData));
  }

  getOptionData($option) {
    return {type: $option.children[0].textContent, value: $option.children[1].textContent};
  }

  handleRemoveFilter(e) {
    e.preventDefault();
    e.currentTarget.parentElement.outerHTML = ``;
  }

  createTag(data) {
    const $li = document.createElement(`li`);
    const $a = this.createEmptyLink(data.value);

    //add type
    $a.dataset.type = data.type;

    //add listener
    $a.addEventListener(`click`, this.removeFilter);

    //add to list item
    $li.append($a);

    return $li;
  }

  removeDoubleType(data) {
    if (data.type === `name` || data.type === `stad` || data.type === `postcode`) {
      [...this.tagsHolder.querySelectorAll(`li a`)].forEach($link => {
        if ($link.dataset.type.toLowerCase() === data.type) {
          $link.parentElement.outerHTML = ``;
        }
      });
    }
  }

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
      $a.innerHTML = `<span class="titleAccent">${option.type}</span>`;
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
    let $form = $input.parentElement.parentElement.parentElement;

    if ($form.tagName.toLowerCase() !== `form`) {
      $form = $form.parentElement;
    }

    return $form.getAttribute(`action`);
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

  clearValue($elem) {
    $elem.value = ``;
  }

  createCustomDropDown($input) {
    const $customSuggestion = document.createElement(`ul`);

    //add customDropdownClass
    $customSuggestion.classList.add(this.customClass);

    //add customselect to the select parent
    this.addElemToElem($customSuggestion, $input.parentElement);
  }

}
