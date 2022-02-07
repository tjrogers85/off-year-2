function TownCodeToTown(townCodeArray) {
    let townArray = [];
    for (const item of townCodeArray) {
      let town = "";
      switch (item) {
        case "01":
          town = "Bedford";
          break;
        case "02":
          town = "Cortlandt";
          break;
        case "03":
          town = "Eastchester";
          break;
        case "04":
          town = "Greenburgh";
          break;
        case "05":
          town = "Harrison";
          break;
        case "06":
          town = "Lewisboro";
          break;
        case "07":
          town = "Mamaroneck";
          break;
        case "08":
          town = "Mount Kisco";
          break;
        case "09":
          town = "Mount Pleasant";
          break;
        case "10":
          town = "New Castle";
          break;
        case "11":
          town = "North Castle";
          break;
        case "12":
          town = "North Salem";
          break;
        case "13":
          town = "Ossining";
          break;
        case "14":
          town = "Pelham";
          break;
        case "15":
          town = "Pound Ridge";
          break;
        case "16":
          town = "Rye Town";
          break;
        case "17":
          town = "Scarsdale";
          break;
        case "18":
          town = "Somers";
          break;
        case "19":
          town = "Yorktown";
          break;
        case "20":
          town = "Mount Vernon";
          break;
        case "21":
          town = "New Rochelle";
          break;
        case "22":
          town = "Peekskill";
          break;
        case "23":
          town = "Rye City";
          break;
        case "24":
          town = "White Plains";
          break;
        case "25":
          town = "Yonkers";
          break;
        default:
          console.log("No Town or City Listed");
      }
      townArray.push(town)
      // townArray.push(town.toUpperCase())
    }
    return townArray
  }
  
  export default TownCodeToTown;
  