for (const elm of document.getElementsByClassName("dummy"))
  elm.onfocus = dummyFocus;

function dummyFocus() {
  this.blur();
}