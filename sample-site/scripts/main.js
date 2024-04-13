//header disabled
for (const elm of document.querySelectorAll(".header *")) {
  elm.disabled = true;
}

//dummy readonly, blur
for (const elm of document.querySelectorAll(".dummy")) {
  elm.readOnly = true;
  elm.onfocus = () => {elm.blur();};
}



const lv = document.querySelector(".lv > input[type='number']");
const ntr = document.querySelectorAll(".ntr > .body > *:has(*)");
const bs = document.querySelectorAll(".bs > .body > *");
const iv = document.querySelectorAll(".iv > .body > *");
const ev = document.querySelectorAll(".ev > .body > *");
const sts = document.querySelectorAll(".sts > .body > *");
const mltpl = document.querySelectorAll(".mltpl > .body > *");
const rslt = document.querySelectorAll(".rslt > .body > *");
const selectAbles = document.querySelectorAll("input:not(:disabled)");

//body * on
for (const elm of document.querySelectorAll("input:not(:read-only, :disabled)")) {
  elm.onfocus = () => elm.select();
}

//lv on
lv.onchange = () => {
  for (let index = 0; index < 6; index++) {
    regulateElmVal(lv)
    calcEv(index);
    outputSts(index);
  }
};

//bs on
for (const elm of bs) {
  elm.onchange = () => {
    regulateElmVal(elm);
    calcEv(Array.prototype.indexOf.call(bs, elm));
    outputSts(Array.prototype.indexOf.call(bs, elm));
    sum(elm, 1, 0);
  };
}

//iv on
for (const elm of iv) {
  elm.onchange = () => {
    regulateElmVal(elm);
    calcEv(Array.prototype.indexOf.call(iv, elm));
    outputSts(Array.prototype.indexOf.call(iv, elm));
  };
}

//ev on
for (const elm of ev) {
  elm.onchange = () => {
    regulateElmVal(elm);
    outputSts(Array.prototype.indexOf.call(ev, elm));
    sum(elm, -1, 508);
  };
  elm.onblur = () => {
    calcEv(Array.prototype.indexOf.call(ev, elm));
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

function calcEv(index) {
  ev[index].value = (Math.ceil(Math.floor((bs[index].value * 2 + +iv[index].value + Math.floor(ev[index].value / 4)) * lv.value / 100) * 100 / lv.value) - bs[index].value * 2 - iv[index].value) * 4;
  regulateElmVal(ev[index]);
}

//output sts
for (let index = 0; index < 6; index++) outputSts(index); //initial
function outputSts(index) {
  //const index = Array.prototype.indexOf.call(nodes, elm);
  const base = Math.floor((bs[index].value * 2 + +iv[index].value + Math.floor(ev[index].value / 4)) * lv.value / 100);
  if (index === 0)
    sts[index].value = base + +lv.value + 10;
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

function regulateElmVal(elm) {
  const min = +(elm.min != "" ? elm.min : -Infinity);
  const max = +(elm.max != "" ? elm.max : Infinity);
  if (elm.value < min)
    elm.value = min;
  else if (elm.value > max)
    elm.value = max;
  else
    elm.value = Math.floor(elm.value);
}

//個体値（、種族値）が変更された際に、努力値を再計算する



//Enter
for (const elm of selectAbles) {
  elm.onkeydown = function (e) {
    if (e.key === "Enter") selectAbles[Array.prototype.indexOf.call(selectAbles, this) + 1].select();
  }
}