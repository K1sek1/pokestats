let stsList = [];
for (let h = 0; h < 64; h++) {
for (let a = 0; a < Math.min(64, 128 - h); a++) {
for (let b = 0; b < Math.min(64, 128 - h - a); b++) {
for (let c = 0; c < Math.min(64, 128 - h - a - b); c++) {
for (let d = 0; d < Math.min(64, 128 - h - a - b - c); d++) {
let s = 128 - h - a - b - c - d

  console.log("hello");

  stsList.push([]);
  stsList[stsList.length - 1].push([h, a, b, c, d, s], []);
  for (let i = 0; i < 6; i++){
    let value = Math.floor((bs[i].value * 2 + iv[i].value + [h, a, b, c, d, s][i]) * lv.value /100);
    value = i === 0 ? base + +lv.value + 10 : Math.floor((base + 5) * ntr[i - 1].dataset.value);
    stsList[stsList.length - 1][1].push(value);
  }

}}}}}
console.log(stsList);

