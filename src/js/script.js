import Validator from './classes/Validator';
import CustomSelect from './classes/CustomSelect';
import SearchSuggestion from './classes/SearchSuggestion';

const $newsLetter = document.querySelector(`.newsLetter`);
const validator = new Validator({form: $newsLetter});
const customSelect = new CustomSelect({selector: `select`, customClass: `customDropDown`, customOpenClass: `customDropDownOpen`});

const filter = new SearchSuggestion({selector: `.activiteitenFilter input`, customClass: `filterSuggestions`, customOpenClass: `filterSuggestionsOpen`, tagsHolderClass: `filterTags`});

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

  filter.init();

};

init();
