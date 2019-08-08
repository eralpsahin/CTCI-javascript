/* eslint-disable no-unused-vars */
const print = console.log;

// * TREES AND GRAPHS CHAPTER

/**
 * *  Graph Definition
 */
const GraphNode = function(val) {
  this.val = val;
  this.children = [];
  this.left = function() {
    return this.children[0];
  };
  this.right = function() {
    return this.children[1];
  };
};

GraphNode.prototype.insertVal = function(val) {
  this.children.push(new GraphNode(val));
  return this.children[this.children.length - 1];
};

GraphNode.prototype.insertNode = function(node) {
  this.children.push(node);
  return this.children[this.children.length - 1];
};

GraphNode.prototype.remove = function(child = null) {
  if (child) this.children[child] = null;
  else this.children = [];
};

GraphNode.prototype.setLeft = function(val) {
  this.children[0] = new GraphNode(val);
  return this.children[0];
};

GraphNode.prototype.setRight = function(val) {
  this.children[1] = new GraphNode(val);
  return this.children[1];
};

/**
 * ! Graph Defintion
 */

/**
 * * Tree Traversals
 * Assuming first half is on the left and
 * rest is on the right for children.length > 2
 */

(function() {
  const inOrderTraversal = function(root) {
    if (!root) return;
    const middle = Math.floor(root.children.length / 2);
    // Visit left
    for (let i = 0; i < middle; i += 1) {
      inOrderTraversal(root.children[i]);
    }
    // Visit current one
    print(root.val);

    //Visit right
    for (let i = middle; i < root.children.length; i += 1) {
      inOrderTraversal(root.children[i]);
    }
  };

  const preOrderTraversal = function(root) {
    if (!root) return;

    // Visit current one
    print(root.val);

    const middle = Math.floor(root.children.length / 2);

    // Visit left
    for (let i = 0; i < middle; i += 1) {
      preOrderTraversal(root.children[i]);
    }
    //Visit right
    for (let i = middle; i < root.children.length; i += 1) {
      preOrderTraversal(root.children[i]);
    }
  };

  const postOrderTraversal = function(root) {
    if (!root) return;
    const middle = Math.floor(root.children.length / 2);

    // Visit left
    for (let i = 0; i < middle; i += 1) {
      postOrderTraversal(root.children[i]);
    }
    //Visit right
    for (let i = middle; i < root.children.length; i += 1) {
      postOrderTraversal(root.children[i]);
    }
    // Visit current one
    print(root.val);
  };
  const BFS = function(root) {
    if (!root) return;

    const queue = [];

    queue.push(root);
    queue.push(null); // level change

    while (queue.length > 0) {
      let visiting = queue.shift();
      if (visiting === null) {
        // New level
        print('----');
        queue.push(null);
        if (queue[0] === null) break;
        // You are encountering two consecutive `nulls` means, you visited all the nodes.
        else continue;
      }
      // Visit the current
      print(visiting.val);
      // push all the child of visiting to queue
      queue.push(...visiting.children);
    }
  };
});

/**
 * ! Tree Traversals
 */

/**
 * * Binary Heap Definition
 */
(function() {
  const BinaryHeap = function() {
    this.values = [];
  };

  BinaryHeap.prototype.peek = function() {
    if (this.values) return this.values[0];
    return null;
  };

  BinaryHeap.prototype.insert = function(val) {
    this.values.push(val);
    const heapify = function() {
      let index = this.values.length;
      let parent = Math.floor(index / 2);
      while (parent > 0 && this.values[index - 1] < this.values[parent - 1]) {
        // Swap index with parent
        print(index - 1, parent - 1);
        let temp = this.values[parent - 1];
        this.values[parent - 1] = this.values[index - 1];
        this.values[index - 1] = temp;
        print(this.values);

        index = parent;
        parent = Math.floor(index / 2);
      }
    };
    heapify.apply(this);
  };

  BinaryHeap.prototype.extractMin = function() {
    if (this.values.length === 0) return null;
    if (this.values.length === 1) {
      let temp = this.values[0];
      this.values = [];
      return temp;
    }
    const temp = this.values[0];
    this.values[0] = this.values.pop();

    const heapify = function() {
      let index = 1;
      let [left, right] = [index * 2, index * 2 + 1];
      let child = left;
      if (this.values[right - 1] < this.values[left - 1]) child = right;
      index -= 1;
      child -= 1;
      while (
        child < this.values.length &&
        this.values[child] < this.values[index]
      ) {
        // Swap index with child
        let temp = this.values[index];
        this.values[index] = this.values[child];
        this.values[child] = temp;
        index = child + 1;
        [left, right] = [index * 2, index * 2 + 1];
        child = left;
        if (this.values[right - 1] < this.values[left - 1]) child = right;
        index -= 1;
        child -= 1;
      }
    };

    heapify.apply(this);
    return temp;
  };
});

/**
 * ! Binary Heap Definiton
 */

/**
 * * Binary Search Tree Definition
 * insert(), size, clear(), find(), getHeight()
 * getMin(), getMax(), isBinary(), remove()
 */
(function() {
  const BST = function() {
    this.root = null;
    this.size = 0;
  };

  const BSTNode = function(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  };

  BSTNode.prototype.insert = function(val) {
    if (this.val > val) {
      // Go to left
      if (!this.left) this.left = new BSTNode(val);
      else this.left.insert(val);
    } else {
      if (!this.right) this.right = new BSTNode(val);
      else this.right.insert(val);
    }
  };

  BSTNode.prototype.find = function(val) {
    if (this.val === val) return this;
    if (this.val > val && this.left) return this.left.find(val);
    else if (this.val < val && this.right) return this.right.find(val);
    else return false;
  };

  BSTNode.prototype.getHeight = function() {
    let leftHeight, rightHeight;
    if (this.left) leftHeight = this.left.getHeight();
    else leftHeight = 0;
    if (this.right) rightHeight = this.right.getHeight();
    else rightHeight = 0;
    let height = Math.max(leftHeight, rightHeight);
    return height + 1;
  };

  BSTNode.prototype.getMax = function() {
    if (this.right) return this.right.getMax();
    return this.val;
  };

  BSTNode.prototype.getMin = function() {
    if (this.left) return this.left.getMin();
    return this.val;
  };

  BSTNode.prototype.successor = function() {
    if (!this.right) return null;
    return this.right.getMin();
  };

  BST.prototype.insert = function(val) {
    this.size += 1;
    if (!this.root) {
      this.root = new BSTNode(val);
      return;
    }
    this.root.insert(val);
  };

  BST.prototype.find = function(val) {
    if (!this.root) return false;
    return !!this.root.find(val);
  };

  BST.prototype.getHeight = function() {
    if (!this.root) return 0;
    return this.root.getHeight();
  };

  BST.prototype.getMax = function() {
    if (!this.root) return null;
    return this.root.getMax();
  };
  BST.prototype.getMin = function() {
    if (!this.root) return null;
    return this.root.getMin();
  };

  BST.prototype.clear = function() {
    this.root = null;
  };

  const inOrderTraversal = function(root) {
    if (!root) return;
    inOrderTraversal(root.left);
    print(root.val);
    inOrderTraversal(root.right);
  };

  // TODO: remove()
  // TODO: isBinary()
});

/**
 * * Binary Search on sorted Array
 */
(function() {
  let sortedArr = [1, 3, 5, 6, 7, 9, 12, 15, 20, 22];
  sortedArr.push(...[23, 25, 28, 29, 35, 43, 47, 50, 55]);

  const binarySearch = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let m = Math.floor((left + right) / 2); // get middle
      if (nums[m] < target) left = m + 1;
      else if (nums[m] > target) right = m - 1;
      else return m;
    }
    return null;
  };
})();

/**
 * ! Binary Search Tree Definition
 */
