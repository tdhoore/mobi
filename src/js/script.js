import Validator from './classes/Validator';
import CustomSelect from './classes/CustomSelect';

const $form = document.querySelector(`form`);
const validator = new Validator({form: $form});
const customSelect = new CustomSelect({selector: `select`, customClass: `customDropDown`, customOpenClass: `customDropDownOpen`});

const init = () => {
  //init form validation
  validator.init();
  validator.addValidationToInput(`input`, [
    {
      name: `valueMissing`,
      messages: {
        error: `nope`,
        okey: `jeej`,
      },
    },
  ]);

  customSelect.init();

};

init();
