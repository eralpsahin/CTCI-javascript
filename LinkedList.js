const print = console.log;

// * LINKED LIST CHAPTER

/**
 * ? Linked List Definition
 */
function ListNode(val) {
  this.next = null;
  this.val = val;
}

function createLinkedList(array) {
  if (array.length <= 0)
    return {
      head: null,
      tail: null
    };
  const head = new ListNode(array[0]);
  let tail = head;
  for (let i = 1; i < array.length; i += 1) {
    tail.next = new ListNode(array[i]);
    tail = tail.next;
  }
  return {
    head,
    tail
  };
}

function printList(head) {
  let temp = head;
  let stream = '';
  while (temp !== null) {
    stream += temp.val;
    if (temp.next) stream += '->';
    temp = temp.next;
  }
  print(stream);
}
/**
 * ! Linked List Definition
 */

/**
 * * Question 2.4 Partition
 */

(function() {
  const { head } = createLinkedList([3, 5, 8, 5, 10, 2, 1]);

  function SeparateList(list, partitionVal) {
    if (!list) return;
    let left = new ListNode(0);
    let leftHead = left;
    let right = new ListNode(0);
    let rightHead = right;
    let temp = list;
    while (temp) {
      if (temp.val < partitionVal) {
        left.next = new ListNode(temp.val);
        left = left.next;
      } else {
        right.next = new ListNode(temp.val);
        right = right.next;
      }
      temp = temp.next;
    }
    rightHead = rightHead.next;
    leftHead = leftHead.next;
    left.next = rightHead;
    printList(leftHead);
  }
  // ? Tests
  SeparateList(head, 5);
  // ?
});

/**
 * ! Question 2.4
 */

/**
 * * Question 2.5 Sum Lists
 */

(function() {
  const LIST1 = createLinkedList([7, 1, 8, 4, 3]).head;
  const LIST2 = createLinkedList([]).head;

  function reverseAddition(list1, list2) {
    let carry = 0;
    let res = null;
    let head = res;
    let iter1 = list1;
    let iter2 = list2;
    while (iter1 !== null || iter2 !== null) {
      const num1 = iter1 ? iter1.val : 0;
      const num2 = iter2 ? iter2.val : 0;
      let digit = num1 + num2 + carry;
      carry = digit >= 10 ? 1 : 0;
      digit %= 10;
      if (!res) {
        res = new ListNode(digit);
        head = res;
      } else {
        res.next = new ListNode(digit);
        res = res.next;
      }
      if (iter1) iter1 = iter1.next;
      if (iter2) iter2 = iter2.next;
    }
    if (carry) res.next = new ListNode(1);
    return head;
  }
  // ? Tests
  const result = reverseAddition(LIST1, LIST2);
  printList(result);
  // ?
});

/**
 * ! Question 2.5
 */

/**
 * * Question 2.6 Plaindrome
 */

(function() {
  const LIST1 = createLinkedList([1, 2, 3, 3, 2, 1]).head;
  const LIST2 = createLinkedList([1, 2, 3, 2, 1]).head;
  const LIST3 = createLinkedList([1, 2, 3]).head;
  let head;
  let res;
  const recurse = function(list) {
    if (!list) return;
    if (!list.next) {
      if (head.val !== list.val) {
        res = false;
      }
      head = head.next;
    } else {
      recurse(list.next);
      if (head.val !== list.val) {
        res = false;
      }
      head = head.next;
    }
  };

  // ? Tests
  res = true;
  head = LIST2;
  recurse(LIST2);
  print(res);

  res = true;
  head = LIST1;
  recurse(LIST1);
  print(res);

  res = true;
  head = LIST3;
  recurse(LIST3);
  print(res);
  // ?
});

/**
 * ! Question 2.6
 */

/**
 * * Question 2.7 Intersection
 */
(function() {
  // * Creating the intersectioned lists
  const list1 = createLinkedList([1, 2, 3]);
  list1.tail.next = new ListNode(10);
  list1.tail.next.next = new ListNode(20);
  list1.tail.next.next.next = new ListNode(30);
  const list2 = createLinkedList([2, 7]);
  list2.tail.next = list1.tail.next;
  // *

  // Calculate size to use in intersection.
  const getSize = list => {
    let temp = list;
    let count = 0;
    while (temp) {
      count += 1;
      temp = temp.next;
    }
    return count;
  };

  const checkIntersection = (list1, list2) => {
    let list1Count = getSize(list1.head);
    let list2Count = getSize(list2.head);

    while (list1Count > list2Count) {
      list1Count -= 1;
      list1.head = list1.head.next;
    }
    while (list2Count > list1Count) {
      list2Count -= 1;
      list2.head = list2.head.next;
    }

    let same = false;
    while (!same && list1.head != null) {
      if (list1.head === list2.head) {
        same = true;
      } else {
        list1.head = list1.head.next;
        list2.head = list2.head.next;
      }
    }
    return same;
  };
  print(checkIntersection(list1, list2));
  print(checkIntersection(list2, list1));

  print(checkIntersection(list2, createLinkedList([])));
  print(checkIntersection(list1, createLinkedList([1, 2, 3, 10, 20, 30])));
});
/**
 * ! Question 2.7
 */

/**
 * * Question 2.8 Loop Detection
 */
(function() {
  const list = createLinkedList([1, 2, 3]);
  let { tail } = list;
  tail.next = new ListNode(10);
  tail = tail.next;

  tail.next = new ListNode(15);
  tail = tail.next;

  tail.next = new ListNode(12);
  tail = tail.next;

  tail.next = new ListNode(14);
  tail = tail.next;

  tail.next = new ListNode(11);
  tail = tail.next;
  printList(list.head);

  tail.next = list.tail;
  /**
   * 1->2->3->10
   *       |   |
   *      11  15
   *       |   |
   *      14<-12
   */

  const isCircular = list => {
    let slow = list.head;
    let fast = list.head;
    try {
      do {
        slow = slow.next;
        fast = fast.next.next;
      } while (slow !== fast);
      // Current distance to beginning is same as head to beginning
      slow = list.head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    } catch (e) {
      throw new Error('List is not circular');
    }
  };
  print(isCircular(list));
});

/**
 * ! Question 2.8
 */
