import { QuickList } from "./QuickList";

/**
 * Quick Stack
 *
 * A wrapper around the native Map that assigns an
 * auto-incrementing ID to each value added. It provides
 * a Stack-like interface with the ability to access and
 * remove items in 0(1) time
 *
 * ```typescript
 * const stack = new QuickStack<() => void>();
 * const uniqueID = stack.push(() => {});
 *
 * const FN = stack.pop() // Remove and return the first item on the stack
 * const FN = stack.get(uniqueID); // Get an entry by ID
 * stack.delete(uniqueID) // Delete an entry by ID
 * ```
 */
export class QuickStack<T> extends QuickList<T> {
  /**
   * Pop
   *
   * Removes and returns the top entry in the stack
   */
  public pop() {
    return this.withTop(ID => {
      const item = this.storage.get(ID);
      this.delete(ID);
      return item;
    });
  }

  /**
   * Peek
   *
   * Returns the top entry in the stack
   */
  public peek(): [ID: string, item: T] | undefined {
    return this.withTop(ID => {
      return [ID, this.storage.get(ID) as T] as const;
    });
  }

  private withTop<U>(fn: (ID: string) => U) {
    const top = Array.from(this.storage.keys()).pop();
    if (top) {
      return fn(top);
    }
  }
}
