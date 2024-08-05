import { AutoIncrementingID } from "@figliolia/event-emitter";

/**
 * Quick Stack
 *
 * A stack-like structure supporting O(1) indexing and
 * retrievals
 *
 * ```typescript
 * const stack = new QuickStack<() => void>();
 * const uniqueID = stack.push(() => {});
 *
 * const FN = stack.pop() // Remove and return the last entry on the stack
 * const FN = stack.get(uniqueID); // Get an entry by ID
 * stack.delete(uniqueID) // Delete an entry by ID
 * ```
 */
export class QuickStack<T> {
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
   * Get
   *
   * Returns an item on the stack by unique ID
   */
  public get(ID: string) {
    return this.storage.get(ID);
  }

  /**
   * Pop
   *
   * Removes and returns the last entry int he stack
   */
  public pop() {
    const last = Array.from(this.storage.keys()).pop();
    if (!last) {
      return;
    }
    const item = this.storage.get(last);
    this.delete(last);
    return item;
  }

  /**
   * Delete
   *
   * Removes an entry from the stack by unique ID
   */
  public delete(ID: string) {
    return this.storage.delete(ID);
  }
}
