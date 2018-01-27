import Validator from './classes/Validator';
import CustomSelect from './classes/CustomSelect';
import SearchSuggestion from './classes/SearchSuggestion';
//import GetActivities from './classes/GetActivities';

const $form = document.querySelector(`.newsLetter`);
const validator = new Validator({form: $form});

const customSelect = new CustomSelect({selector: `select`, customClass: `customDropDown`, customOpenClass: `customDropDownOpen`, customSelectedClass: `customSelectedItem`});

const filter = new SearchSuggestion({selector: `.suggestion`, customClass: `filterSuggestions`, customOpenClass: `filterSuggestionsOpen`, tagsHolderClass: `filterTags`});

//const getActivities = new GetActivities({containerSelector: `.activiteitenHolder`, amount: 4});

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

  //getActivities.getActivities(`index.php?page=activiteiten`, filter.getFilters());
  /*getActivities.getActivities(`index.php?page=activiteiten`, [
    {
      type: `tag`,
      value: `kids`,
    },
  ]);*/

};

init();
