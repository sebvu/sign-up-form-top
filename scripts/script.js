main();

function main() {
  const DARK = "dark";
  const LIGHT = "light";
  const rootElement = document.documentElement;
  const style = window.getComputedStyle(rootElement);
  const themeSwitcherIcon = document.querySelector(".header__theme-switcher");
  const sidebarImage = document.querySelector(".sidebar__image");

  themeSwitcherIcon.addEventListener("click", (e) => {
    let currentThemeClass = rootElement.classList[0];
    console.log(currentThemeClass);

    if (currentThemeClass && currentThemeClass === DARK) {
      rootElement.className = LIGHT;
    } else {
      rootElement.className = DARK;
    }

    let sidebarImgUrl = style.getPropertyValue("--_sidebar-img");
    let sidebarImgUrlSliced = sidebarImgUrl
      .slice(sidebarImgUrl.indexOf("(") + 1, sidebarImgUrl.indexOf(")"))
      .slice(3);

    let sidebarAlt = style.getPropertyValue("--_alt-sidebar-img");
    let sidebarAltSliced = sidebarAlt.slice(
      sidebarAlt.indexOf('"') + 1,
      sidebarAlt.lastIndexOf('"'),
    );

    let iconImgUrl = style.getPropertyValue("--_icon-switcher");
    let iconImgUrlSliced = iconImgUrl
      .slice(iconImgUrl.indexOf("(") + 1, iconImgUrl.indexOf(")"))
      .slice(3);

    let iconAlt = style.getPropertyValue("--_alt-icon-switcher");
    let iconAltSliced = iconAlt.slice(
      iconAlt.indexOf('"') + 1,
      iconAlt.lastIndexOf('"'),
    );

    console.log(sidebarImgUrlSliced);
    console.log(sidebarAltSliced);
    console.log(iconImgUrlSliced);
    console.log(iconAltSliced);

    sidebarImage.setAttribute("src", sidebarImgUrlSliced);
    sidebarImage.setAttribute("alt", sidebarAltSliced);
    themeSwitcherIcon.setAttribute("src", iconImgUrlSliced);
    themeSwitcherIcon.setAttribute("alt", iconAltSliced);
  });
}
