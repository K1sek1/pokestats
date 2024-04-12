for (const elm of document.getElementsByClassName("dummy"))
  elm.onfocus = () => elm.blur();
