import React, { useState, useEffect } from "react";
import Parse, { Push } from "parse/lib/browser/Parse";
import TurnoutRegions from "./TurnoutRegions";
import { resolvePath } from "react-router-dom";

function TurnoutExpand2(props) {
  const [turnout, setTurnout] = useState([]);

  const year = props.year;
  const muniType = props.muniType;
  const muniName = props.muniName;
  const office = props.office;
  const totalBallot = props.totalBallot;
  const regionMuniType = localStorage.getItem("regionMuniType");
  const region = localStorage.getItem("region");
  const edSelect = JSON.parse(localStorage.getItem("edSelect"));


  let queryResults = "";
  let demGroup = "";
  let repGroup = "";
  let nonGroup = "";
  let totEvGroup = "";
  let demEvGroup = "";
  let repEvGroup = "";
  let nonEvGroup = "";

  const thisFunc = async () => {
    const parseQ = new Parse.Query(`VoterCredit2021`);
    let twdSelection = ''

    if (regionMuniType.includes("Election District")) {
      for (const ed of edSelect.array) {
        if (ed.ed === region) {
          twdSelection = ed
        }
      } 
    }

    if (
      !muniType.includes("Town") &&
      !muniType.includes("Village") &&
      !muniType.includes("County")
    ) {
      let turnoutRegion = TurnoutRegions(muniType, muniName, office);
      switch (turnoutRegion) {
        case ("congress",
        "stateSenate",
        "stateAssembly",
        "countyLegislator",
        "councilDistrict"):
          parseQ.equalTo(`${turnoutRegion}`, office);
          break;
        default:
          parseQ.equalTo(`county`, "County");
      }
    } else if (muniType.includes("County") && office.includes("Legislator")) {
      parseQ.equalTo(`countyLegislator`, office);
    } else if (muniType.includes("Town") && office.includes("City Council")) {
      parseQ.equalTo(`councilDistrict`, office);
    } else if (muniType.includes("Town")) {
      parseQ.equalTo(`townCity`, muniName);
    } else if (muniType.includes("Village")) {
      parseQ.equalTo(`village`, muniName);
    } else if (muniType.includes("County")) {
      parseQ.equalTo(`county`, "County");
    } else if (muniName.includes("York")) {
      parseQ.equalTo(`county`, "County");
    }

    if (regionMuniType.includes("Congress")) {
      parseQ.equalTo("congress", region);
    } else if (regionMuniType.includes("State Senate")) {
      parseQ.equalTo("stateSenate", region);
    } else if (regionMuniType.includes("State Assembly")) {
      parseQ.equalTo("stateAssembly", region);
    } else if (regionMuniType.includes("County Legislator")) {
      parseQ.equalTo("countyLegislator", region);
    } else if (regionMuniType.includes("Council District")) {
      parseQ.equalTo("councilDistrict", region);
    } else if (regionMuniType.includes("Town/City")) {
      parseQ.equalTo("townCity", region);
    } else if (regionMuniType.includes("Village")) {
      parseQ.equalTo("village", region);
    } else if (regionMuniType.includes("Election District")) {
      parseQ.equalTo("twd", twdSelection.twd);
    }
    parseQ.limit(10000);
    queryResults = await parseQ.find();
    setTurnout(queryResults);
  };

  useEffect(() => {
    thisFunc();
  }, []);

  let totalDem = 0;
  let totalRep = 0;
  let totalNon = 0;
  let totalEvtot = 0;
  let totalEvDem = 0;
  let totalEvRep = 0;
  let totalEvNon = 0;

  let evDem = 0;
  let evRep = 0;
  let evNon = 0;

  for (const item of turnout) {
    if (item.get("party") === "DEM") {
      totalDem = totalDem + +item.get(`y${year}`);
      evDem = evDem + +item.get(`ev${year}`);
    } else if (item.get("party") === "REP") {
      totalRep = totalRep + +item.get(`y${year}`);
      evRep = evRep + +item.get(`ev${year}`);
    } else if (item.get("party") === "NON") {
      totalNon = totalNon + +item.get(`y${year}`);
      evNon = evNon + +item.get(`ev${year}`);
    }
  }

  const evTotal = evDem + evRep + evNon;

  const demDec = (totalDem / (totalDem + totalRep + totalNon)) * 100;
  const repDec = (totalRep / (totalDem + totalRep + totalNon)) * 100;
  const nonDec = (totalNon / (totalDem + totalRep + totalNon)) * 100;

  const demEvDec = (evDem / (evDem + evRep + evNon)) * 100;
  const repEvDec = (evRep / (evDem + evRep + evNon)) * 100;
  const nonEvDec = (evNon / (evDem + evRep + evNon)) * 100;
  const totEvDec = (evTotal / totalBallot) * 100;

  let demPct = `${demDec.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;
  let repPct = `${repDec.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;
  let nonPct = `${nonDec.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;

  let totEvPct = `${totEvDec.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;

  let demEvPct = `${demEvDec.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;
  let repEvPct = `${repEvDec.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;
  let nonEvPct = `${nonEvDec.toLocaleString("en-US", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })}%`;

  totalDem = (totalBallot * (demDec / 100)).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  totalRep = (totalBallot * (repDec / 100)).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  totalNon = (totalBallot * (nonDec / 100)).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  totalEvtot = evTotal.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  totalEvDem = (evTotal * (demEvDec / 100)).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  totalEvRep = (evTotal * (repEvDec / 100)).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
  totalEvNon = (evTotal * (nonEvDec / 100)).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });

  if (demDec > 0) {
    demGroup = `${totalDem} (${demPct})`;
    repGroup = `${totalRep} (${repPct})`;
    nonGroup = `${totalNon} (${nonPct})`;

    totEvGroup = `${totalEvtot} (${totEvPct})`;
    demEvGroup = `${totalEvDem} (${demEvPct})`;
    repEvGroup = `${totalEvRep} (${repEvPct})`;
    nonEvGroup = `${totalEvNon} (${nonEvPct})`;
  }

  return (
    <div>
      <ul className="no-bullets">
        <li>
          <span style={{ color: "#00009a" }} className="span-turnout-party">
            Dem-Group
          </span>
          <span className="span-turnout-value">{demGroup}</span>
        </li>
        <li>
          <span style={{ color: "#9a0000" }} className="span-turnout-party">
            Rep-Group
          </span>
          <span className="span-turnout-value">{repGroup}</span>
        </li>
        <li>
          <span style={{ color: "#6a006a" }} className="span-turnout-party">
            Non-Group
          </span>
          <span className="span-turnout-value">{nonGroup}</span>
        </li>
        {year > 2018 ? (
          <div>
            <div className="br-ev" />
            <li>
              <span className="span-turnout-party">Early Voting PCT</span>
              <span className="span-turnout-value">{totEvGroup}</span>
            </li>
            <li>
              <span style={{ color: "#00009a" }} className="span-ev-child">
                EV Dem-Group
              </span>
              <span className="span-turnout-value">{demEvGroup}</span>
            </li>
            <li>
              <span style={{ color: "#9a0000" }} className="span-ev-child">
                EV Rep-Group
              </span>
              <span className="span-turnout-value">{repEvGroup}</span>
            </li>
            <li>
              <span style={{ color: "#6a006a" }} className="span-ev-child">
                EV Non-Group
              </span>
              <span className="span-turnout-value">{nonEvGroup}</span>
            </li>
          </div>
        ) : null}
      </ul>
    </div>
  );
}

export default TurnoutExpand2;
