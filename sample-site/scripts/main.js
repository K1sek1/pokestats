//header disabled
for (const elm of document.querySelectorAll(".header input")) {
  elm.disabled = true;
}
//dummy blur
for (const elm of document.querySelectorAll(".dummy")) {
  elm.onfocus = () => { elm.blur(); };
}



const pokeName = document.querySelector("#pokeName");

const lv = document.querySelector("#lv > input");
const ntr = document.querySelectorAll(".ntr > .body > *:has(*)");
const bs = document.querySelectorAll(".bs > .body > *");
const iv = document.querySelectorAll(".iv > .body > *");
const ev = document.querySelectorAll(".ev > .body > *");
const sts = document.querySelectorAll(".sts > .body > *");
const stsMltpl = document.querySelectorAll(".stsMltpl > .body > *");
const stsRslt = document.querySelectorAll(".stsRslt > .body > *");

const move = document.querySelectorAll("#moveTbl > * > .body > *");
const ratio = document.querySelectorAll(".ratio > .body > * > input:not(.dummy)");

let atkIndex = 0;
let defIndex = 0;
const stsIndex = document.querySelectorAll(".stsIndex input");

const textarea = document.querySelector("#copyTextArea textarea");
const copyBtn = document.querySelector("#copyTextArea input");

const selectAbles = document.querySelectorAll("input:enabled");

//body * on
for (const elm of document.querySelectorAll("input:enabled:not(.dummy)")) {
  elm.onfocus = () => elm.select();
}

pokeName.onchange = () => {
  outputTextArea();
};

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
    ntrClick(elm, 0);
  };
  elm.children[1].onclick = () => {
    ntrClick(elm, 1);
  };
}
function ntrClick(elm, index) {
  const value = index === 0 ? 1.1 : 0.9;
  const bgClr = index === 0 ? "red" : "blue";
  if (elm.dataset.value == value) {
    elm.dataset.value = 1;
    elm.children[index].style.backgroundColor = "ButtonFace";
    elm.children[index].style.fontWeight = "initial";
  } else {
    for (const elm of document.querySelectorAll(".ntr > .body > .btn")) {
      if (elm.dataset.value == value) {
        elm.dataset.value = 1;
        elm.children[index].style.backgroundColor = "ButtonFace";
        elm.children[index].style.fontWeight = "initial";
        outputSts(Array.prototype.indexOf.call(ntr, elm) + 1);
      }
    }
    elm.dataset.value = value;
    elm.children[index].style.backgroundColor = bgClr;
    elm.children[index].style.fontWeight = "bold";
    elm.children[1 - index].style.backgroundColor = "ButtonFace";
    elm.children[1 - index].style.fontWeight = "initial";
  }
  outputSts(Array.prototype.indexOf.call(ntr, elm) + 1);
}

//sts on
for (let index = 0; index < 6; index++) {
  sts[index].onchange = () => {
    if (index === 0)
      ev[index].value = (Math.ceil((sts[index].value - 10 - lv.value) * 100 / lv.value) - bs[index].value * 2 - iv[index].value) * 4;
    else
      ev[index].value = (Math.ceil((Math.ceil(sts[index].value / ntr[index - 1].dataset.value) - 5) * 100 / lv.value) - bs[index].value * 2 - iv[index].value) * 4;
    outputRslt(index);
    if (+ev[index].value < -4) {
      sts[index].style.color = "blue";
      sts[index].style.fontWeight = "bold";
    } else if (+ev[index].value > 252) {
      sts[index].style.color = "red";
      sts[index].style.fontWeight = "bold";
    } else {
      sts[index].style.color = "initial";
      sts[index].style.fontWeight = "initial";
    }
    regulateElmVal(ev[index]);
    sum(ev[index], -1, 508);
  };
}

//stsMltpl on
for (const elm of stsMltpl) {
  elm.onchange = () => {
    outputRslt(Array.prototype.indexOf.call(stsMltpl, elm));
  };
}

//move on
for (const elm of move) {
  elm.onchange = () => {
    move[2].value = Math.floor(move[0].value * move[1].value);
    outputAtkIndex();
    outputTextArea();
  };
}

//ratio on
for (let index = 0; index < 4; index++) {
  ratio[index].onchange = () => {
    switch (index) {
      case 0:
        ratio[1].value = 100 - ratio[0].value;
        outputAtkIndex();
        break;
      case 1:
        ratio[0].value = 100 - ratio[1].value;
        outputAtkIndex();
        break;
      case 2:
        ratio[3].value = 100 - ratio[2].value;
        outputDefIndex();
        break;
      case 3:
        ratio[2].value = 100 - ratio[3].value;
        outputDefIndex();
        break;
    }
    outputTextArea();
  }
}



//output sts
for (let index = 0; index < 6; index++) outputSts(index);
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
  outputTextArea();
}

//output stsIndex
function outputAtkIndex() {
  atkIndex =
    move[2].value * stsRslt[1].value * stsRslt[3].value
    / (stsRslt[1].value * (ratio[1].value / 100) + stsRslt[3].value * (ratio[0].value / 100))
    / 25000 * lv.value;
  stsIndex[0].value = atkIndex.toFixed(4);
  outputStsIndex();
}
function outputDefIndex() {
  defIndex =
    stsRslt[0].value * stsRslt[2].value * stsRslt[4].value
    / (stsRslt[2].value * (ratio[3].value / 100) + stsRslt[4].value * (ratio[2].value / 100))
    / 250
  stsIndex[1].value = defIndex.toFixed(4);
  outputStsIndex();
}
function outputStsIndex() {
  stsIndex[2].value = (Math.sqrt(atkIndex * defIndex)).toFixed(4);
}



function sum(elm, stsMltpl, initial) {
  setTimeout(() => {
    let sum = initial;
    for (const adder of elm.parentElement.children) {
      sum += adder.value * stsMltpl
    }
    elm.parentElement.nextElementSibling.children[0].value = sum
  }, 0);
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
  sum(ev[0], -1, 508);
  outputTextArea();
}

textarea.onfocus = () => outputTextArea()
function outputTextArea() {
  let text = [];
  if (pokeName.value != "")
    text.push(pokeName.value, " ");
  text.push("Lv.", + lv.value, "\n");

  for (let index = 0; index < 3; index++) {
    text.push(["種族値: ", "個体値: ", "努力値: "][index]);
    for (const elm of [bs, iv, ev][index]) text.push(elm.value, "-");
    text[text.length - 1] = "\n";
  }

  text.push("実数値: ");
  for (let index = 0; index < 6; index++) {
    let ntrBool = ""
    if (index != 0) {
      switch (+ntr[index - 1].dataset.value) {
        case 1.1: ntrBool = "↑"; break;
        case 0.9: ntrBool = "↓"; break;
      }
    }
    text.push(sts[index].value + ntrBool, "-");
  }
  text[text.length - 1] = "\n";

  let textStsMltpl = [];
  for (let index = 0; index < 6; index++) {
    if (stsMltpl[index].value != 1) {
      textStsMltpl.push(textStsMltpl.length === 0 ? "\n補正: " : " ");
      textStsMltpl.push(["H", "A", "B", "C", "D", "S"][index] + "x" + stsMltpl[index].value + "(" + stsRslt[index].value + ")");
    }
  }

  text.push(
    textStsMltpl.join(""), "\n",
    "技: ", move[0].value, "x" + move[1].value, "(" + move[2].value + ")", "\n",
    "AC比: ", ratio[0].value + "%", ":", ratio[1].value + "%", "\n",
    "BD比: ", ratio[2].value + "%", ":", ratio[3].value + "%", "\n",
    "火力指数: ", stsIndex[0].value, "\n",
    "耐久指数: ", stsIndex[1].value, "\n",
    "能力指数: ", stsIndex[2].value
  );

  textarea.value = text.join("")
}

copyBtn.onclick = () => {
  new Promise((resolve) => {
    navigator.clipboard.writeText(textarea.value);
    resolve();
  })
    .then(() => {
      alert("コピーしました。");
    })
    .catch(() => {
      alert("コピーできませんでした。");
    })
}




//Enter
for (const elm of selectAbles) {
  elm.onkeydown = function (e) {
    if (e.key === "Enter") selectAbles[Array.prototype.indexOf.call(selectAbles, this) + 1].select();
  }
}


//initial
setTimeout(() => {
  for (const elm of bs) {
    sum(elm, 1, 0);
  }
  for (const elm of ev) {
    sum(elm, -1, 508);
  }
  move[2].value = move[0].value * move[1].value;
  outputAtkIndex();
  outputDefIndex();
  outputTextArea();
}, 1);

window.onload = () => {
  alert("ページが読み込まれました。");
};
