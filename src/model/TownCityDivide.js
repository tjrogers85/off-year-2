function TownCityDivide(townCityArray) {

    let townsAndCities = { towns: [], cities: []}
    let towns = [];
    let cities = [];
    for (const item of townCityArray) {
        
        switch (item) {
          case "Bedford":
            towns.push(item);
            break;
          case "Cortlandt":
            towns.push(item);
            break;
          case "Eastchester":
            towns.push(item);
            break;
          case "Greenburgh":
            towns.push(item);
            break;
          case "Harrison":
            towns.push(item);
            break;
          case "Lewisboro":
            towns.push(item);
            break;
          case "Mamaroneck":
            towns.push(item);
            break;
          case "Mount Kisco":
            towns.push(item);
            break;
          case "Mount Pleasant":
            towns.push(item);
            break;
          case "New Castle":
            towns.push(item);
            break;
          case "North Castle":
            towns.push(item);
            break;
          case "North Salem":
            towns.push(item);
            break;
          case "Ossining":
            towns.push(item);
            break;
          case "Pelham":
            towns.push(item);
            break;
          case "Pound Ridge":
            towns.push(item);
            break;
          case "Rye Town":
            towns.push(item);
            break;
          case "Scarsdale":
            towns.push(item);
            break;
          case "Somers":
            towns.push(item);
            break;
          case "Yorktown":
            towns.push(item);
            break;
          case "Mount Vernon":
            cities.push(item);
            break;
          case "New Rochelle":
            cities.push(item);
            break;
          case "Peekskill":
            cities.push(item);
            break;
          case "Rye City":
            cities.push(item);
            break;
          case "White Plains":
            cities.push(item);
            break;
          case "Yonkers":
            cities.push(item);
            break;
          default:
            console.log("No Town or City Listed");

        }
        townsAndCities.towns = towns
        townsAndCities.cities = cities
      }
      return townsAndCities
}

export default TownCityDivide