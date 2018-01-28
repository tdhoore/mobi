export default class GetActivities {
  constructor(param = {
    containerSelector: ``,
    amount: 6,
  }) {
    this.container = document.querySelector(param.containerSelector);
    this.amount = param.amount;
    this.startId = 1;
    this.endId = this.amount;

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
  }

  getActivities(url, filters) {
    const formData = this.createFormData(filters);
    fetch(url, {
      headers: new Headers({Accept: `application/json`}),
      credentials: `same-origin`,
      method: `POST`,
      body: formData,
    }).then(r => r.json()).then(this.ajaxListener);
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

    r.forEach(result => this.container.append(this.createActivityLink(result)));
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
