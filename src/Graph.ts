import { LinkedList } from "./LinkedList";
import { Stack } from "./Stack";

/**
 * Graph
 *
 * A generic graph construct for string and number values
 *
 * ```typescript
 * import { Graph, NodeCache } from "@figliolia/data-structures";
 *
 * const cache = new NodeCache()
 * const root = cache.create(1);
 * const node2 = cache.create(2);
 * root.addEdge(node2);
 * root.addEdge(cache.create(4));
 * node2.addEdge(cache.create(3));
 * root.DFS(node => console.log(node.value)); // 1, 2, 3, 4
 * root.BFS(node => console.log(node.value)); // 1, 2, 4, 3
 * ```
 */
export class Graph<T extends string | number> {
  value: T;
  edges = new Map<T, Graph<T>>();
  constructor(value: T) {
    this.value = value;
  }

  /**
   * Add Edge
   *
   * Adds a graph node to the current node's edges
   */
  public addEdge(edge: Graph<T>) {
    this.edges.set(edge.value, edge);
  }

  /**
   * Connects To
   *
   * Returns true if the current node has an edge matching the input value.
   * This lookup occurs in O(1)
   */
  public connectsTo(edge: T) {
    return this.edges.has(edge);
  }

  /**
   * BFS
   *
   * Performs a breadth first search beginning with the current node.
   * Invokes the specified callback for each node visited
   */
  public BFS(callback: (node: Graph<T>) => void) {
    const memo = new Set<T>();
    const queue = new LinkedList<Graph<T>>();
    queue.push(this);
    while (queue.size) {
      const current = queue.shift();
      if (!current) {
        continue;
      }
      callback(current);
      memo.add(current.value);
      for (const [value, neighbor] of current) {
        if (!memo.has(value)) {
          queue.push(neighbor);
        }
      }
    }
    memo.clear();
  }

  /**
   * DFS
   *
   * Performs a depth first search beginning with the current node.
   * Invokes the specified callback for each node visited
   */
  public DFS(callback: (node: Graph<T>) => void) {
    const memo = new Set<T>();
    const stack = new Stack<Graph<T>>();
    stack.push(this);
    while (stack.length) {
      const current = stack.pop();
      if (!current) {
        continue;
      }
      callback(current);
      memo.add(current.value);
      const tmp = new Stack<Graph<T>>();
      for (const [value, neighbor] of current) {
        if (!memo.has(value)) {
          tmp.push(neighbor);
        }
      }
      while (tmp.length) {
        stack.push(tmp.pop()!);
      }
    }
    memo.clear();
  }

  *[Symbol.iterator](): Generator<[value: T, node: Graph<T>]> {
    for (const [key, node] of this.edges) {
      yield [key, node];
    }
  }
}

/**
 * Node Cache
 *
 * A mechanism for storing all graph nodes in a flat structure. When using
 * the NodeCache along side Graph nodes, you can access nodes using their
 * value's in O(1) regardless of where in the graph a node is positioned
 *
 * ```typescript
 * import { NodeCache, Graph } from "@figliolia/data-structures";
 *
 * const cache = new NodeCache();
 * cache.create(1);
 * cache.reference(1)?.addEdge?.(cache.create(2));
 *
 * // Cache = { 1 => Graph<1>, 2 => Graph<2> };
 * // Graph<1> = { value: 1, edges: { 2 => Graph<2> } }
 * ```
 */
export class NodeCache<T extends string | number> {
  public storage = new Map<T, Graph<T>>();

  /**
   * Create
   *
   * Creates a graph node with the given value if it does not exist
   * in the cache. If a node with the provided value exists in the
   * cache, it is returned instead.
   */
  public create(value: T) {
    if (!this.storage.has(value)) {
      this.storage.set(value, new Graph(value));
    }
    return this.storage.get(value)!;
  }

  /**
   * Reference
   *
   * Returns a cached reference to a node with the provided value or
   * undefined if it does not exist
   */
  public reference(value: T) {
    return this.storage.get(value);
  }
}
