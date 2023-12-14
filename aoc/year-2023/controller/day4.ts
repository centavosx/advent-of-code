import { AOC } from "@cent/aoc-runner";

export default class Day4 implements AOC {
  public day = "Day4";

  private _doubleTriple(
    max = 1,
    iteration = 1,
    num: number = 0,
    lastNumber: number = 1
  ): number {
    if (iteration > max) {
      return num;
    }

    return this._doubleTriple(
      max,
      iteration + 1,
      num + lastNumber,
      num + lastNumber
    );
  }

  private _getWinnings(card: string) {
    const cardGame = card.match(/^Card\s*(\d+): /)![0]!;

    let numberOfWinnings = 0;

    const [winningStr, myBetStr] = card.replace(cardGame, "").split(" | ");
    const winningSets = new Set<string>();

    [...winningStr.matchAll(/\d+/g)].forEach(value => {
      winningSets.add(value[0]);
    });

    const matchedBet = [...myBetStr.matchAll(/\d+/g)];
    matchedBet.forEach(value => {
      if (winningSets.has(value[0])) {
        numberOfWinnings += 1;
      }
    });
    return numberOfWinnings;
  }

  public part1(value: string[]) {
    let points = 0;
    value.forEach(card => {
      points += this._doubleTriple(this._getWinnings(card));
    });
    return points;
  }

  public part2(value: string[]) {
    const mappedCardInstance = new Map<number, number>();
    value.forEach((card, index) => {
      let cardInstance = mappedCardInstance.get(index) || 0;
      const winnings = this._getWinnings(card);

      cardInstance = cardInstance + 1;
      if (winnings) {
        const nextCardIndex = index + 1;
        for (
          let cardIndex = nextCardIndex;
          cardIndex <= winnings + index;
          cardIndex++
        ) {
          if (cardIndex < value.length) {
            const otherCardInstance = mappedCardInstance.get(cardIndex) || 0;
            mappedCardInstance.set(cardIndex, otherCardInstance + cardInstance);
            continue;
          }
          break;
        }
      }
      mappedCardInstance.set(index, cardInstance);
    });

    return [...mappedCardInstance.values()].reduce(
      (value, current) => value + current,
      0
    );
  }

  public runnerParser(value: string) {
    return value.split("\n");
  }
}
