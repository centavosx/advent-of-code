export class Day6Dto {

  private _timeAndDistance: number[][] = [];

  constructor(strArr: string[]) {
    strArr.forEach((value) => {
      if(value.match(/^Time:/)){
        this._matchDigits(value, (number, index) => {
          this._timeAndDistance[index][0] = number;
        })
      }
      if(value.match(/^Distance:/)){
        this._matchDigits(value, (number, index) => {
          this._timeAndDistance[index][1] = number;
        })
      }
    })
  }

  public get value(){
    return this._timeAndDistance;
  }

  private _matchDigits(value: string, cb: (n: number, i: number)=>void){
    [...value.matchAll(/\d+/g)].forEach((digits, index)=> {
        if(!this._timeAndDistance[index]) {
          this._timeAndDistance[index] = [];
        }
        cb(Number(digits[0]), index)
      })
  }
}
