import { QuickList } from "./QuickList";

/**
 * Quick Queue
 *
 * A wrapper around the native Map that assigns an
 * auto-incrementing ID to each value added. It provides
 * a Queue-like interface with the ability to access and
 * remove items in 0(1) time
 *
 * ```typescript
 * const queue = new QuickQueue<() => void>();
 * const uniqueID = queue.enqueue(() => {});
 *
 * const FN = queue.dequeue() // Remove and return the first item on the queue
 * const FN = queue.get(uniqueID); // Get an item by ID
 * queue.delete(uniqueID) // Delete an item by ID
 * ```
 */
export class QuickQueue<T> extends QuickList<T> {
  /**
   * Enqueue
   *
   * Adds an item to the queue and returns it's
   * unique ID
   */
  public enqueue(item: T) {
    return super.push(item);
  }

  /**
   * Dequeue
   *
   * Removes the first item from the Bucket and
   * returns it
   */
  public dequeue() {
    for (const [ID, item] of this.storage) {
      this.storage.delete(ID);
      return item;
    }
  }

  /**
   * Peek
   *
   * Returns the first item from the Bucket or undefined
   * if the queue is empty
   */
  public peek() {
    for (const entry of this.storage) {
      return entry;
    }
  }
}
