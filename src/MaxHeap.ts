import { Heap } from "./Heap";

/**
 * Max Heap
 *
 * A heap that remains sorted descendingly
 *
 * ```typescript
 * import { MaxHeap } from "@figliolia/data-structures";
 *
 * const heap = new MaxHeap<number>(value => value);
 * heap.push(3);
 * heap.push(2);
 * heap.push(1);
 * heap.pop() // 3
 *
 * const complexDataHeap = new MaxHeap<{ id: number, name: string }>(value => value.id);
 * complexDataHeap.push({ id: 3, name: "Jeff" });
 * complexDataHeap.push({ id: 2, name: "Steve" });
 * complexDataHeap.push({ id: 1, name: "Dave" });
 * complexDataHeap.pop() // { id: 3, name: "Jeff" }
 * ```
 */
export class MaxHeap<T> extends Heap<T> {
  protected nextChild(left: number, right: number) {
    return right < this.length &&
      this.extract(this.storage[right]) > this.extract(this.storage[left])
      ? right
      : left;
  }

  protected comparer(index1: number, index2: number) {
    return (
      this.extract(this.storage[index1]) <= this.extract(this.storage[index2])
    );
  }
}
