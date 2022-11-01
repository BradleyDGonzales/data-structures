/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
let treeRoot;
let heightCount = -1;
function mergeSort(array) {
  if (array.length === 1) return array;
  const half = Math.ceil(array.length / 2);
  const left = array.slice(0, half);
  const right = array.slice(half, array.length);
  return merge(mergeSort(left), mergeSort(right));
}
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
const Node = (root) => {
  const data = root;
  const left = null;
  const right = null;
  return {
    data, left, right,
  };
};

const Tree = (array) => {
  const finalArray = [...new Set(mergeSort(array))];
  const preOrderData = [];
  const inOrderData = [];
  const postOrderData = [];
  // let treeRoot;
  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };
  const buildTree = (array, start = 0, end = (array.length - 1)) => {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = Node(array[mid]);
    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid+1, end);
    treeRoot = root;
    return root;
  };
  const insert = (value, root = treeRoot) => {
    if (root === null) {
      root = value;
      return root;
    }
    if (value.data < root.data) {
      root.left = insert(value, root.left);
    } else if (value.data > root.data) {
      root.right = insert(value, root.right);
    }
    return root;
  };
  const deletion = (value, root = treeRoot) => {
    if (root === null) {
      root = value;
      return root;
    }
    if (value.data !== root.data) {
      if (value.data < root.data) {
        root.left = deletion(value, root.left);
      } else if (value.data > root.data) {
        root.right = deletion(value, root.right);
      }
    } else if (value.data === root.data) {
      if (!root.left && !root.right) {
        root = null;
      } else if (root.left && root.right) {
        root.data = minValue(root.right);
        root.right = deletion(Node(root.data), root.right);
        console.log(root);
      } else if (root.right) {
        root = root.right;
        root.left = null;
        root.right = null;
      } else if (root.left) {
        root = root.left;
        root.left = null;
        root.right = null;
      }
    }
    console.log(value);
    return root;
  };
  const find = (value, root = treeRoot) => {
    if (value.data === root.data) {
      return root;
    }
    if (value.data < treeRoot.data) {
      root = root.left;
      root = find(value, root);
    } else {
      root = root.right;
      root = find(value, root);
    }
    return root;
  };
  const levelOrder = (root = treeRoot) => {
    const queue = [];
    const result = [];
    if (root === null) {
      return root;
    }
    queue.push(root);
    while (queue.length !== 0) {
      const current = queue[0];
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
      result.push(queue.shift());
    }
    return result;
  };
  const inOrder = (root = treeRoot) => {
    if (root === null) {
      return;
    } else {
      inOrder(root.left);
      inOrderData.push(root.data);
      inOrder(root.right);
    }
    return inOrderData;
  };
  const preOrder = (root = treeRoot) => {
    if (root === null) {
      return;
    } else {
      preOrderData.push(root.data);
      preOrder(root.left);
      preOrder(root.right);
    }
    return preOrderData;
  };
  const postOrder = (root = treeRoot) => {
    if (root === null) {
      return;
    } else {
      postOrder(root.left);
      postOrder(root.right);
      postOrderData.push(root.data);
    }
    return postOrderData;
  };
  const height = (value, root = treeRoot) => {
    findHeightUtil(value, root);
    return heightCount;
  };
  const findHeightUtil = (value, root) => {
    if (root === null) {
      return -1;
    }
    const leftHeight = findHeightUtil(value, root.left);
    const rightHeight = findHeightUtil(value, root.right);
    const ans = Math.max(leftHeight, rightHeight) + 1;
    if (root.data == value.data) {
      heightCount = ans;
    }
    return ans;
  };

  const depth = (value, root = treeRoot, depthCount = 0) => {
    if (root === null) {
      return root;
    }
    if (value.data === root.data) {
      return depthCount;
    }
    if (value.data > root.data) {
      root = root.right;
      depthCount = depth(value, root, depthCount);
    } else if (value.data < root.data) {
      root = root.left;
      depthCount = depth(value, root, depthCount);
    }
    return depthCount + 1;
  };
  // something wrong with this
  const isBalanced = (root = treeRoot) => {
    if (root === null) {
      return false;
    }
    const leftHalf = root.left;
    const rightHalf = root.right;
    if (Math.abs(height(Node(treeRoot.data), leftHalf) - height(Node(treeRoot.data), rightHalf) > 1)) {
      return false;
    } else {
      return true;
    }
  };
  const rebalance = (root = treeRoot) => {
    let rebalancedArray = [];
    rebalancedArray = inOrder(root);
    return buildTree(rebalancedArray);
  };
  return {
    buildTree, finalArray, insert, deletion, find, levelOrder, inOrder, preOrder, postOrder, prettyPrint, height, depth, findHeightUtil, isBalanced, rebalance,
  };
};


function minValue(root) {
  let minv = root.data;
  while (root.left !== null) {
    minv = root.left.data;
    root = root.left;
  }
  return minv;
}
const test = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]); // returns [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
console.log(test.buildTree([1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]));
// console.log(test.levelOrder());
// console.log(test.preOrder());
// console.log(test.inOrder());
// console.log(test.postOrder());
test.insert(Node(444));
test.insert(Node(454));
test.insert(Node(464));
console.log(test.height(Node(4)));
console.log(test.isBalanced());
console.log(test.rebalance());

