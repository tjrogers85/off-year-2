function TownToTownCode(townInput) {
    let town = "";
      switch (townInput) {
        case "Bedford":
          town = "01";
          break;
        case "Cortlandt":
          town = "02";
          break;
        case "Eastchester":
          town = "03";
          break;
        case "Greenburgh":
          town = "04";
          break;
        case "Harrison":
          town = "05";
          break;
        case "Lewisboro":
          town = "06";
          break;
        case "Mamaroneck":
          town = "07";
          break;
        case "Mount Kisco":
          town = "08";
          break;
        case "Mount Pleasant":
          town = "09";
          break;
        case "New Castle":
          town = "10";
          break;
        case "North Castle":
          town = "11";
          break;
        case "North Salem":
          town = "12";
          break;
        case "Ossining":
          town = "13";
          break;
        case "Pelham":
          town = "14";
          break;
        case "Pound Ridge":
          town = "15";
          break;
        case "Rye Town":
          town = "16";
          break;
        case "Scarsdale":
          town = "17";
          break;
        case "Somers":
          town = "18";
          break;
        case "Yorktown":
          town = "19";
          break;
        case "Mount Vernon":
          town = "20";
          break;
        case "New Rochelle":
          town = "21";
          break;
        case "Peekskill":
          town = "22";
          break;
        case "Rye City":
          town = "23";
          break;
        case "White Plains":
          town = "24";
          break;
        case "Yonkers":
          town = "25";
          break;
        default:
          console.log("No Town or City Listed");
    }
    return town
}
  
  export default TownToTownCode;
  