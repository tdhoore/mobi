export default class CustomDropDown {
  constructor(param = {
    selector: ``,
    customClass: ``,
    customOpenClass: ``,
    customSelectedClass: ``,
  }) {
    this.inputs = [...document.querySelectorAll(param.selector)];
    this.customClass = param.customClass;
    this.customOpenClass = param.customOpenClass;
    this.customSelectedClass = param.customSelectedClass;

    //listeners
    this.clickOptionListener = e => this.handleClickOption(e);
  }

  createOptionsList($input) {
    const $list = document.createElement(`ul`);

    //add list items
    this.addElemsToElem(this.createOptions($input), $list);

    return $list;
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

  toggleOpenDropDown($customDropDown) {
    $customDropDown.classList.toggle(this.customOpenClass);
  }

  closeDropDown($customDropDown) {
    $customDropDown.classList.remove(this.customOpenClass);
  }

  addElemsToElem(elems, $parent) {
    elems.forEach($elem => this.addElemToElem($elem, $parent));
  }

  addElemToElem($elem, $parent) {
    $parent.append($elem);
  }
}
