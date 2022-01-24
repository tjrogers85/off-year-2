import TwdToTownCode from "../model/TwdToTownCode";
import TownCodeToTown from "../model/TownCodeToTown";
import VillageData from "../model/VillageData";
import GetVillage from "../model/GetVillage";
import TownCityDivide from "./TownCityDivide";

function TownOrVillage(twdArray, muniType) {
  let townVillageArray = {townVillage: [], city: []};

  if (muniType === "Town/City") {
    const townCodeArray = TwdToTownCode(twdArray, 'array');
    const towns = TownCodeToTown(townCodeArray);
    const distinctTowns = [...new Set(towns)];
    const townCity = TownCityDivide(distinctTowns)
    townVillageArray.townVillage = townCity.towns
    townVillageArray.city = townCity.cities
  } else if (muniType === "Village") {
    const villageData = VillageData();
    townVillageArray.townVillage = GetVillage(villageData, twdArray);
  }
  return townVillageArray;
}

export default TownOrVillage;
