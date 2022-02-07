function RegionalCalc(regionResults, regionEdArray, resultsToRegionArray) {
    let regionObjects = [];
  
    for (const item of resultsToRegionArray) {
      let candidateObject = { candidate: "", party: "", votes: "" };
      candidateObject.candidate = item.candidate;
      candidateObject.party = item.party;
      let tempVotes = 0;
      for (const ed of regionEdArray) {
        for (const result of regionResults) {
          console.log(`${result.get("candidate")} ${result.get("party")}`)

          if (
            !(
              item.candidate === "TOTAL CANVASS" ||
              item.candidate === "TOTAL BALLOT" ||
              item.candidate.includes('VOID')
            )
          ) {
            if (
              ed === result.get("twd") &&
              `${item.candidate} ${item.party}` ===
                `${result.get("candidate")} ${result.get("party")}`
            ) {
              tempVotes = tempVotes + +result.get("votes");
            }
          } else {
            if ((ed === result.get("twd")) && (item.candidate === result.get("candidate"))) {
              tempVotes = tempVotes + +result.get("votes");
            }
          }
        }
      }
      candidateObject.votes = tempVotes;
      regionObjects.push(candidateObject);
    }
  
    return regionObjects;
  }
  
  export default RegionalCalc;
  