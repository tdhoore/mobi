import Validator from './classes/Validator';

const $form = document.querySelector(`form`);
const validator = new Validator({form: $form});

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
};

init();
