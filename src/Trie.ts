/**
 * Trie
 *
 * A graph-like data structure for optimized search over multiple
 * strings
 *
 * ```typescript
 * import { Trie } from "@figliolia/data-structures";
 *
 * const dictionary = new Trie();
 * dictionary.add("hello");
 * dictionary.add("goodbye");
 * dictionary.add("helpful");
 * dictionary.search("hello"); // true
 * dictionary.search("help", false); // true
 * ```
 */
export class Trie {
  value: string;
  isWord = false;
  dictionary: Record<string, Trie> = {};
  constructor(value: string) {
    this.value = value;
  }

  /**
   * Add
   *
   * Adds a word to the current Trie
   */
  public add(value: string, root: Trie = this) {
    let current = root;
    for (const char of value) {
      if (!current.hasAdjacent(char)) {
        current.dictionary[char] = new Trie(char);
      }
      current = current.get(char);
    }
    current.isWord = true;
  }

  /**
   * Search
   *
   * Searches for a word in the current Trie. Specifying `Trie.search(word, false)` allows
   * you to search for prefixes within multiple words in the Trie
   */
  public search(value: string, isWord = true, root: Trie = this) {
    let current = root;
    for (const char of value) {
      if (!current.hasAdjacent(char)) {
        return false;
      }
      current = current.get(char);
    }
    return isWord ? current.isWord : true;
  }

  /**
   * Has Adjacent
   *
   * Returns true a if the provided character proceeds the current Trie
   */
  public hasAdjacent(value: string) {
    return value in this.dictionary;
  }

  /**
   * Get
   *
   * Returns a reference to a Trie with the provided character
   */
  public get(value: string) {
    return this.dictionary[value];
  }
}
