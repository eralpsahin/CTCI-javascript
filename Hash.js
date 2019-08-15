const print = console.log;

// HASH CHAPTER

/**
 * * Hash Definition
 */

const isPrime = function(num) {
  const square = Math.ceil(Math.sqrt(num));
  for (let i = 0; i < square; i += 1) if (num % i === 0) return true;
  return false;
};

const createNextPrime = function(num) {
  num += num % 2;
  while (!isPrime(num)) num += 2;
  return num;
};

const hashKey = function(key, size) {
  let res = 0;
  for (let index = 0; index < key.length; index += 1) {
    res += key.charCodeAt(index);
  }
  return res % size;
};

const Hash = function() {
  this.arr = new Array(53);
  this.currentSize = 0;
  this.makeEmpty();
};

Hash.prototype.makeEmpty = function() {
  for (let index = 0; index < this.arr.length; index += 1) {
    this.arr[index] = { status: 0 };
  }
  this.currentSize = 0;
};

Hash.prototype.add = function(key, value) {
  let current = this.getIndex(key);
  if (this.arr[current].status == 1) {
    this.arr[current].value = value;
    return;
  }
  this.arr[current] = { key, value, status: 1 };
  this.currentSize += 1;
  this.rehash();
};

Hash.prototype.remove = function(key) {
  const current = this.getIndex(key);
  if (this.arr[current].status == 1) this.arr[current].status = 2;
};

Hash.prototype.getIndex = function(key) {
  let collision = 0;
  let current = hashKey(key, this.arr.length);
  while (this.arr[current].status != 0 && this.arr[current].key != key) {
    current += 2 * ++collision - 1;
    if (current >= this.arr.length) current -= this.arr.length;
  }
  return current;
};

Hash.prototype.get = function(key) {
  let current = this.getIndex(key);
  if (this.arr[current].status != 1) return undefined;
  return this.arr[current].value;
};

Hash.prototype.rehash = function() {
  if (this.currentSize < this.arr.length / 1.2) return;
  const old = this.arr;
  this.arr = new Array(createNextPrime(2 * old.length));
  this.makeEmpty();
  for (let index = 0; index < old.length; index++) {
    if (old[index].status == 1) this.add(old[index].key, old[index].value);
  }
};

/**
 * ! Hash Definition
 */
