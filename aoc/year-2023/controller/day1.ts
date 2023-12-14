import { AOC } from "@cent/aoc-runner";
export default class Day1 implements AOC {
  private readonly _listNumberOfWords = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };

  public day = "Day 1";

  public part1(value: string[]) {
    return value.reduce((total, strings) => {
      const listOfNumbers = [...strings.matchAll(/[0-9]/g)];
      const firstValue = listOfNumbers[0][0];
      const lastValue = listOfNumbers[listOfNumbers.length - 1][0];

      const parsed = Number(`${firstValue}${lastValue}`);
      return total + parsed;
    }, 0);
  }

  public part2(value: string[]) {
    return value.reduce((total, strings) => {
      const listOfNumbers = [
        ...strings.matchAll(
          /(\d|(?=(one|two|three|four|five|six|seven|eight|nine)).*(one|two|three|four|five|six|seven|eight|nine))/g
        )
      ];

      const firstItem = listOfNumbers[0];
      const firstValue = (firstItem[2] ||
        firstItem[0]) as keyof typeof this._listNumberOfWords;

      const lastItem = listOfNumbers[listOfNumbers.length - 1];
      const lastValue = (lastItem[3] ||
        lastItem[1]) as keyof typeof this._listNumberOfWords;

      const parsed = Number(
        `${this._listNumberOfWords[firstValue] ?? firstValue}${
          this._listNumberOfWords[lastValue] ?? lastValue
        }`
      );

      return total + parsed;
    }, 0);
  }

  public runnerParser(value: string) {
    return value.split("\n");
  }
}
