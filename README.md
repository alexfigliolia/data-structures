# Data Structures
Type-safe and efficient data-structures for everyday programming. 

In this library you'll find a few of the common data-structures I find myself creating over and over again across my projects. When using this library you'll have access to:

1. [Stacks](#stack)
2. [Queues](#queue)
3. [Min Stacks](#min-stack)
4. [Max Stacks](#max-stack)
5. [Min Heaps](#min-heap)
6. [Max Heaps](#max-heap)
7. [Graphs](#graph)
8. [Doubly Linked Lists](#linked-list)
9. [Priority Queues](#priority-queue)
10. [Tries](#trie)
11. [Quick Stack](#quick-stack)
12. [Binary Search](#binary-search)

All of which are documented and type-safe.


## Installation
```bash
npm i @figliolia/data-structures
# or 
yarn add @figliolia/data-structures
```

## Utilities

### Graph
 A generic graph construct for string and number values

 ```typescript
import { Graph, NodeCache } from "@figliolia/data-structures";

const cache = new NodeCache();

const root = cache.create(1);
const node2 = cache.create(2);

root.addEdge(node2);
root.addEdge(cache.create(4));
node2.addEdge(cache.create(3));

root.DFS(node => console.log(node.value)); // 1, 2, 3, 4
root.BFS(node => console.log(node.value)); // 1, 2, 4, 3
```

### Linked List

A doubly linked list mimicking the interface of JavaScript arrays

```typescript
import { LinkedList } from "@figliolia/data-structures";

const list = new LinkedList<number>();
list.push(1);
list.push(2);
list.push(3);
for(const item of list) {
  console.log(item); // 1, 2, 3
}
list.pop(); // 3 -> O(1)
list.shift() // 1 -> O(1)
list.push(3) // O(1)
list.unshift(1) // O(1)
```

### Max Heap
A heap that remains sorted descendingly

```typescript
import { MaxHeap } from "@figliolia/data-structures";
 
const heap = new MaxHeap<number>(value => value);
heap.push(3);
heap.push(2);
heap.push(1);
heap.pop() // 3
 
const complexDataHeap = new MaxHeap<{ id: number, name: string }>(value => value.id);
complexDataHeap.push({ id: 3, name: "Jeff" });
complexDataHeap.push({ id: 2, name: "Steve" });
complexDataHeap.push({ id: 1, name: "Dave" });
complexDataHeap.pop() // { id: 3, name: "Jeff" }
```

### Min Heap
A heap that remains sorted ascendingly
 
```typescript
import { MinHeap } from "@figliolia/data-structures";
 
const heap = new MinHeap<number>(value => value);
heap.push(1);
heap.push(2);
heap.push(3);
heap.pop() // 1
 
const complexHeap = new MinHeap<{ id: number, name: string }>(
  value => value.id // numeric value extractor
);
complexHeap.push({ id: 1, name: "Jeff" });
complexHeap.push({ id: 2, name: "Steve" });
complexHeap.push({ id: 3, name: "Dave" });
complexHeap.pop() // { id: 1, name: "Jeff" }
```

### Max Stack
A stack maintaining a reference to it's highest weighted item
 
```typescript
import { MaxStack } from "@figliolia/data-structures";
 
const stack = new MaxStack<number>(value => value);
stack.push(1); // max = 1
stack.push(2); // max = 2
stack.push(3); // max = 3
stack.max // 3
stack.pop() // max = 2
```

### Min Stack
A stack maintaining a reference to it's lowest weighted item
 
```typescript
import { MinStack } from "@figliolia/data-structures";
 
const stack = new MinStack<number>(value => value);
stack.push(3); // min = 3
stack.push(2); // min = 2
stack.push(1); // min = 1
stack.min // 1
stack.pop() // min = 2
```

### Priority Queue

A bucket queue that sorts elements based on the priority level specified
 
```typescript
import { PriorityQueue } from "@figliolia/data-structures";
 
const queue = new PriorityQueue<number>();
queue.push(1 /* priority */, 3 /* value */);
queue.push(2, 2);
queue.push(3, 1);
queue.length // 3
// queue = [[3], [2], [1]]
while(!queue.isEmpty) {
  queue.pop() // 1, 2, 3
}
```

### Queue
A basic queue with enqueue, dequeue and peek methods

```typescript
import { Queue } from "@figliolia/data-structures";
 
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.peek(); // 1
queue.dequeue(); // 1
```

### Stack
A basic stack with push, pop and peek methods
 
```typescript
import { Stack } from "@figliolia/data-structures";
 
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
stack.peek(); // 3
stack.pop(); // 3
```

### Trie
A graph-like data structure for optimized search over multiple
strings
 
```typescript
import { Trie } from "@figliolia/data-structures";
 
const dictionary = new Trie();
dictionary.add("hello");
dictionary.add("goodbye");
dictionary.add("helpful");
dictionary.search("hello"); // true
dictionary.search("help", false); // true
```

### Quick Stack
A stack-like structure supporting O(1) indexing, retrieval, and deletion

```typescript
import { QuickStack } from "@figliolia/data-structures";

const stack = new QuickStack<() => void>();
const ID1 = stack.push(function one() {});
const ID2 = stack.push(function two() {});
stack.pop() // function two() {}
stack.pop() // function one() {}
stack.get(/* ID */) // retrieves an item by ID 0(1)
stack.delete(/* ID */) // deletes an item by ID 0(1)
```

### Binary Search
Logarithmic searching for sorted lists

```typescript
import { binarySearch } from "@figliolia/data-structures";

binarySearch([1, 2, 3, 4], 3) // true
binarySearch([1, 2, 3, 4], 5) // false

binarySearch(
   [
     { id: 1, name: "Jeff" },
     { id: 2, name: "Steve" },
     { id: 3, name: "Dave" },
     { id: 4, name: "Alex" },
   ],
   { id: 3, name: "Dave" },
   item => item.id
) // true
```