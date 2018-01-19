export default class MobileNav {
  constructor(param = {
    navSelector: ``,
    navOpenClass: ``,
    openBtnSelector: ``,
    closeBtnSelector: ``
  }) {
    //nav
    this.nav = document.querySelector(param.navSelector);
    this.navOpenClass = param.navOpenClass;

    //button selectors
    this.openBtnSelector = param.openBtnSelector;

    //buttons
    this.openBtn = document.querySelector(param.openBtnSelector);
    this.closeBtn = document.querySelector(param.closeBtnSelector);

    //listeners
    this.toggleListener = e => this.toggleNav(e);
  }

  init() {
    //add eventlisteners
    this.openBtn.addEventListeners(`click`, this.toggleListener);
    this.closeBtn.addEventListeners(`click`, this.toggleListener);
  }

  toggleNav(e) {
    const $btn = e.currentTarget;

    if ($btn.classList.contain(this.openBtnSelector)) {
      this.nav.classList.add(this.navOpenClass);
    } else {
      this.nav.classList.remove(this.navOpenClass);
    }
  }
}
