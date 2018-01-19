export default class CustomDropDown {
  constructor(param = {
    selectSelector: ``,
    customSelectClass: ``
  }) {
    this.selects = [...document.querySelectorAll(param.selectSelector)];
    this.customSelectClass = param.customSelectClass;

    //listeners
    this.clickSelectListener = e => this.handleClickSelect(e);
    this.clickOptionListener = e => this.handleClickOption(e);
  }

  init() {
    //hide all selects
    this.selects.forEach($select => {
      this.createCustomSelect($select);
    });
  }

  createCustomSelect($select) {
    const $customSelect = document.createElement(`ul`);

    this.addElemsToElem(this.createOptions($select), $customSelect);

    this.addElemToElem($customSelect, $select.parentElement);

    //add listener to select
    $select.addEventListener(`click`, this.clickSelectListener);
  }

  createOptions($select) {
    const results = [];
    const options = [...$select.querySelectorAll(`option`)];

    options.forEach($option => {
      const $li = document.createElement(`li`);

      $li.textContent = $option.textContent;

      $li.addEventListener(`click`, this.clickOptionListener);

      results.push($li);
    });

    return results;
  }

  handleClickSelect(e) {}

  handleClickOption(e) {}

  addElemsToElem(elems, $parent) {
    elems.forEach($elem => this.addElemToElem($elem, $parent));
  }

  addElemToElem($elem, $parent) {
    $parent.append($elem);
  }

  hideElem($elem) {
    $elem.classList.add(`hide`);
  }
}
