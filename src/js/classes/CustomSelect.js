import CustomDropDown from './CustomDropDown';

export default class CustomSelect extends CustomDropDown {
  constructor(param = {
    selector: ``,
    customClass: ``,
    customOpenClass: ``,
  }) {
    super({selector: param.selector, customClass: param.customClass, customOpenClass: param.customOpenClass});

    this.clickFakeSelectListener = e => this.handleClickFakeSelect(e);
  }

  init() {
    this.inputs.forEach($select => {
      $select.classList.add(`hide`);
      this.createCustomDropDown($select);
    });
  }

  getOptions($select) {
    return [...$select.querySelectorAll(`option`)];
  }

  createFakeSelect($select) {
    const $result = this.createEmptyLink($select.querySelector(`option`).textContent);

    //add listener to fake select
    $result.addEventListener(`click`, this.clickFakeSelectListener);

    return $result;
  }

  createCustomDropDown($input) {
    const $customSelect = document.createElement(`div`);

    //add customDropdownClass
    $customSelect.classList.add(this.customSelectClass);

    //add fake select
    this.addElemToElem(this.createFakeSelect($input), $customSelect);

    //add the created list
    this.addElemToElem(this.createOptionsList($input), $customSelect);

    //add customselect to the select parent
    this.addElemToElem($customSelect, $input.parentElement);
  }

  handleClickFakeSelect(e) {
    e.preventDefault();

    //open or close dropdown
    this.toggleOpenDropDown(e.currentTarget.parentElement.querySelector(`ul`));
  }
}
