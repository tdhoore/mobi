export default class GetActivities {
  constructor(param = {
    containerSelector: ``,
    amount: 6,
  }) {
    this.containerSelector = param.containerSelector;
    this.container;
    this.amount = param.amount;
    this.startId = 1;
    this.endId = this.amount;

    this.filterForm;

    this.months = [
      `January`,
      `February`,
      `March`,
      `April`,
      `May`,
      `June`,
      `July`,
      `August`,
      `September`,
      `October`,
      `November`,
      `December`,
    ];

    this.ajaxListener = r => this.handleAjax(r);
    this.formListener = e => this.handleFormSubmit(e);
  }

  init($filterForm) {
    this.container = document.querySelector(this.containerSelector);

    this.filterForm = $filterForm;
    this.filterForm.addEventListener(`submit`, this.formListener);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.getActivitiesWithFields(e.currentTarget.getAttribute(`action`));
  }

  getActivities(url, formData) {
    fetch(url, {
      headers: new Headers({Accept: `application/json`}),
      credentials: `same-origin`,
      method: `POST`,
      body: formData,
    }).then(r => r.json()).then(this.ajaxListener);
  }

  getActivitiesWithFilter(url, filters) {
    const formData = this.createFormData(filters);
    this.getActivities(url, formData);
  }

  getActivitiesWithFields(url) {
    this.getActivities(url, new FormData(this.filterForm));
  }

  createFormData(filters) {
    const formData = new FormData();
    //add action and filters to form data
    formData.append(`action`, `getActivities`);
    formData.append(`startId`, this.startId);
    formData.append(`endId`, this.endId);
    formData.append(`filters`, JSON.stringify(filters));
    return formData;
  }

  handleAjax(r) {
    console.log(r);
    this.wipeElement(this.container);

    Object.keys(r).forEach(key => {
      if (key !== `error`) {
        this.container.append(this.createActivityLink(r[key]));
      }
    });
  }

  createActivityLink(data) {
    const $a = document.createElement(`a`);
    let aHtml = ``;

    $a.setAttribute(`href`, `index.php?page=activiteitdetail&id=${data.id}`);

    aHtml = `<article class="imageArticle"><header><div>`;
    aHtml += `<h3 class="titleAccent">${data.title}</h3>`;
    aHtml += `<p>${this.parseFullDate(data.date)}</p>`;
    aHtml += `</div>`;
    aHtml += `<ul class="tags">${this.createTags(data.tags)}</ul>`;
    aHtml += `</header>`;
    aHtml += `<img src="http://via.placeholder.com/100x100" alt=""/>`;
    aHtml += `</article>`;

    $a.innerHTML = aHtml;

    return $a;
  }

  createTags(tags) {
    let result = ``;
    tags.forEach(tag => {
      result += `<li>${tag.tag}</li>`;
    });
    return result;
  }

  parseFullDate(phpDate) {
    const date = new Date(phpDate);
    return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`;
  }

  resetStartAndEnd() {
    this.startId = 0;
    this.endId = this.amount;
  }

  setNewStartAndEnd() {
    this.startId += this.amount;
    this.endId += this.amount;
  }

  wipeElement($elem) {
    $elem.innerHTML = ``;
  }
}
