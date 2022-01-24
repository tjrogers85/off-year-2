import Parse from "parse/lib/browser/Parse";
const PARSE_APPLICATION_ID = "HvHIBwLaC0R5axHWAL1Xj8Ma7LPCTHfz3Sq4tcpg";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "RapCcuo8B1itBAtdTTxyqjyueLVMXzmaXb7nHT1A";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function TopCalcReg(queryResults, candidate) {

  let candPctRet = "";
  let voteTotal = [];
  for (const item of queryResults) {
    let voteTemp = 0;
    if (
      !(
        item.get("candidate").includes("IRREGULAR") ||
        item.get("candidate").includes("BALLOT") ||
        item.get("candidate").includes("CANVASS") ||
        item.get("candidate").includes("-VOID")
      )
    ) {
      voteTemp = +item.get("votes");
      voteTotal.push(voteTemp);
    }
  }
  for (const item of queryResults) {
    if (
      !(
        item.get("candidate").includes("IRREGULAR") ||
        item.get("candidate").includes("BALLOT") ||
        item.get("candidate").includes("CANVASS") ||
        item.get("candidate").includes("-VOID")
      )
    ) {
      const totalVote = voteTotal.reduce((x, y) => x + y);
      if (
        item.get("candidate") + item.get("party") ===
        candidate.candidate + candidate.party
      ) {
        let partyVote = +candidate.votes
        candPctRet = partyVote
      }
    }
    else if (candidate.candidate.includes("CANVASS")) {
      let partyVote = +candidate.votes
      candPctRet = partyVote
    } else if (candidate.candidate.includes("TOTAL BALLOT")) {
      let partyVote = +candidate.votes
      candPctRet = partyVote
    } else if (candidate.candidate.includes("-VOID")) {
      let partyVote = +candidate.votes
      candPctRet = partyVote
    }
  }

  return candPctRet
}

export default TopCalcReg;
