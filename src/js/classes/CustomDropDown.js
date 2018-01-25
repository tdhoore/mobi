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
    this.clickWindow = e => this.handleClickWindow(e);
  }

  createOptionsList($input) {
    const $list = document.createElement(`ul`);

    //add list items
    this.addElemsToElem(this.createOptions($input), $list);

    return $list;
  }

  createOptions($input) {
    const results = [];
    const options = this.getOptions($input);

    options.forEach($option => {
      const $li = document.createElement(`li`);
      const $a = this.createEmptyLink($option.textContent);

      //set value data
      $a.dataset.value = $option.value;

      //add listener
      $a.addEventListener(`click`, this.clickOptionListener);

      //add link to list item
      this.addElemToElem($a, $li);

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
