export default class CustomDropDown {
  constructor(param = {
    selector: ``,
    customClass: ``,
    customOpenClass: ``,
  }) {
    this.inputs = [...document.querySelectorAll(param.selector)];
    this.customSelectClass = param.customClass;
    this.customOpenSelectClass = param.customOpenClass;

    //listeners
    this.clickOptionListener = e => this.handleClickOption(e);
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