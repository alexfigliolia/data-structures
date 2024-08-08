import { AutoIncrementingID } from "@figliolia/event-emitter";

/**
 * Quick List
 *
 * The base construct for `QuickStacks` and `QuickQueues`,
 * designed to mimick Array-like interfaces while providing
 * access to and deletions of items at O(1)
 */
export abstract class QuickList<T> {
  public storage = new Map<string, T>();
  private IDs = new AutoIncrementingID();

  /**
   * Push
   *
   * Adds a new item onto the stack, returns a unique
   * ID for the item
   */
  public push(item: T) {
    const ID = this.IDs.get();
    this.storage.set(ID, item);
    return ID;
  }

  /**
   * Length
   *
   * Returns the total number of items on the stack
   */
  public get length() {
    return this.storage.size;
  }

  /**
   * Is Empty
   *
   * Returns true if the list contains no items
   */
  public get isEmpty() {
    return this.storage.size === 0;
  }

  /**
   * Get
   *
   * Returns an item on the stack by unique ID
   */
  public get(ID: string) {
    return this.storage.get(ID);
  }

  /**
   * Delete
   *
   * Removes an entry from the stack by unique ID
   */
  public delete(ID: string) {
    return this.storage.delete(ID);
  }

  /**
   * Clear
   *
   * Removes all items from the queue
   */
  public clear() {
    return this.storage.clear();
  }

  public abstract peek(): [ID: string, item: T] | undefined;
}
