/**
 * Min Max Stack
 *
 * The base construct for the MinStack and MaxStack utilities
 */
export abstract class MinMaxStack<T> {
  public readonly storage: T[] = [];
  protected occurances = 0;
  private readonly valueExtractor: (value: T) => number;
  constructor(valueExtractor: (value: T) => number) {
    this.valueExtractor = valueExtractor;
  }

  /**
   * Push
   *
   * Adds a new value to the stack
   */
  public push(val: T) {
    this.storage.push(val);
    this.setMinMax(val);
  }

  /**
   * Pop
   *
   * Removes the most recently added value from the stack
   */
  public pop() {
    const val = this.storage.pop();
    if (val === undefined) {
      return;
    }
    this.findMinMax(val);
    return val;
  }

  /**
   * Peek
   *
   * Returns the most recently added value from the stack
   */
  public peek() {
    return this.storage[this.storage.length - 1];
  }

  /**
   * Length
   *
   * Returns the number of items in the stack
   */
  public get length() {
    return this.storage.length;
  }

  protected abstract findMinMax(value: T): void;

  protected abstract setMinMax(value: T): void;

  protected extract(value: T) {
    if (typeof value === "number") {
      return value;
    }
    return this.valueExtractor(value);
  }

  *[Symbol.iterator]() {
    for (const item of this.storage) {
      yield item;
    }
  }
}
