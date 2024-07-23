/**
 * Stack
 *
 * A basic stack with push, pop and peek methods
 *
 * ```typescript
 * import { Stack } from "@figliolia/data-structures";
 *
 * const stack = new Stack<number>();
 * stack.push(1);
 * stack.push(2);
 * stack.push(3);
 * stack.peek(); // 3
 * stack.pop(); // 3
 * ```
 */
export class Stack<T> extends Array<T> {
  /**
   * Peek
   *
   * Returns a reference to the first element in the stack
   */
  public peek() {
    return this[this.length - 1];
  }
}
