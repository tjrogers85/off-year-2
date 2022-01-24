function SortParty(sortPartyArray) {
    for (const item of sortPartyArray) {
      switch (item.party) {
        case "DEM":
        case "DEMREP":
          item.party = "A." + item.party;
          break;
        case "REP":
          item.party = "B." + item.party;
          break;
        case "CON":
          item.party = "C." + item.party;
          break;
        case "WOR":
          item.party = "D." + item.party;
          break;
        case "IND":
          item.party = "E." + item.party;
          break;
        case "GRE":
          item.party = "F." + item.party;
          break;
        case "WEP":
          item.party = "G." + item.party;
          break;
        case "SCC":
          item.party = "H." + item.party;
          break;
        case "REF":
          item.party = "I." + item.party;
          break;
        case "SAM":
          item.party = "I." + item.party;
          break;
        default:
          item.party = "X." + item.party;
      }
    }
    let newThing = [];
    for (const item of sortPartyArray) {
      newThing.push(item);
    }
  
    newThing.sort((a, b) => a.party.localeCompare(b.party));
    for (const item of newThing) {
      item.party = item.party.substring(2);
    }
    return newThing;
  }
  
  export default SortParty;
  