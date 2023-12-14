import { AOC } from "@cent/aoc-runner";

export default class Day2 implements AOC {
  private readonly MAXIMUM_CONTAINER_LIST = {
    red: 12,
    green: 13,
    blue: 14
  };

  public day = "Day 2";

  private _getRGBNumbers(game: string) {
    const red = this._matchColorNumber(game, /(\d+)\s(red)/);
    const blue = this._matchColorNumber(game, /(\d+)\s(blue)/);
    const green = this._matchColorNumber(game, /(\d+)\s(green)/);
    return { red, blue, green };
  }

  private _matchColorNumber(colorString: string, regex: RegExp) {
    return Number(colorString.match(regex)?.[0]?.match(/\d+/)?.[0]);
  }

  public part1(value: string[]) {
    let idTotal = 0;
    for (const games of value) {
      const matchGame = games.match(/^Game\s(\d+): /)![0]!;
      const id = Number(matchGame.match(/\d+/)![0]!);
      const gameStringSet = games.replace(matchGame, "");

      const gameSet = gameStringSet.split("; ");

      let isPossible = true;

      for (const game of gameSet) {
        const { red, blue, green } = this._getRGBNumbers(game);

        if (
          red > this.MAXIMUM_CONTAINER_LIST.red ||
          blue > this.MAXIMUM_CONTAINER_LIST.blue ||
          green > this.MAXIMUM_CONTAINER_LIST.green
        ) {
          isPossible = false;
          break;
        }
      }

      if (isPossible) {
        idTotal += id;
      }
    }

    return idTotal;
  }

  public part2(value: string[]) {
    let cubePower = 0;

    for (const games of value) {
      const matchGame = games.match(/^Game\s(\d+): /)![0]!;
      const gameStringSet = games.replace(matchGame, "");

      const gameSet = gameStringSet.split("; ");

      let minRed = 0;
      let minBlue = 0;
      let minGreen = 0;

      for (const game of gameSet) {
        const { red, blue, green } = this._getRGBNumbers(game);

        if (red > minRed) minRed = red;
        if (blue > minBlue) minBlue = blue;
        if (green > minGreen) minGreen = green;
      }

      cubePower += minRed * minBlue * minGreen;
    }

    return cubePower;
  }

  public runnerParser(value: string) {
    return value.split("\n");
  }
}
