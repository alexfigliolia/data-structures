import { MinMaxStack } from "./MinMaxStack";

/**
 * Max Stack
 *
 * A stack maintaining a reference to it's highest weighted item
 *
 * ```typescript
 * import { MaxStack } from "@figliolia/data-structures";
 *
 * const stack = new MaxStack<number>(value => value);
 * stack.push(1); // max = 1
 * stack.push(2); // max = 2
 * stack.push(3); // max = 3
 * stack.max // 3
 * stack.pop() // max = 2
 * ```
 */
export class MaxStack<T> extends MinMaxStack<T> {
  public max: T | null = null;

  private get maximium() {
    return this.max === null ? null : this.extract(this.max);
  }

  protected setMinMax(val: T) {
    const value = this.extract(val);
    const max = this.maximium;
    if (max === value) {
      this.occurances++;
      return;
    }
    if (max === null || value > max) {
      this.max = val;
      this.occurances = 1;
    }
  }

  protected findMinMax(val: T) {
    const value = this.extract(val);
    if (value === this.maximium) {
      this.occurances--;
      if (this.occurances === 0) {
        this.findMax();
      }
    }
  }

  private findMax() {
    let occurances = 0;
    let minValue = null;
    let min: T | null = null;
    for (const value of this.storage) {
      const currentValue = this.extract(value);
      if (minValue === null || currentValue > minValue) {
        min = value;
        occurances = 1;
        minValue = currentValue;
      } else if (minValue === currentValue) {
        occurances++;
      }
    }
    this.max = min;
    this.occurances = occurances;
  }
}
