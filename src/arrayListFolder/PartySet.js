function PartySet(container, item) {
    let partyReturn = "";
    if (container === "DEMREP") {
        partyReturn = "DEMREP"
    } else if (container === "DEM") {
      if (item === "REP") {
        partyReturn = "DEMREP";
      } else {
        partyReturn = "DEM";
      }
    } else if (container === "REP") {
      if (item === "DEM") {
        partyReturn = "DEMREP";
      } else {
        partyReturn = "REP";
      }
    } else if (container === "CON") {
      switch (item) {
        case "DEM":
          item = "DEM";
          break;
        case "REP":
          item = "REP";
          break;
        default:
          item = "CON";
      }
    } else if (container === "WOR") {
      switch (item) {
        case "DEM":
          item = "DEM";
          break;
        case "REP":
          item = "REP";
          break;
        case "CON":
          item = "CON";
          break;
        default:
          item = "WOR";
      }
    } else {
      partyReturn = item;
    }
  
    return partyReturn;
  }
  
  export default PartySet;
  