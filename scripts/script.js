/* helper example image class to parse over multiple images */
function ImageObj(imgClass, srcCustomProp, altCustomProp) {
  this.class = imgClass;
  this.srcProp = srcCustomProp;
  this.altProp = altCustomProp;
}

/* abstracted theme switching logic object */
function ThemeSwitcher(rootElement, imgArr) {
  // expose what style properties we are affecting
  const styleContext = window.getComputedStyle(rootElement);
  const DARK = "dark";
  const LIGHT = "light";

  // public

  this.setDarkTheme = () => {
    rootElement.className = DARK;

    doImageShifts();
  };

  this.setLightTheme = () => {
    rootElement.className = LIGHT;

    doImageShifts();
  };

  this.toggleTheme = () => {
    let currentClassTheme = getCurrentClassTheme();

    rootElement.className =
      currentClassTheme && currentClassTheme === DARK ? LIGHT : DARK;

    doImageShifts();
  };

  // helpers

  // loop through imgArr and change any corresponding images
  let doImageShifts = () => {
    imgArr.forEach((e) => {
      const imgElem = document.querySelector(e.class);
      const srcVal = cleanSrcString(getPropertyValue(e.srcProp));
      const altVal = cleanAltString(getPropertyValue(e.altProp));

      imgElem.setAttribute("src", srcVal);
      imgElem.setAttribute("alt", altVal);
    });

    /* update sidebar credit */

    const imgCredit = document.querySelector(".sidebar__credits");
    const creditLink = document.createElement("a");
    creditLink.setAttribute("target", "_blank");
    creditLink.setAttribute("rel", "noreferrer");
    imgCredit.textContent = "Photo by ";

    if (getCurrentClassTheme() === DARK) {
      creditLink.setAttribute(
        "href",
        "https://unsplash.com/photos/lone-tree-on-a-grassy-hill-under-cloudy-sky-dPm9bu1X9q0?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
      );
      creditLink.textContent = "Filip Kvasnak";
      imgCredit.append(creditLink);
      imgCredit.appendChild(document.createTextNode(" on Unsplash"));
    } else {
      creditLink.setAttribute("href", "https://github.com/sebvu");
      creditLink.textContent = "Jester";
      imgCredit.append(creditLink);
      imgCredit.appendChild(document.createTextNode(" (me!!)"));
    }

    console.log(`page theme switched to ${getCurrentClassTheme()}`);
  };

  let getCurrentClassTheme = () => rootElement.classList[0];

  let getPropertyValue = (prop) => styleContext.getPropertyValue(prop);

  // clean quotations around alt strs
  let cleanAltString = (str) =>
    str.slice(str.indexOf('"') + 1, str.lastIndexOf('"'));

  // clean url(...) fragment and bring reference to root project level
  let cleanSrcString = (str) =>
    str.slice(str.indexOf("/") + 1, str.lastIndexOf(")"));
}

function main() {
  const rootElement = document.documentElement;
  const themeSwitcherElem = document.querySelector(".theme-switcher");

  /* example list of images to replace */
  const imgArr = [
    new ImageObj(
      ".theme-switcher",
      "--_icon-switcher-img",
      "--_alt-icon-switch-img",
    ),
  ];

  const themeSwitcher = new ThemeSwitcher(rootElement, imgArr);

  themeSwitcher.setDarkTheme(); // default theme

  themeSwitcherElem.addEventListener("click", () => {
    console.log("attempting theme toggle");
    themeSwitcher.toggleTheme();
  });
}

main();
