function PartyColors(party) {
    let partyColor = ''
    switch (party) {
        case "DEM": case "WOR": case "OTH-GRE": case "OTH-LIB": case "OTH-WEP":
            partyColor = "#00009a";
          break;
        case "REP": case "CON": case "OTH-RTL":
            partyColor = "#9a0000";
          break;
        case "NON": case "OTH-IND": case "OTH-LBT":
            partyColor = "#6a006a";
          break;
        default:
            partyColor = "black";
      }
      return partyColor
}

export default PartyColors;
