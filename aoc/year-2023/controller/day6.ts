import { AOC } from "@cent/aoc-runner";
import { Day6Dto } from "../dto";

export default class Day6 implements AOC {
  public day = "Day6";

  private _calculateDistance(time: number, millimeterPerSecond: number){
      const reducedTime = time - millimeterPerSecond;
      return reducedTime * millimeterPerSecond;
  }
  
  part1({value}: Day6Dto) {
    let totalScore = 0;

    value.forEach(([time, distance]) => {
      let score = 0;
      let millimeterPerSecond = 0;
      while(millimeterPerSecond <= time) {
        if (!millimeterPerSecond) {
          millimeterPerSecond++;
          continue;
        }

        const currentDistance = this._calculateDistance(time, millimeterPerSecond);
        
        if(currentDistance > distance ) {
          score++;
        }
        millimeterPerSecond++;
      }

      if(totalScore === 0){
        totalScore += score;
        return;
      }

      totalScore *= score;
    });

    return totalScore;
  }

  part2({value}: Day6Dto) {
    const timeAndDistance = ['', ''];
    value.forEach(([time, distance])=>{
      timeAndDistance[0]+=time;
      timeAndDistance[1]+=distance;
    })
    const time = Number(timeAndDistance[0]);
    const distance = Number(timeAndDistance[1]);

    let score = 0;
    let millimeterPerSecond = 0;
    while(millimeterPerSecond <= time) {
       if (!millimeterPerSecond) {
          millimeterPerSecond++;
          continue;
        }
        const currentDistance = this._calculateDistance(time, millimeterPerSecond);
        if(currentDistance > distance ) {
          score++;
        }
        millimeterPerSecond++;
    }
    return score;
  }

  public runnerParser(value: string): Day6Dto {
    return new Day6Dto(value.split("\n"));
  }
}
