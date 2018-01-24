import CustomDropDown from './CustomDropDown';

export default class CustomSelect extends CustomDropDown {
  constructor(param = {
    selector: ``,
    customClass: ``,
    customOpenClass: ``,
    customSelectedClass: ``,
  }) {
    super({selector: param.selector, customClass: param.customClass, customOpenClass: param.customOpenClass, customSelectedClass: param.customSelectedClass});

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

    //add class
    $result.classList.add(`fakeSelect`);

    //add listener to fake select
    $result.addEventListener(`click`, this.clickFakeSelectListener);

    return $result;
  }

  createCustomDropDown($select) {
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

  handleClickFakeSelect(e) {
    e.preventDefault();

    //open or close dropdown
    this.toggleOpenDropDown(e.currentTarget.parentElement.querySelector(`ul`));
  }

  handleClickOption(e) {
    e.preventDefault();
    this.setSelectedOption(e.currentTarget);
  }

  setSelectedOption($selectedOption) {
    const $customDropdown = $selectedOption.parentElement.parentElement.parentElement;
    const customOptions = [...$customDropdown.querySelectorAll(`ul li a`)];
    const $fakeSelect = $customDropdown.querySelector(`a`);
    const options = [...$customDropdown.parentElement.querySelectorAll(`option`)];

    customOptions.forEach(($customOption, index) => {
      //set the selected option in the select options
      this.addOrRemoveSelected(options[index].value === $selectedOption.dataset.value, options[index]);

      if ($customOption === $selectedOption) {
        //set the class for the custom option
        $customOption.classList.add(this.customSelectedClass);

        //set the fake select textContent
        this.setContentToContent($fakeSelect, $customOption);
      } else {
        $customOption.classList.remove(this.customSelectedClass);
      }
    });
  }

  addOrRemoveSelected(condition, $option) {
    if (condition) {
      $option.setAttribute(`selected`, ``);
    } else {
      $option.removeAttribute(`selected`);
    }
  }
}
