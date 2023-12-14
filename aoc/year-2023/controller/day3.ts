import { AOC } from "@cent/aoc-runner";

export default class Day3 implements AOC {
  public day = "Day3";

  public part1(value: string[]) {
    let total = 0;
    value.forEach((val, index) => {
      const digits = [...val.matchAll(/\d+/g)];

      digits.forEach(match => {
        const matchIndex = (match.index || 0) - 1;

        const firstFindIndex = matchIndex < 0 ? 0 : matchIndex;
        const maxIndex = (match.index || 0) + match[0].length;
        const before = value[index - 1] || "";
        const after = value[index + 1] || "";

        const upperPartString = before.substring(firstFindIndex, maxIndex + 1);
        const currentString = match.input?.substring(
          firstFindIndex,
          maxIndex + 1
        );
        const lowerPartString = after.substring(firstFindIndex, maxIndex + 1);

        const combinedStrings =
          upperPartString + currentString + lowerPartString;
        if (/[^\d.]+/.test(combinedStrings)) {
          total += Number(match[0]);
        }
      });
    });
    return total;
  }

  public part2(value: string[]) {
    let total = 0;

    value.forEach((val, index) => {
      const matchedSpecialCharacters = [...val.matchAll(/[^\d.]/g)];

      for (const matchedSpecialCharacter of matchedSpecialCharacters) {
        const indexBeforeMatched = (matchedSpecialCharacter.index || 0) - 1;
        const indexAfterMatched = (matchedSpecialCharacter.index || 0) + 1;

        let digit1: number | undefined;
        let digit2: number | undefined;

        const setDigit = (matchArray: RegExpMatchArray[]) => {
          for (const matchedDigit of matchArray) {
            const firstIndex = matchedDigit.index || 0;
            const lastIndex =
              (matchedDigit.index || 0) + matchedDigit[0].length - 1;

            if (
              (firstIndex <= indexAfterMatched &&
                firstIndex >= indexBeforeMatched) ||
              (lastIndex >= indexBeforeMatched &&
                lastIndex <= indexAfterMatched) ||
              (firstIndex <= indexBeforeMatched &&
                lastIndex >= indexAfterMatched)
            ) {
              const parsedNum = Number(matchedDigit[0]);
              if (!digit1) {
                digit1 = parsedNum;
                continue;
              }
              digit2 = parsedNum;
              break;
            }
          }
        };

        setDigit([...val.matchAll(/\d+/g)]);

        const before = value[index - 1] || "";
        const after = value[index + 1] || "";

        if (!digit1 || !digit2) {
          const matchedDigitsBefore = [...before.matchAll(/\d+/g)];
          setDigit(matchedDigitsBefore);
        }

        if (!digit1 || !digit2) {
          const matchedDigitsAfter = [...after.matchAll(/\d+/g)];
          setDigit(matchedDigitsAfter);
        }

        if (digit1 && digit2) {
          total += Number(digit1) * Number(digit2);
        }
      }
    });

    return total;
  }

  public runnerParser(value: string) {
    return value.split("\n");
  }
}
