/**
 * Binary Search
 *
 * A log(N) search for sorted lists
 *
 * ```typescript
 * import { binarySearch } from "@figliolia/data-structures";
 *
 * binarySearch([1, 2, 3, 4], 3) // true
 * binarySearch([1, 2, 3, 4], 5) // false
 *
 * const target = { id: 3, name: "Dave" };
 * binarySearch(
 *   [ // list
 *     { id: 1, name: "Jeff" },
 *     { id: 2, name: "Steve" },
 *     { id: 3, name: "Dave" },
 *     { id: 4, name: "Alex" },
 *   ],
 *   3, // target
 *   (item => item.id) // extractor
 * ) // true
 * ```
 */
export function binarySearch(list: number[], target: number): boolean;
export function binarySearch<T>(
  list: T[],
  target: number,
  extractor?: (currentItem: T) => number,
): boolean;
export function binarySearch<T>(
  list: T[],
  target: number,
  extractor?: (currentItem: T) => number,
) {
  let l = 0;
  let r = list.length - 1;
  while (l <= r) {
    const p = (l + r) >>> 1;
    const mid = list[p];
    let comparer: number;
    if (typeof mid === "number") {
      comparer = mid;
    } else {
      comparer = extractor!(mid);
    }
    const diff = target - comparer;
    if (diff === 0) {
      return true;
    }
    if (diff < 0) {
      r = p - 1;
    } else {
      l = p + 1;
    }
  }
  return false;
}
