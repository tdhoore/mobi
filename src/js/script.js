import Validator from './classes/Validator';
import CustomDropDown from './classes/CustomDropDown';

const $form = document.querySelector(`form`);
const validator = new Validator({form: $form});
const customDropDown = new CustomDropDown({selectSelector: `select`, customSelectClass: `customDropDown`, customOpenSelectClass: `customDropDownOpen`});

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

  customDropDown.init();

};

init();
