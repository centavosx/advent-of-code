export class Day5Dto {
  private static readonly SeedToSoil = "seed-to-soil";
  private static readonly SoilToFertilizer = "soil-to-fertilizer";
  private static readonly FertilizerToWater = "fertilizer-to-water";
  private static readonly WaterToLight = "water-to-light";
  private static readonly LightToTemperature = "light-to-temperature";
  private static readonly TemperatureToHumidity = "temperature-to-humidity";
  private static readonly HumidityToLocation = "humidity-to-location";

  private _seed: string[] = [];
  private _mapDict: Record<string, string[][]> = {
    seedToSoil: [],
    soilToFertilizer: [],
    fertilizerToWater: [],
    waterToLight: [],
    lightToTemperature: [],
    temperatureToHumidity: [],
    humidityToLocation: []
  };

  private _mapKeys: Record<string, keyof typeof this._mapDict> = {
    [Day5Dto.SeedToSoil]: "seedToSoil",
    [Day5Dto.SoilToFertilizer]: "soilToFertilizer",
    [Day5Dto.FertilizerToWater]: "fertilizerToWater",
    [Day5Dto.WaterToLight]: "waterToLight",
    [Day5Dto.LightToTemperature]: "lightToTemperature",
    [Day5Dto.TemperatureToHumidity]: "temperatureToHumidity",
    [Day5Dto.HumidityToLocation]: "humidityToLocation"
  };

  constructor(strArr: string[]) {
    let type = "";
    strArr.forEach(str => {
      if (type) {
        const arrayOfValue = str.split(" ");
        if (!arrayOfValue[0]) {
          type = "";
          return;
        }
        this._mapDict[this._mapKeys[type]].push(arrayOfValue);
        return;
      }

      if (str.match(/seeds: /)) {
        this._seed = str.replace(/seeds: /, "").split(" ");
      }

      if (str.match(Day5Dto.SeedToSoil)) {
        type = Day5Dto.SeedToSoil;
      }
      if (str.match(Day5Dto.SoilToFertilizer)) {
        type = Day5Dto.SoilToFertilizer;
      }
      if (str.match(Day5Dto.FertilizerToWater)) {
        type = Day5Dto.FertilizerToWater;
      }
      if (str.match(Day5Dto.WaterToLight)) {
        type = Day5Dto.WaterToLight;
      }
      if (str.match(Day5Dto.LightToTemperature)) {
        type = Day5Dto.LightToTemperature;
      }
      if (str.match(Day5Dto.TemperatureToHumidity)) {
        type = Day5Dto.TemperatureToHumidity;
      }
      if (str.match(Day5Dto.HumidityToLocation)) {
        type = Day5Dto.HumidityToLocation;
      }
    });
  }

  public get seed() {
    return this._seed;
  }

  public get seedToSoil() {
    return this._mapDict.seedToSoil;
  }

  public get soilToFertilizer() {
    return this._mapDict.soilToFertilizer;
  }

  public get fertilizerToWater() {
    return this._mapDict.fertilizerToWater;
  }

  public get waterToLight() {
    return this._mapDict.waterToLight;
  }

  public get lightToTemperature() {
    return this._mapDict.lightToTemperature;
  }

  public get temperatureToHumidity() {
    return this._mapDict.temperatureToHumidity;
  }

  public get humidityToLocation() {
    return this._mapDict.humidityToLocation;
  }
}
