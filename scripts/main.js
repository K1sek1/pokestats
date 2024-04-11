/*
"bs" 種族値
"iv" 個体値
"ev" 努力値
*/

const ringoImage = document.querySelector("img");

ringoImage.onclick = () => {
  const ringoSrc = ringoImage.getAttribute("src");
  if (ringoSrc === "images/aka.png") {
    ringoImage.setAttribute("src", "images/ao.png");
  } else {
    ringoImage.setAttribute("src", "images/aka.png");
  }
};

const lv = 50;
let ntr = Array(6); ntr.fill(1);
const bs = document.getElementsByClassName("bs");
const iv = document.getElementsByClassName("iv");
const ev = document.getElementsByClassName("ev");
const ntrPg = document.getElementsByClassName("ntrPg");
const ntrNg = document.getElementsByClassName("ntrNg");
const sts = document.getElementsByClassName("sts");
const tbl = [bs, iv, ev, ntr, sts]

function fBs() {
  this.value = Math.floor(this.value);
  if (this.value < this.min) {
    this.value = this.min;
  }
  outputStats(this);
}

function fIv() {
  this.value = Math.floor(this.value);
  if (this.value < this.min) {
    this.value = this.min;
  } else if (this.value > this.max) {
    this.value = this.max;
  }
  outputStats(this);
}

function evChange() {
  outputStats(this)
}
function evBlur() {
  const elm = +this.dataset.index;
  this.value = (Math.ceil(Math.floor((bs[elm].value * 2 + +iv[elm].value + Math.floor(ev[elm].value / 4)) * lv / 100) * 100 / lv) - bs[elm].value * 2 - iv[elm].value) * 4;
  if (this.value < 0)
    this.value = 0;
  else if (this.value > 252)
    this.value = 252;
  outputStats(this);
}

function pgClick() {
  if (ntr[Array.prototype.slice.call(ntrPg).indexOf(this)] === 1.1) {
    this.style.backgroundColor = "initial";
    ntr[Array.prototype.slice.call(ntrPg).indexOf(this)] = 1;
  } else {
    for (const elm of ntrPg) {
      elm.style.backgroundColor = "initial";
      if (ntr[Array.prototype.slice.call(ntrPg).indexOf(elm)] === 1.1)
        ntr[Array.prototype.slice.call(ntrPg).indexOf(elm)] = 1;
    }
    this.style.backgroundColor = "red";
    this.parentElement.children[1].style.backgroundColor = "initial";
    ntr[Array.prototype.slice.call(ntrPg).indexOf(this)] = 1.1;
  }
}

function ngClick() {
  if (ntr[Array.prototype.slice.call(ntrNg).indexOf(this)] === 0.9) {
    this.style.backgroundColor = "initial";
    ntr[Array.prototype.slice.call(ntrNg).indexOf(this)] = 1;
  } else {
    for (const elm of ntrNg) {
      elm.style.backgroundColor = "initial";
      if (ntr[Array.prototype.slice.call(ntrNg).indexOf(elm)] === 0.9)
        ntr[Array.prototype.slice.call(ntrNg).indexOf(elm)] = 1;
    }
    this.style.backgroundColor = "blue";
    this.parentElement.children[0].style.backgroundColor = "initial";
    ntr[Array.prototype.slice.call(ntrNg).indexOf(this)] = 0.9;
  }
}

function inputStats() {
  const elm = +this.dataset.index;
  if (elm === 0)
    ev[elm].value = (Math.ceil((sts[0].value - 10 - lv) * 100 / lv) - bs[0].value * 2 - iv[0].value) * 4;
  else
    ev[elm].value = (Math.ceil((Math.ceil(sts[elm].value / ntr[elm]) - 5) * 100 / lv) - bs[elm].value * 2 - iv[elm].value) * 4;
  if (ev[elm].value < 0)
    ev[elm].value = 0;
  else if (ev[elm].value > 252)
    ev[elm].value = 252;
}

function outputStats(elm) {
  elm = +elm.dataset.index;
  if (elm === 0)
    sts[0].value = Math.floor((bs[0].value * 2 + +iv[0].value + Math.floor(ev[0].value / 4)) * lv / 100) + lv + 10;
  else
    sts[elm].value = Math.floor((Math.floor((bs[elm].value * 2 + +iv[elm].value + Math.floor(ev[elm].value / 4)) * lv / 100) + 5) * ntr[elm]);
}
for (const elm of sts) {
  outputStats(elm);
}

function next(e) {
  if (e.key === 'Enter') {
    const elm = this.parentElement;
    if (elm.parentElement.rowIndex < elm.parentElement.parentElement.rows.length)
      elm.parentElement.parentElement.rows[elm.parentElement.rowIndex].cells[elm.cellIndex].children[0].select();
    else
      this.blur();
  }
}
function blur(e) {
  if (e.key === 'Enter') {
    this.blur();
  }
}
function select() {
  this.select();
}

for (const elm of bs) {
  elm.onchange = fBs;
  elm.onkeydown = next;
  elm.onfocus = select;
}

for (const elm of iv) {
  elm.onchange = fIv;
  elm.onkeydown = next;
  elm.onfocus = select;
}

for (const elm of ev) {
  elm.onchange = evChange;
  elm.onblur = evBlur;
  elm.onkeydown = next;
  elm.onfocus = select;
}

for (const elm of ntrPg) {
  elm.onclick = pgClick;
}

for (const elm of ntrNg) {
  elm.onclick = ngClick;
}

for (const elm of sts) {
  elm.onchange = inputStats;
  elm.onkeydown = blur;
  elm.onfocus = select;
}