import Validator from './classes/Validator';

const $form = document.querySelector(`form`);
const validator = new Validator({form: $form});

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
};

init();
