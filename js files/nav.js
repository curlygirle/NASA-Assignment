var navlinks = document.getElementById("navlinks");

function showMenu() {
  navlinks.style.left = "0";
}

function hideMenu() {
  navlinks.style.left = "-200px";
}

document.addEventListener("DOMContentLoaded", function() {
  var closeIcon = document.querySelector('.fa-xmark');
  var openIcon = document.querySelector('.fa-bars');

  if(closeIcon) {
    closeIcon.addEventListener('click', hideMenu);
  }

  if(openIcon) {
    openIcon.addEventListener('click', showMenu);
  }
});
