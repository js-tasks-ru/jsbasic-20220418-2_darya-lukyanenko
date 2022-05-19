function getMinMax(str) {
  let array = str.split(/[ ,]+/);

  let minV = +array[0];
  let maxV = minV;
  for (let i = 0; i < array.length; i++) {
    let e = +array[i];
    if (e < minV) minV = e;
    if (e > maxV) maxV = e;
  }
  return {min: minV, max: maxV};
}
