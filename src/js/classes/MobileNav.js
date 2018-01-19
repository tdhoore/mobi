export default class MobileNav {
  constructor(param = {
    navSelector: ``,
    navOpenClass: ``,
    openBtnSelector: ``,
    closeBtnSelector: ``,
    maxWidth: 0,
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
    this.toggleListener = e => this.handleToggleNav(e);
    this.windowResizeListener = e => this.handleWindowResize(e);

    //params
    this.maxWidth = param.maxWidth;
  }

  init() {
    //add eventlisteners
    this.openBtn.addEventListeners(`click`, this.toggleListener);
    this.closeBtn.addEventListeners(`click`, this.toggleListener);
    window.addEventListeners(`resize`, this.windowResizeListener);
  }

  handleWindowResize() {
    if (!this.windowSizeOke()) {
      //remove the open class
      this.closeNav();
    }
  }

  handleToggleNav(e) {
    const $btn = e.currentTarget;

    if (this.windowSizeOke()) {
      if ($btn.classList.contain(this.openBtnSelector)) {
        this.openNav();
      } else {
        this.closeNav();
      }
    }
  }

  openNav() {
    this.nav.classList.add(this.navOpenClass);
  }

  closeNav() {
    this.nav.classList.remove(this.navOpenClass);
  }

  windowSizeOke() {
    return window.width <= this.maxWidth;
  }
}
