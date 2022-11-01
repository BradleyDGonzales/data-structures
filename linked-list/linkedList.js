let bool = false;
let countIndex = 0;
const Node = (value = null) => {
  const data = value;
  const nextNode = null;
  return {
    data, nextNode,
  };
};
const LinkedList = () => {
  let nodeHead = null;
  let length = 0;
  const append = (value) => {
    const newNode = Node(value).data;
    if (nodeHead === null) {
      nodeHead = newNode;
      newNode.nextNode = null;
    } else {
      let pointer = nodeHead;
      while (pointer.nextNode !== null) {
        pointer = pointer.nextNode;
      }
      pointer.nextNode = newNode;
      newNode.nextNode = null;
    }
    length++;
  };
  const prepend = (value) => {
    const newNode = Node(value).data;
    if (nodeHead === null) {
      nodeHead = newNode;
      newNode.nextNode = null;
    } else {
      const temp = nodeHead;
      nodeHead = newNode;
      nodeHead.nextNode = temp;
    }

    length++;
  };
  const size = () => {
    return length;
  };
  const head = () => {
    return nodeHead;
  };
  const tail = () => {
    let pointer = nodeHead;
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    return pointer;
  };
  const at = (index) => {
    let pointer = nodeHead;
    let count = 0;
    if (index >= length) {
      return undefined;
    }
    if (index === 0) {
      return nodeHead;
    }
    if (index === length - 1) {
      return tail();
    }
    while (count !== index) {
      pointer = pointer.nextNode;
      count++;
    }
    return pointer;
  };
  const pop = () => {
    let pointer = nodeHead;
    let secondToLast = nodeHead;
    while (pointer.nextNode !== null) {
      secondToLast = pointer;
      pointer = pointer.nextNode;
    }
    secondToLast.nextNode = null;
    delete pointer['data'];
    delete pointer['nextNode'];
    length--;
    console.log(secondToLast);
    return pointer;
  };
  const contains = (value) => {
    let init = nodeHead;
    let pointer = nodeHead;
    while (pointer.nextNode !== null) {
      init = pointer;
      pointer = pointer.nextNode;
      if (init.data === value || pointer.data === value) {
        bool = true;
        return bool;
      } else {
        bool = false;
      }
    }
    return bool;
  };
  const find = (value) => {
    countIndex = 0;
    let init = nodeHead;
    let pointer = nodeHead;
    while (pointer.nextNode !== null) {
      init = pointer;
      pointer = pointer.nextNode;
      if (init.data === value) {
        return countIndex;
      }
      countIndex++;
      if (pointer.data === value) {
        return countIndex;
      }
    }
    return null;
  };
  const toString = () => {
    let myString = `${head().data} -> `;
    let pointer = nodeHead;
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode;
      myString = myString + `${pointer.data} -> `;
    }
    myString = myString + `NULL`;
    return myString;
  };
  return {
    append, prepend, size, head, tail, at, pop, contains, find, toString,
  };
};
const test = LinkedList();
test.append(Node(4));
test.append(Node(2));
test.prepend(Node(6));
test.append(Node(1));
