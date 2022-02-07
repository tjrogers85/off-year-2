import VillageData from "./VillageData";
import TownToTownCode from "./TownToTownCode";
import Parse from "parse";
import { useState, useEffect } from "react";

function GetOfficesP(year, muniType, muniName, muniTypeArray) {
  const [officeArray, setOfficeArray] = useState([]);
  const parsedArray = JSON.parse(muniTypeArray);
  const villageData = VillageData();
  let parseQ = "";
  let objectArray = []; 

  const lastTwo = year.slice(2);
  if (year === "2016" || year === "2017") {
    parseQ = new Parse.Query(`ResultsPrimary16to17`);
  } else if (+year > 2017) {
    parseQ = new Parse.Query(`ResultsPrimary${lastTwo}`);
  } else {
    parseQ = new Parse.Query(`ResultsPrimary`);
  }

  const thisFunc = async () => {
    if (["Federal", "State", "County"].includes(muniType)) {
      parseQ.contains("resultYear", year);
      parseQ.contains("resultMuni", muniType);
    } else if (["Village"].includes(muniType)) {
      const villageEds = [];
      villageData.map((item) => {
        if (item.village === muniName) {
          villageEds.push(item.ed);
        }
      });
      let villageTwd = ''
      parsedArray.map((item) => {
        for (const ed of villageEds) {
          if (ed === item.twd) {
            if (item.muni === "Village") {
              villageTwd = item.twd
            }
          }
        }
      });
      parseQ.contains("resultYear", year);
      parseQ.contains("resultMuni", muniType);
      parseQ.contains("twdFirst", villageTwd);
    } else if (["Town/City"].includes(muniType)) {
      const townCode = TownToTownCode(muniName);
      parseQ.contains("resultYear", year);
      parseQ.contains("resultMuni", muniType);
      parseQ.contains("twdAbbr", townCode);
    }
    let queryResults = await parseQ.find();
    setOfficeArray(queryResults);
  };

  for (const object of officeArray) {
    let officeObject = { office: "", party: "", section: "" };
    officeObject.office = object.get("resultOffice");
    officeObject.party = object.get("party");
    officeObject.section = object.get("section");
    objectArray.push(officeObject);
  }

  useEffect(() => {
    thisFunc();
  }, []);

  let objectArray2 = [];
  for (const object of objectArray) {
    object.all3 = `${object.office}${object.party}${object.section}`;
    object.section = +object.section;
  }
  for (const object of objectArray) {
    if (objectArray2.length < 1) {
      if (!(object.party === undefined)) {
        if (!(object.party === "") && !object.party.includes("/")) {
          objectArray2.push(object);
        }
      }
    } else {
      let arraySum = 0;
      for (const object2 of objectArray2) {
        if (object.all3 === object2.all3) {
          arraySum = arraySum + 1;
        }
      }
      if (arraySum === 0) {
        if (!(object.party === undefined)) {
          if (!(object.party === "") && !object.party.includes("/")) {
            objectArray2.push(object);
          }
        }
      }
    }
  }
  objectArray2.sort((a, b) => a.party.localeCompare(b.party));
  objectArray2.sort(({ section: a }, { section: b }) => a - b);

  return objectArray2;
}

export default GetOfficesP;
