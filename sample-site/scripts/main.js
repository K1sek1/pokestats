//header disabled
for (const elm of document.querySelectorAll(".header input")) {
  elm.disabled = true;
}

//dummy readonly, blur
for (const elm of document.querySelectorAll(".dummy")) {
  elm.onfocus = () => { elm.blur(); };
}



const lv = document.querySelector(".lv > input");
const ntr = document.querySelectorAll(".ntr > .body > *:has(*)");
const bs = document.querySelectorAll(".bs > .body > *");
const iv = document.querySelectorAll(".iv > .body > *");
const ev = document.querySelectorAll(".ev > .body > *");
const sts = document.querySelectorAll(".sts > .body > *");
const stsMltpl = document.querySelectorAll(".stsMltpl > .body > *");
const stsRslt = document.querySelectorAll(".stsRslt > .body > *");
const move = document.querySelectorAll("#moveTbl > * > .body > *");
const ratio = document.querySelectorAll(".ratio > .body > * > input:not(.dummy)");
const stsIndex = document.querySelectorAll(".stsIndex input[type='number']");
const selectAbles = document.querySelectorAll("input:not(:disabled)");

//body * on
for (const elm of document.querySelectorAll("input:not(:disabled, .dummy)")) {
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

//stsMltpl on
for (const elm of stsMltpl) {
  elm.onchange = () => { outputRslt(Array.prototype.indexOf.call(stsMltpl, elm)); };
}

//move on
move[2].value = move[0].value * move[1].value;
for (const elm of move) {
  elm.onchange = () => {
    move[2].value = move[0] * move[1];
    outputAtkIndex();
  };
}

//ratio on
ratio[0].onchange = () => {
  ratio[1].value = 100 - ratio[0].value;
  outputAtkIndex();
};
ratio[1].onchange = () => {
  ratio[0].value = 100 - ratio[1].value;
  outputAtkIndex();
};
ratio[2].onchange = () => {
  ratio[3].value = 100 - ratio[2].value;
  outputDefIndex();
};
ratio[3].onchange = () => {
  ratio[2].value = 100 - ratio[3].value;
  outputDefIndex();
};



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
  stsRslt[index].value = Math.floor(sts[index].value * stsMltpl[index].value);
  switch (index) {
    case 1: case 3:
      outputAtkIndex();
      break;
    case 0: case 2: case 4:
      outputDefIndex();
      break;
  }
}

//output stsIndex
outputAtkIndex();
function outputAtkIndex() {
  stsIndex[0].value = Math.floor(move[2].value * stsRslt[1].value * stsRslt[3].value / (stsRslt[1].value * (ratio[1].value / 100) + stsRslt[3].value * (ratio[0].value / 100)));
  outputStsIndex();
}

outputDefIndex();
function outputDefIndex() {
  stsIndex[1].value = Math.floor(stsRslt[0].value * stsRslt[2].value * stsRslt[4].value / (stsRslt[2].value * (ratio[3].value / 100) + stsRslt[4].value * (ratio[2].value / 100)));
  outputStsIndex();
}

function outputStsIndex() {
  stsIndex[2].value = stsIndex[0].value * stsIndex[1].value;
}



function sum(elm, stsMltpl, initial) {
  let sum = initial;
  for (const adder of elm.parentElement.children) {
    sum += adder.value * stsMltpl
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

function calcEv(index) {
  ev[index].value = (Math.ceil(Math.floor((bs[index].value * 2 + +iv[index].value + Math.floor(ev[index].value / 4)) * lv.value / 100) * 100 / lv.value) - bs[index].value * 2 - iv[index].value) * 4;
  regulateElmVal(ev[index]);
}



//Enter
for (const elm of selectAbles) {
  elm.onkeydown = function (e) {
    if (e.key === "Enter") selectAbles[Array.prototype.indexOf.call(selectAbles, this) + 1].select();
  }
}