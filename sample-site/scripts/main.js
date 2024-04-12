//header disabled
for (const elm of document.querySelectorAll(".header *")) {
  elm.disabled = true;
}

//dummy readonly, blur
for (const elm of document.querySelectorAll(".dummy")) {
  elm.readonly = true;
  elm.onfocus = () => elm.blur();
}



const lv = 50;
const ntr = document.querySelectorAll(".ntr > .body > *:has(*)");
const bs = document.querySelectorAll(".bs > .body > *");
const iv = document.querySelectorAll(".iv > .body > *");
const ev = document.querySelectorAll(".ev > .body > *");
const sts = document.querySelectorAll(".sts > .body > *");
const mltpl = document.querySelectorAll(".mltpl > .body > *");
const rslt = document.querySelectorAll(".rslt > .body > *");
const selectAbles = document.querySelectorAll(".tbl input:not([disabled])");

//body * on
for (const elm of document.querySelectorAll(".body *")) {
  elm.onfocus = () => elm.select();
}

//bs on
for (const elm of bs) {
  elm.onchange = () => {
    if (elm.value < 0)
      elm.value = 0;
    else
      elm.value = Math.floor(elm.value);
    outputSts(Array.prototype.indexOf.call(bs, elm));
    sum(elm, 1, 0);
  };
}

//iv on
for (const elm of iv) {
  elm.onchange = () => {
    if (elm.value < 0)
      elm.value = 0;
    else if (elm.value > 31)
      elm.value = 31;
    else
      elm.value = Math.floor(elm.value);
    outputSts(Array.prototype.indexOf.call(iv, elm));
  };
}

//ev on
for (const elm of ev) {
  elm.onchange = () => {
    if (elm.value < 0)
      elm.value = 0;
    else if (elm.value > 252)
      elm.value = 252;
    else
      elm.value = Math.floor(elm.value);
    outputSts(Array.prototype.indexOf.call(ev, elm));
    sum(elm, -1, 508);
  };
  elm.onblur = () => {
    const bsVal = +bs[Array.prototype.indexOf.call(ev, elm)].value;
    const ivVal = +iv[Array.prototype.indexOf.call(ev, elm)].value;
    elm.value = (Math.ceil(Math.floor((bsVal * 2 + ivVal + Math.floor(elm.value / 4)) * lv / 100) * 100 / lv) - bsVal * 2 - ivVal) * 4;
    if (elm.value < 0)
      elm.value = 0;
  };
}

//ntr on
for (const elm of ntr) {
  elm.children[0].onclick = () => {
    if (elm.dataset.value == 1.1) {
      elm.dataset.value = 1;
      elm.children[0].style.backgroundColor = "initial";
    } else {
      for (const elm of document.querySelectorAll(".ntr > .body > .btn")) {
        if (elm.dataset.value == 1.1) {
          elm.dataset.value = 1;
          elm.children[0].style.backgroundColor = "initial";
        }
      }
      elm.dataset.value = 1.1;
      elm.children[0].style.backgroundColor = "red";
      elm.children[1].style.backgroundColor = "initial";
    }
    outputSts(Array.prototype.indexOf.call(ntr, elm) + 1);
  };
  elm.children[1].onclick = () => {
    if (elm.dataset.value == 0.9) {
      elm.dataset.value = 1;
      elm.children[1].style.backgroundColor = "initial";
    } else {
      for (const elm of document.querySelectorAll(".ntr > .body > .btn")) {
        if (elm.dataset.value == 0.9) {
          elm.dataset.value = 1;
          elm.children[1].style.backgroundColor = "initial";
        }
      }
      elm.dataset.value = 0.9;
      elm.children[0].style.backgroundColor = "initial";
      elm.children[1].style.backgroundColor = "blue";
    }
    outputSts(Array.prototype.indexOf.call(ntr, elm) + 1);
  };
}

//mltpl on
for (const elm of mltpl) {
  elm.onchange = () => { outputRslt(Array.prototype.indexOf.call(mltpl, elm)); };
}

//output sts
for (let index = 0; index < 6; index++) outputSts(index); //initial
function outputSts(index) {
  //const index = Array.prototype.indexOf.call(nodes, elm);
  const base = Math.floor((bs[index].value * 2 + +iv[index].value + Math.floor(ev[index].value / 4)) * lv / 100);
  if (index === 0)
    sts[index].value = base + lv + 10;
  else
    sts[index].value = Math.floor((base + 5) * ntr[index - 1].dataset.value);
  outputRslt(index);
}

function outputRslt(index) {
  rslt[index].value = Math.floor(sts[index].value * mltpl[index].value)
}

function sum(elm, mltpl, initial) {
  let sum = initial;
  for (const adder of elm.parentElement.children) {
    sum += adder.value * mltpl
  }
  elm.parentElement.nextElementSibling.children[0].value = sum
}



//Enter
for (const elm of selectAbles) {
  elm.onkeydown = function(e) {
    if (e.key === "Enter") selectAbles[Array.prototype.indexOf.call(selectAbles, this) + 1].select();
  }
}