class ListNode<T> {
  value: T;
  previous: ListNode<T> | null = null;
  next: ListNode<T> | null = null;
  constructor(
    value: T,
    previous: ListNode<T> | null = null,
    next: ListNode<T> | null = null,
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

/**
 * Linked List
 *
 * A doubly linked list mimicking the interface of JavaScript array
 *
 * ```typescript
 * import { LinkedList } from "@figliolia/data-structures";
 *
 * const list = new LinkedList<number>();
 * list.push(1);
 * list.push(2);
 * list.push(3);
 * for(const item of list) {
 *   console.log(item); // 1, 2, 3
 * }
 * list.pop(); // 3 -> O(1)
 * list.shift() // 1 -> O(1)
 * list.push(3) // O(1)
 * list.unshift(1) // O(1)
 * ```
 */
export class LinkedList<T> {
  size = 0;
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  constructor(...items: T[]) {
    for (const item of items) {
      this.push(item);
    }
  }

  public push(item: T) {
    this.size++;
    const node = new ListNode(item);
    if (!this.head && !this.tail) {
      this.head = node;
      this.tail = node;
      return this.size;
    }
    if (!this.head) {
      throw new Error("Missing head");
    }
    if (this.head === this.tail) {
      this.head.next = node;
      this.tail = node;
      this.tail.previous = this.head;
      return this.size;
    }
    if (!this.tail) {
      throw new Error("Missing tail");
    }
    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;
    return this.size;
  }

  public unshift(item: T) {
    this.size++;
    const node = new ListNode(item);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this.size;
    }
    if (this.head === this.tail) {
      this.tail.previous = node;
      node.next = this.tail;
      this.head = node;
      return this.size;
    }
    this.head.previous = node;
    node.next = this.head;
    this.head = node;
  }

  public shift() {
    if (!this.head) {
      return;
    }
    this.size--;
    const node = this.head;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return node.value;
    }
    this.head = node.next;
    this.head!.previous = null;
    return node.value;
  }

  public pop() {
    if (!this.tail) {
      return;
    }
    this.size--;
    const node = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return node.value;
    }
    this.tail = node.previous!;
    this.tail.next = null;
    return node.value;
  }

  public peekLeft() {
    return this.head?.value;
  }

  public peekRight() {
    return this.tail?.value;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
