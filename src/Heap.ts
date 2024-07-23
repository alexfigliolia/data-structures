/**
 * Heap
 *
 * The base construct of the MinHeap and MaxHeap utilities
 */
export abstract class Heap<T> {
  readonly storage: T[] = [];
  private valueExtractor: (value: T) => number;
  constructor(valueExtractor: (value: T) => number) {
    this.valueExtractor = valueExtractor;
  }

  /**
   * Push
   *
   * Adds an element to the heap and positions it correctly
   */
  public push(value: T) {
    this.storage.push(value);
    let curr = this.length - 1;
    while (curr > 0) {
      const parent = (curr - 1) >>> 1;
      if (this.comparer(curr, parent)) {
        break;
      }
      this.swap(curr, parent);
      curr = parent;
    }
  }

  /**
   * Pop
   *
   * Removes the last element in the heap
   */
  public pop() {
    const N = this.length - 1;
    this.swap(0, N);
    const value = this.storage.pop();
    let curr = 0;
    let left = 0;
    while ((left = 2 * curr + 1) < this.length) {
      const minChildIndex = this.nextChild(left, left + 1);
      if (this.comparer(minChildIndex, curr)) {
        break;
      }
      this.swap(minChildIndex, curr);
      curr = minChildIndex;
    }
    return value;
  }
  public get length() {
    return this.storage.length;
  }

  private swap(index1: number, index2: number) {
    [this.storage[index1], this.storage[index2]] = [
      this.storage[index2],
      this.storage[index1],
    ];
  }

  protected extract(value: T) {
    if (typeof value === "number") {
      return value;
    }
    return this.valueExtractor(value);
  }

  protected abstract comparer(index1: number, index2: number): boolean;

  protected abstract nextChild(left: number, right: number): number;
}
