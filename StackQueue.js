const print = console.log;

// * STACKS AND QUEUES CHAPTER

/**
 * ? Stack Definition
 */

function StackNode(val, next = null) {
  this.val = val;
  this.next = next;
}

const QueueNode = StackNode;

const Stack = function() {
  this.top = null;
  this.size = 0;
};

Stack.prototype.push = function(val) {
  if (!this.top) {
    this.top = new StackNode(val);
  } else {
    this.top = new StackNode(val, this.top);
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
  return this.size === 0;
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

Queue.prototype.enqueue = function(val) {
  if (!this.top) {
    this.top = new QueueNode(val);
    this.tail = this.top;
  } else {
    this.tail.next = new QueueNode(val);
    this.tail = this.tail.next;
  }
  this.size += 1;
};

Queue.prototype.dequeue = function() {
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
  return this.size === 0;
};

/**
 * ! Queue Definition
 */

/**
 * ? Ring Buffer Definition
 */

const Ring = function() {
  this.buffer = new Array(10);
  this.addIndex = 0;
  this.removeIndex = 0;
};

Ring.prototype.add = function(val) {
  this.buffer[this.addIndex] = val;
  if (this.addIndex === this.removeIndex) {
    this.removeIndex += 1;
    this.removeIndex %= 10;
  }
  this.addIndex += 1;
  this.addIndex %= 10;
};

Ring.prototype.remove = function() {
  if (this.buffer[this.removeIndex] === null) return null;
  const temp = this.buffer[this.removeIndex];
  this.buffer[this.removeIndex] = null;
  this.removeIndex += 1;
  this.removeIndex %= 10;
  return temp;
};

/**
 * ! Ring Buffer Definition
 */

/**
 * ? Deque Definition
 */

const Deque = function() {
  this.head = null;
  this.tail = null;
  this.size = 0;
};
const DequeNode = function(val, next = null, prev = null) {
  this.val = val;
  this.next = next;
  this.prev = prev;
};

Deque.prototype.insert = function(val) {
  if (this.head === null) {
    this.head = new DequeNode(val);
    this.tail = this.head;
  } else this.head = new DequeNode(val, this.head);
  this.size += 1;
};

Deque.prototype.push = function(val) {
  if (this.head === null) {
    this.head = new DequeNode(val);
    this.tail = this.head;
  } else {
    this.tail.next = new DequeNode(val, null, this.tail);
    this.tail = this.tail.next;
  }
  this.size += 1;
};

Deque.prototype.pop = function() {
  if (this.tail === null) return null;
  const temp = this.tail.val;
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = this.tail.prev;
    this.tail.next = null;
  }
  this.size -= 1;
  return temp;
};

Deque.prototype.shift = function() {
  if (this.head === null) return null;
  const temp = this.head.val;
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
    this.head.prev = null;
  }
  this.size -= 1;
  return temp;
};

/**
 * ! Deque Definition
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

/**
 * * Question 3.5 Sort non-empty Stack
 */

(function() {
  // Using a temp stack, we will sort the elements
  // one by one
  Stack.prototype.sort = function() {
    if (!this.top) return; // empty check

    const tempStack = new Stack();
    let top = this.pop();

    // fill the temp stack
    while (!this.empty()) {
      tempStack.push(this.pop());
    }
    // Stack with single element is sorted
    this.push(top);

    // Push top of tempStack to the correct layer
    // Until it is empty
    while (!tempStack.empty()) {
      let top = tempStack.pop();
      // transfer greater than top values to the temp
      let count = 0;
      while (this.peek() > top) {
        tempStack.push(this.pop());
        count += 1;
      }
      // Push the top we are locating
      this.push(top);

      // Push the above layers back
      for (let i = 0; i < count; i += 1) {
        this.push(tempStack.pop());
      }
    }
  };
});

/**
 * ! Question 3.5
 */

/**
 * * Question 3.6 Animal Shelter
 */

(function() {
  const AnimalShelter = function() {
    this.shelter = {
      dogs: new Queue(),
      cats: new Queue()
    };
  };
  AnimalShelter.prototype.enqueue = function(animal) {
    this.shelter[animal].enqueue(Date.now());
  };
  AnimalShelter.prototype.dequeue = function(animal = null) {
    if (animal) {
      return this.shelter[animal].dequeue();
    }
    if (this.shelter.dogs.empty()) return this.shelter.cats.dequeue();
    if (this.shelter.cats.empty()) return this.shelter.dogs.dequeue();

    let oldestDog = this.shelter.dogs.peek();
    let oldestCat = this.shelter.cats.peek();
    if (oldestDog <= oldestCat) {
      return this.shelter.dogs.dequeue();
    } else return this.shelter.cats.dequeue();
  };

  // ? Tests
  const shelter = new AnimalShelter();
  shelter.enqueue('dogs');
  shelter.enqueue('dogs');
  shelter.enqueue('cats');
  shelter.enqueue('cats');
  shelter.enqueue('dogs');
  shelter.dequeue();
  shelter.dequeue();
  shelter.dequeue();
  shelter.dequeue('cats');
})();

/**
 * ! Question 3.6
 */
