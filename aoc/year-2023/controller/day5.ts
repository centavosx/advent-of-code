import { AOC } from "@cent/aoc-runner";
import { Day5Dto } from "../dto";

export default class Day5 implements AOC {
  public day = "Day5";

  part1(value: Day5Dto): void {
    let tempMapped = Array(100)
      .fill(null)
      .map((_, index) => index);

    let mappedSeed = value.seed.map(v => Number(v));

    [value.seedToSoil, value.soilToFertilizer].forEach(seed => {
      let copyMapped = value.seed.map(v => Number(v));
      for (let i = seed.length - 1; i--; ) {
        const mapped = Array(100)
          .fill(null)
          .map((_, index) => index);
        const [destinationStr, rangeStr, lengthStr] = seed[i];

        const destination = Number(destinationStr),
          range = Number(rangeStr),
          length = Number(lengthStr);

        const maxRange = range + length - 1;
        const index = mapped.indexOf(destination);
        const indexMaxRange = mapped.indexOf(maxRange);
        const sliced = mapped.splice(index, length);
        mapped.splice(indexMaxRange, 0, ...sliced);
        copyMapped = copyMapped.map(v => {
          return mapped[v];
        });
      }

      mappedSeed = copyMapped;
      console.log(mappedSeed);
    });
  }

  part2(value: Day5Dto): void {}

  public runnerParser(value: string): Day5Dto {
    return new Day5Dto(value.split("\n"));
  }
}
