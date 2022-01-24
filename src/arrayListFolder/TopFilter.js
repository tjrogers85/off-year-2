import Parse from "parse/lib/browser/Parse";
import SortParty from "./SortParty";
import PartySet from "./PartySet";
import parse from "parse";
import SubFilter from "./SubFilter";
const PARSE_APPLICATION_ID = "HvHIBwLaC0R5axHWAL1Xj8Ma7LPCTHfz3Sq4tcpg";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "RapCcuo8B1itBAtdTTxyqjyueLVMXzmaXb7nHT1A";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function TopFilter(parseArray) {
  let totalCanvass = 0;
  let returnArray = [];
  let candidateNames = [];
  for (const item of parseArray) {
    if (
      !(
        item.candidate.includes("IRREGULAR") ||
        item.candidate.includes("BALLOT") ||
        item.candidate.includes("-VOID")
      )
    ) {
      returnArray.push(item);
      candidateNames.push(item.candidate);
      if (item.candidate.includes("CANVASS")) {
        totalCanvass = item.votes;
      }
    }
  }
  let setNames = [...new Set(candidateNames)];
  const newReturnArray = SortParty(returnArray)


  let newSet = []
  for (const item of newReturnArray) {
    for (const name of setNames) {
      if (name === item.candidate) {
        if (!newSet.includes(name)) {
          newSet.push(name)
        }
      }
    }
  }

  let returnObjects = [];
  for (const item of newSet) {
    let newObject = { candidate: "", party: "", votes: 0 };
    let voteTotal = 0;
    for (const item2 of newReturnArray) {
      if (item === item2.candidate) {
        newObject.candidate = item2.candidate;
        newObject.party = PartySet(newObject.party, item2.party);
        newObject.votes = item2.votes + newObject.votes;
      }
    }
    if (!newObject.candidate.includes("CANVASS")) {
      let dec = (newObject.votes / totalCanvass) * 100;
      let pct = `${dec.toLocaleString("en-US", {
        maximumFractionDigits: 1,
        minimumFractionDigits: 1,
      })}%`;
      newObject.votes = pct;
    } else {
      newObject.votes = newObject.votes.toLocaleString("en-US");
    }
    returnObjects.push(newObject);
  }



  let totalCanvassHolder = { candidate: "", party: "", votes: "" };
  let arrayLessTC = [];
  let topFilterObjects = [];

  for (const item of returnObjects) {
    if (!item.candidate.includes("CANVASS")) {
      arrayLessTC.push(item);
    } else {
      totalCanvassHolder = item;
    }
  }

  let subfilter = SubFilter(arrayLessTC, parseArray, totalCanvass);
  //Fuckery begins here

  SortParty(arrayLessTC);

  arrayLessTC.push(totalCanvassHolder);

  let counter = 0;
  for (const item of arrayLessTC) {
    item.subArray = subfilter[counter]
    item.show = false
    item.index = counter
    counter++
  }

  return arrayLessTC;
}

export default TopFilter;
