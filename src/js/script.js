import Validator from './classes/Validator';
import CustomSelect from './classes/CustomSelect';

const $form = document.querySelector(`.newsLetter`);
const validator = new Validator({form: $form});

const customSelect = new CustomSelect({selector: `select`, customClass: `customDropDown`, customOpenClass: `customDropDownOpen`, customSelectedClass: `customSelectedItem`});

const init = () => {
  //init form validation
  validator.init();
  validator.addValidationToInput(`input[type="email"]`, [
    {
      name: `valueMissing`,
      messages: {
        error: `Please, enter an email adress`,
        okey: ``,
      },
    }, {
      name: `typeMismatch`,
      messages: {
        error: `Please, enter a correct email adress`,
        okey: `Email oke`,
      },
    },
  ]);

  customSelect.init();

};

init();
