/**
 * Queue
 *
 * A basic queue with enqueue, dequeue and peek methods
 *
 * ```typescript
 * import { Queue } from "@figliolia/data-structures";
 *
 * const queue = new Queue<number>();
 * queue.enqueue(1);
 * queue.enqueue(2);
 * queue.enqueue(3);
 * queue.peek(); // 1
 * queue.dequeue(); // 1
 * ```
 */
export class Queue<T> extends Array<T> {
  /**
   * Peek
   *
   * Returns a reference to the first element in the queue
   */
  public peek() {
    return this[0];
  }

  /**
   * Enqueue
   *
   * Adds an element to the end of the queue
   */
  public enqueue(item: T) {
    return super.push(item);
  }

  /**
   * Dequeue
   *
   * Removes the first element in the queue
   */
  public dequeue() {
    return super.shift();
  }
}
