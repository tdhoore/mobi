export default class CustomDropDown {
  constructor(param = {
    selectSelector: ``,
    customSelectClass: ``,
    customOpenSelectClass: ``,
  }) {
    this.selects = [...document.querySelectorAll(param.selectSelector)];
    this.customSelectClass = param.customSelectClass;
    this.customOpenSelectClass = param.customOpenSelectClass;

    //listeners
    this.clickFakeSelectListener = e => this.handleClickFakeSelect(e);
    this.clickOptionListener = e => this.handleClickOption(e);
  }

  init() {
    this.selects.forEach($select => {
      $select.classList.add(`hide`);
      this.createCustomSelect($select);
    });
  }

  createCustomSelect($select) {
    const $customSelect = document.createElement(`div`);

    //add customDropdownClass
    $customSelect.classList.add(this.customSelectClass);

    //add fake select
    this.addElemToElem(this.createFakeSelect($select), $customSelect);

    //add the created list
    this.addElemToElem(this.createOptionsList($select), $customSelect);

    //add customselect to the select parent
    this.addElemToElem($customSelect, $select.parentElement);
  }

  createFakeSelect($select) {
    const $result = this.createEmptyLink($select.querySelector(`option`).textContent);

    //add listener to fake select
    $result.addEventListener(`click`, this.clickFakeSelectListener);

    return $result;
  }

  createOptionsList($select) {
    const $list = document.createElement(`ul`);

    //add list items
    this.addElemsToElem(this.createOptions($select), $list);

    return $list;
  }

  createOptions($select) {
    const results = [];
    const options = [...$select.querySelectorAll(`option`)];

    options.forEach($option => {
      const $li = document.createElement(`li`);
      const $a = this.createEmptyLink($option.textContent);

      //set value data
      $a.dataset.value = $option.value;

      //add link to list item
      this.addElemToElem($a, $li);

      //add listener
      $li.addEventListener(`click`, this.clickOptionListener);

      results.push($li);
    });

    return results;
  }

  createEmptyLink(textContent) {
    const $a = document.createElement(`a`);

    $a.setAttribute(`href`, `#`);

    $a.textContent = textContent;

    return $a;
  }

  setContentToContent($elem1, $elem2) {
    $elem1.textContent = $elem2.textContent;
  }

  handleClickFakeSelect(e) {
    e.preventDefault();

    //open or close dropdown
    this.toggleOpenDropDown(e.currentTarget.parentElement.querySelector(`ul`));
  }

  handleClickOption() {
    console.log(`option`);
  }

  toggleOpenDropDown($customDropDown) {
    $customDropDown.classList.toggle(this.customOpenSelectClass);
  }

  closeDropDown($customDropDown) {
    $customDropDown.classList.remove(this.customOpenSelectClass);
  }

  addElemsToElem(elems, $parent) {
    elems.forEach($elem => this.addElemToElem($elem, $parent));
  }

  addElemToElem($elem, $parent) {
    $parent.append($elem);
  }
}
