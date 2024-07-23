import { MinMaxStack } from "./MinMaxStack";

/**
 * Min Stack
 *
 * A stack maintaining a reference to it's lowest weighted item
 *
 * ```typescript
 * import { MinStack } from "@figliolia/data-structures";
 *
 * const stack = new MinStack<number>(value => value);
 * stack.push(3); // min = 3
 * stack.push(2); // min = 2
 * stack.push(1); // min = 1
 * stack.min // 1
 * stack.pop() // min = 2
 * ```
 */
export class MinStack<T> extends MinMaxStack<T> {
  public min: T | null = null;

  private get minimum() {
    return this.min === null ? null : this.extract(this.min);
  }

  protected setMinMax(val: T) {
    const value = this.extract(val);
    const min = this.minimum;
    if (min === value) {
      this.occurances++;
      return;
    }
    if (min === null || value < min) {
      this.min = val;
      this.occurances = 1;
    }
  }

  protected findMinMax(val: T) {
    const value = this.extract(val);
    if (value === this.minimum) {
      this.occurances--;
      if (this.occurances === 0) {
        this.findMin();
      }
    }
  }

  private findMin() {
    let occurances = 0;
    let minValue = null;
    let min: T | null = null;
    for (const value of this.storage) {
      const currentValue = this.extract(value);
      if (minValue === null || currentValue < minValue) {
        min = value;
        occurances = 1;
        minValue = currentValue;
      } else if (minValue === currentValue) {
        occurances++;
      }
    }
    this.min = min;
    this.occurances = occurances;
  }
}
