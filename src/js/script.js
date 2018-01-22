import Validator from './classes/Validator';
import CustomSelect from './classes/CustomSelect';
import SearchSuggestion from './classes/SearchSuggestion';

const $newsLetter = document.querySelector(`.newsLetter`);
const validator = new Validator({form: $newsLetter});
const customSelect = new CustomSelect({selector: `select`, customClass: `customDropDown`, customOpenClass: `customDropDownOpen`});

const filter = new SearchSuggestion({selector: `.activiteitenFilter input`, customClass: `filterSugestions`, customOpenClass: `filterSugestionsOpen`});

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

  filter.init();

};

init();
