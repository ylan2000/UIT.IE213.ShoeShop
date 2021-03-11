(function () {
  document
    .querySelector(".nav--hover")
    .addEventListener("mouseover", function () {
      document.querySelector(".nav__sub-menu").style.visibility = "visible";
    });

  document
    .querySelector(".nav__sub-menu")
    .addEventListener("mouseover", function () {
      document.querySelector(".nav__sub-menu").style.visibility = "visible";
    });

  document
    .querySelector(".nav__sub-menu")
    .addEventListener("mouseout", function () {
      document.querySelector(".nav__sub-menu").style.visibility = "hidden";
    });
})();
