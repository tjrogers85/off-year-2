function TownCodeToMap(townCodeArray) {
    let townArray = [];
    for (const item of townCodeArray) {
      let town = "";
      switch (item) {
        case "01":
          town = "Bed";
          break;
        case "02":
          town = "Cor";
          break;
        case "03":
          town = "Eas";
          break;
        case "04":
          town = "Gre";
          break;
        case "05":
          town = "Har";
          break;
        case "06":
          town = "Lew";
          break;
        case "07":
          town = "Mmk";
          break;
        case "08":
          town = "MK";
          break;
        case "09":
          town = "MP";
          break;
        case "10":
          town = "NeC";
          break;
        case "11":
          town = "NoC";
          break;
        case "12":
          town = "NoS";
          break;
        case "13":
          town = "Oss";
          break;
        case "14":
          town = "Pel";
          break;
        case "15":
          town = "PR";
          break;
        case "16":
          town = "RyT";
          break;
        case "17":
          town = "Scr";
          break;
        case "18":
          town = "Som";
          break;
        case "19":
          town = "Ytn";
          break;
        case "20":
          town = "MV";
          break;
        case "21":
          town = "NR";
          break;
        case "22":
          town = "Pkl";
          break;
        case "23":
          town = "RyC";
          break;
        case "24":
          town = "WP";
          break;
        case "25":
          town = "Y";
          break;
        default:
          console.log("No Town or City Listed");
      }
      townArray.push(town)
    }

    return townArray
  }
  
  export default TownCodeToMap;
  