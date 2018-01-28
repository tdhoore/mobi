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
    this.removeTagHandler = e => this.handleRemoveTag(e);

    //tags list
    this.selectedTags = [];
  }

  init() {
    //add addEventListeners to inputs
    this.inputs.forEach($input => {
      $input.addEventListener(`input`, this.inputListener);
    });

    // add listener to window
    window.addEventListener(`click`, this.clickWindow);
  }

  handleInput(e) {
    const $input = e.currentTarget;
    if ($input.value !== ``) {
      this.getSuggestions($input);
    } else {
      this.wipeElement(this.getCustomSuggestion($input));
    }

    this.removeAllTagsByName($input.name);
  }

  handleClickOption(e) {
    e.preventDefault();
    const $option = e.currentTarget;
    const $input = $option.parentElement.parentElement.parentElement.querySelector(`input`);

    $input.value = $option.querySelector(`span:last-of-type`).textContent;
    this.addToSelectedTags(this.getOptionData($option));

    //preform reset
    this.wipeElement($option.parentElement.parentElement);
  }

  addToSelectedTags(optionData) {
    if (optionData.value === `city` || optionData.value === `postal`) {
      this.removeAllTagsOfType([`city`, `postal`]);
    } else {
      this.removeAllTagsOfType([optionData.type]);
    }
    this.selectedTags.push(optionData);
  }

  removeAllTagsByName(name) {
    if (name === `search`) {
      this.removeAllTagsOfType([`tag`, `title`]);
    } else if (name === `location`) {
      this.removeAllTagsOfType([`postal`, `city`]);
    }
  }

  removeAllTagsOfType(types) {
    types.forEach(type => {
      this.selectedTags = this.selectedTags.filter(tag => tag.type !== type);
    });
  }

  addOptionToSelectedTags($option) {
    const optionData = this.getOptionData($option);

    if (this.checkIfTagIsSelected(optionData)) {
      this.addToSelectedTags(optionData);
      this.tagsHolder.append(this.createTag(optionData));
    }
  }

  checkIfTagIsSelected(optionData) {
    return this.selectedTags.filter(tag => tag.type === optionData.type).length === 0;
  }

  getOptionData($option) {
    return {type: $option.children[0].textContent, value: $option.children[1].textContent};
  }

  createTag(data) {
    const $li = document.createElement(`li`);
    const $a = this.createEmptyLink(data.value);

    //add type
    $a.dataset.type = data.type;

    //add listener
    $a.addEventListener(`click`, this.removeTagHandler);

    //add to list item
    $li.append($a);

    return $li;
  }

  handleRemoveTag(e) {
    e.preventDefault();
    const $tagElem = e.currentTarget;
    const tagData = this.getDataFromTagElem($tagElem);
    this.removeTag(tagData, $tagElem);
  }

  getDataFromTagElem(tagElem) {
    return {type: tagElem.dataset.type, value: tagElem.textContent};
  }

  removeTag(tagObj, $elem) {
    this.selectedTags.forEach((tag, index) => {
      if (tag.type === tagObj.type && tag.value === tagObj.value) {
        this.selectedTags.splice(index, 1);
        $elem.parentElement.outerHTML = ``;
      }
    });
  }

  getSuggestions($input) {
    const formData = new FormData();

    formData.append(`inputName`, $input.name);
    formData.append(`action`, `getFilter`);
    formData.append(`usedFilters`, JSON.stringify(this.selectedTags));
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
    Object.keys(options).forEach(key => {
      const option = options[key];
      const $li = document.createElement(`li`);
      const $a = this.createEmptyLink(``);

      //set value data
      $a.dataset.inputName = inputName;

      //set content
      $a.innerHTML = `<span class="titleAccent">${option.type}</span>`;
      $a.innerHTML += `<span>${option.value}</span>`;

      //add listener
      $a.addEventListener(`click`, this.clickOptionListener);

      //add link to list item
      this.addElemToElem($a, $li);

      results.push($li);
    });

    return results;
  }

  getFilters() {
    return this.selectedTags;
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

  handleClickWindow() {
    this.inputs.forEach($input => {
      const $customDropDown = $input.parentElement.querySelector(`ul`);
      if ($customDropDown) {
        this.wipeElement($customDropDown);
      }
    });
  }
}
