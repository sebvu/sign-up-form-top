function ThemeSwitcher(rootElement, sbObj, tsObj) {
  // expose what style properties we are affecting
  const styleContext = window.getComputedStyle(rootElement);
  const DARK = "dark";
  const LIGHT = "light";

  // public

  this.setDarkTheme = () => {
    rootElement.className = DARK;

    doImageShifts(getCurrentClassTheme());
  };

  this.setLightTheme = () => {
    rootElement.className = LIGHT;

    doImageShifts(getCurrentClassTheme());
  };

  this.toggleTheme = () => {
    let currentClassTheme = getCurrentClassTheme();

    rootElement.className =
      currentClassTheme && currentClassTheme === DARK ? LIGHT : DARK;

    doImageShifts(currentClassTheme);
  };

  // helpers

  // change all image elements in page
  let doImageShifts = () => {
    // sidebar image
    let sbImgSrc = cleanURLString(getPropertyValue(sbObj.src));
    let sbImgAlt = cleanAltString(getPropertyValue(sbObj.alt));

    // icon theme switcher
    let themeIconImgSrc = cleanURLString(getPropertyValue(tsObj.src));
    let themeIconImgAlt = cleanAltString(getPropertyValue(tsObj.alt));

    sbObj.prop.setAttribute("src", sbImgSrc);
    sbObj.prop.setAttribute("alt", sbImgAlt);
    tsObj.prop.setAttribute("src", themeIconImgSrc);
    tsObj.prop.setAttribute("alt", themeIconImgAlt);

    console.log(`page theme switched to ${getCurrentClassTheme()}`);
  };

  let getCurrentClassTheme = () => rootElement.classList[0];

  let getPropertyValue = (prop) => styleContext.getPropertyValue(prop);

  // clean quotations around alt strs
  let cleanAltString = (str) =>
    str.slice(str.indexOf('"') + 1, str.lastIndexOf('"'));

  // clean url(...) fragment and bring reference to root project level
  let cleanURLString = (str) =>
    str.slice(str.indexOf("/") + 1, str.lastIndexOf(")"));
}

function main() {
  const rootElement = document.documentElement;
  const themeSwitcherElem = document.querySelector(".header__theme-switcher");
  const sidebarImgElem = document.querySelector(".sidebar__image");

  function imageObj(propertyRef, srcProperty, altProperty) {
    this.prop = propertyRef;
    this.src = srcProperty;
    this.alt = altProperty;
  }

  const sidebarObj = new imageObj(
    sidebarImgElem,
    "--_sidebar-img",
    "--_alt-sidebar-img",
  );

  const themeSwitcherObj = new imageObj(
    themeSwitcherElem,
    "--_icon-switcher-img",
    "--_alt-icon-switch-img",
  );

  const themeSwitcher = new ThemeSwitcher(
    rootElement,
    sidebarObj,
    themeSwitcherObj,
  );

  themeSwitcher.setLightTheme(); // default theme

  themeSwitcherElem.addEventListener("click", (e) => {
    console.log("attempting theme toggle");
    themeSwitcher.toggleTheme();
  });
}

main();
