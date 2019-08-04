const print = console.log;

// * STACKS AND QUEUES CHAPTER

/**
 * ? Stack Definition
 */

function Node(val, next = null) {
  this.val = val;
  this.next = next;
}

const Stack = function() {
  this.top = null;
  this.size = 0;
};

Stack.prototype.push = function(val) {
  if (!this.top) {
    this.top = new Node(val);
  } else {
    this.top = new Node(val, this.top);
  }
  this.size += 1;
};

Stack.prototype.pop = function() {
  if (!this.top) return null;
  const temp = this.top;
  this.top = this.top.next;
  this.size -= 1;
  return temp.val;
};

Stack.prototype.peek = function() {
  if (this.top) return this.top.val;
  return null;
};

Stack.prototype.empty = function() {
  return this.top === null;
};

/**
 * ! Stack Definition
 */

/**
 * ? Queue Definition
 */

const Queue = function() {
  this.top = null;
  this.tail = null;
  this.size = 0;
};

Queue.prototype.add = function(val) {
  if (!this.top) {
    this.top = new Node(val);
    this.tail = this.top;
  } else {
    this.tail.next = new Node(val);
    this.tail = this.tail.next;
  }
  this.size += 1;
};

Queue.prototype.remove = function() {
  if (!this.top) return;
  const temp = this.top;
  this.top = this.top.next;
  this.size -= 1;
  return temp.val;
};

Queue.prototype.peek = function() {
  if (this.top) return this.top.val;
  return null;
};

Queue.prototype.empty = function() {
  return this.top === null;
};

/**
 * ! Queue Definition
 */

/**
 * * Question 3.2 Stack Min
 */

(function() {
  const MinStack = function() {
    this.top = null;
    this.size = 0;
  };

  function minNode(val, min, next = null) {
    this.val = val;
    this.min = min;
    this.next = next;
  }

  MinStack.prototype.push = function(val) {
    if (!this.top) {
      this.top = new minNode(val, val);
    } else {
      let min = this.min();
      min = Math.min(val, min);
      this.top = new minNode(val, min, this.top);
    }
    this.size += 1;
  };

  MinStack.prototype.pop = function() {
    if (!this.top) return null;
    const temp = this.top;
    this.top = this.top.next;
    this.size -= 1;
    return temp.val;
  };

  MinStack.prototype.min = function() {
    return this.top.min;
  };
});

/**
 * ! Question 3.2
 */

/**
 * * Question 3.3 Stack of Plates
 */

(function() {});

/**
 * ! Question 3.3
 */

/**
 * * Question 3.4 Queue via Stacks
 */

(function() {
  const QueueWithStack = function() {
    this.left = new Stack();
    this.right = new Stack();
  };
  QueueWithStack.prototype.add = function(val) {
    this.left.push(val);
  };
  QueueWithStack.prototype.remove = function() {
    if (!this.right.empty()) return this.right.pop();
    if (this.left.empty()) return null;
    while (!this.left.empty()) {
      let temp = this.left.pop();
      this.right.push(temp);
    }
    return this.right.pop();
  };
});

/**
 * ! Question 3.4
 */