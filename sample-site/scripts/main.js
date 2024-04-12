for (const elm of document.querySelectorAll(".dummy"))
  elm.onfocus = () => elm.blur();

for (const elm of document.querySelectorAll(".body *"))
  elm.onfocus = () => elm.select();
