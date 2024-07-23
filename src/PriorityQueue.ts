/**
 * Priority Queue
 *
 * A bucket queue that sorts elements based on the priority level specified
 *
 * ```typescript
 * import { PriorityQueue } from "@figliolia/data-structures";
 *
 * const queue = new PriorityQueue<number>();
 * queue.push(1, 3);
 * queue.push(2, 2);
 * queue.push(3, 1);
 * queue.length // 3
 * // queue = [[3], [2], [1]]
 * while(!queue.isEmpty) {
 *   queue.pop() // 1, 2, 3
 * }
 * ```
 */
export class PriorityQueue<T> {
  readonly buckets: T[][] = [];
  readonly maxPriority: number;
  private readonly priorities: Record<number, true> = {};
  constructor(max = Infinity) {
    this.maxPriority = max;
  }

  /**
   * Push
   *
   * Adds a new element to the queue at the specified priority level
   */
  public push(priority: number, value: T) {
    if (priority > this.maxPriority) {
      throw new RangeError("Max Priority exceeded");
    }
    const bucket = this.buckets[priority] || [];
    bucket.push(value);
    this.buckets[priority] = bucket;
    this.priorities[priority] = true;
  }

  /**
   * Pop
   *
   * Removes the last element added to the highest available priority
   */
  public pop() {
    for (const [p, bucket] of this) {
      const item = bucket.pop();
      if (!bucket.length) {
        delete this.priorities[p];
        return item;
      }
    }
  }

  /**
   * Poll
   *
   * Returns a reference to the last element added to the highest available priority
   */
  public poll() {
    for (const [_, bucket] of this) {
      return bucket[bucket.length - 1];
    }
  }

  /**
   * Length
   *
   * Returns the total number of items in the queue
   */
  public get length() {
    let length = 0;
    for (const [_, bucket] of this) {
      length += bucket.length;
    }
    return length;
  }

  /**
   * Is Empty
   *
   * Returns true if the queue contains no items
   */
  public get isEmpty() {
    for (const _ of this) {
      return false;
    }
    return true;
  }

  *[Symbol.iterator](): Generator<[priority: number, bucket: T[]]> {
    const keys = Object.keys(this.priorities);
    const { length } = keys;
    for (let i = length - 1; i > -1; i--) {
      const key = parseInt(keys[i]);
      const bucket = this.buckets[key];
      if (bucket && bucket.length) {
        yield [key, bucket];
      }
    }
  }
}
