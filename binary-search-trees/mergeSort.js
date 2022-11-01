/* eslint-disable prefer-const */
/* eslint-disable require-jsdoc */
// console.log(Math.ceil(1.5));
const test = [2, 6, 3, 9, 10, 1, 20, 14, 12];
function merge(arr1, arr2) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

function mergeSort(array) {
  if (array.length === 1) return array;
  const half = Math.ceil(array.length / 2);
  const left = array.slice(0, half);
  const right = array.slice(half, array.length);
  return merge(mergeSort(left), mergeSort(right));
}
console.log(mergeSort(test));

module.exports = mergeSort;
