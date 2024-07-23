import { Heap } from "./Heap";

/**
 * Min Heap
 *
 * A heap that remains sorted ascendingly
 *
 * ```typescript
 * import { MinHeap } from "@figliolia/data-structures";
 *
 * const heap = new MinHeap<number>(value => value);
 * heap.push(1);
 * heap.push(2);
 * heap.push(3);
 * heap.pop() // 1
 *
 * const complexHeap = new MinHeap<{ id: number, name: string }>(
 *   value => value.id // numeric value extractor
 * );
 * complexHeap.push({ id: 1, name: "Jeff" });
 * complexHeap.push({ id: 2, name: "Steve" });
 * complexHeap.push({ id: 3, name: "Dave" });
 * complexHeap.pop() // { id: 1, name: "Jeff" }
 * ```
 */
export class MinHeap<T> extends Heap<T> {
  protected nextChild(left: number, right: number) {
    return right < this.length &&
      this.extract(this.storage[right]) < this.extract(this.storage[left])
      ? right
      : left;
  }

  protected comparer(index1: number, index2: number) {
    return (
      this.extract(this.storage[index1]) >= this.extract(this.storage[index2])
    );
  }
}
