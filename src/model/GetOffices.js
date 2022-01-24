import VillageData from "./VillageData";
import TownToTownCode from "./TownToTownCode";

function GetOffices(muniType, muniName, muniTypeArray) {
  const parsedArray = JSON.parse(muniTypeArray);
  const villageData = VillageData();
  let officeArray = [];
  if (["Federal", "State", "County"].includes(muniType)) {
    parsedArray.map((item) => {
      if (item.muni === muniType) {
        officeArray.push(item.office);
      }
    });

  } else if (muniType === "Village") {
    const villageEds = [];
    villageData.map((item) => {
      if (item.village === muniName) {
        villageEds.push(item.ed);
      }
    });
    parsedArray.map((item) => {
      for (const ed of villageEds) {
        if (ed === item.twd) {
            if(item.muni === "Village") {
                officeArray.push(item.office);
            }
        }
      }
    });

  } else if (muniType === "Town/City") {
    const townCode = TownToTownCode(muniName);
    parsedArray.map((item) => {
      if (item.muni === muniType) {
        if (item.twd.substring(0, 2) === townCode) {
          officeArray.push(item.office);
        }
      }
    });
  }
  return officeArray
}

export default GetOffices;
