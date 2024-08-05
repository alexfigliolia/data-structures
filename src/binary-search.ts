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
 * binarySearch(
 *   [ // list
 *     { id: 1, name: "Jeff" },
 *     { id: 2, name: "Steve" },
 *     { id: 3, name: "Dave" },
 *     { id: 4, name: "Alex" },
 *   ],
 *   { id: 3, name: "Dave" }, // target
 *   item => item.id // extractor
 * ) // true
 * ```
 */
export function binarySearch(list: number[], target: number): boolean;
export function binarySearch<T>(
  list: T[],
  target: T,
  extractor?: (currentItem: T) => number,
): boolean;
export function binarySearch<T>(
  list: T[],
  target: T,
  extractor?: (currentItem: T) => number,
) {
  let l = 0;
  let r = list.length - 1;
  let targetValue: number;
  if (typeof target === "number") {
    targetValue = target;
  } else {
    targetValue = extractor!(target);
  }
  while (l <= r) {
    const p = (l + r) >>> 1;
    const mid = list[p];
    let comparer: number;
    if (typeof mid === "number") {
      comparer = mid;
    } else {
      comparer = extractor!(mid);
    }
    const diff = targetValue - comparer;
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
