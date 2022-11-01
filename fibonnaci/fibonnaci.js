function fibRec(n) {
  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }
  if (n === 3) {
    return 1;
  }
  const array = [];
  const next = fibRec(n - 1) + fibRec(n - 2);
  return next;
}
console.log(fibRec(10));

/*
fibRec(5);
next = fibRec(4) + fibRec(3)


fibRec(4)
next = fibRec(3) + fibRec(2)

fibRec(3)
next = fibRec(2) + fibRec(1)
next = 1 + 1 = 2;

next = 2 + 1 = 3

next = 3 */
