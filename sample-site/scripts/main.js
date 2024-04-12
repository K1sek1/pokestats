for (const elm of document.getElementsByClassName("dummy"))
  elm.onfocus = () => this.blur();
