import react, { useState, useEffect } from "react";
import TurnoutExpand1 from "../ElecResultsItems/TurnoutExpand1";
import NavBar from "../NavBar";
import GetResultData from "./GetResultData";
import { Link } from "react-router-dom";
import MapCoordRun from "../mapFolder/MapCoordRun";
import LoadingSpinner from "../LoadingSpinner";

function ArrayList6(props) {
  const [no, yes] = useState("");
  const [turnoutButton, setTurnoutButton] = useState(false);
  let loading = true;
  let id = -1;

  const year = sessionStorage.getItem("year");
  const muniType = sessionStorage.getItem("muniType");
  const muniName = sessionStorage.getItem("muniName");
  const office = sessionStorage.getItem("office");
  const prim = sessionStorage.getItem("elec");
  const section = sessionStorage.getItem("section");

  sessionStorage.setItem("loadingInt", "0");
  sessionStorage.setItem("hideBox", "hide");
  sessionStorage.setItem("uEstate", 0);
  sessionStorage.setItem("1", "1");

  let totalBallot = 0;

  let officeArray = GetResultData(year, muniType, muniName, office, prim, section);

  if (officeArray.length > 0) {
    loading = false;
  }

  if (officeArray.length !== 0) {
    totalBallot = +officeArray[
      officeArray.length - 1
    ].subArray[1].votes.replace(/,/g, "");
  }

  function Toggle(index) {
    if (officeArray[index].show === true) {
      officeArray[index].show = false;
    } else {
      officeArray[index].show = true;
    }
    id = sessionStorage.getItem("toggleCounter");
    yes(id);
    id++;
    sessionStorage.setItem("toggleCounter", id);
  }
  let demCandArray = [];
  for (const item of officeArray) {
    if (item.party.includes("DEM")) {
      demCandArray.push(item.candidate);
    } else if (item.candidate.includes("TOTAL CANVASS")) {
      demCandArray.push(item.candidate);
    }
  }
  const demCandObject = { array: demCandArray };
  sessionStorage.setItem("demCandArray", JSON.stringify(demCandObject));

  function ToggleTurnout() {
    turnoutButton ? setTurnoutButton(false) : setTurnoutButton(true);
  }

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title="" />
          <div className="array-bg">
            <div className="list-box-container">
              <h6 className="result-title">{`${year} ${muniName.toUpperCase()} ${office.toUpperCase()}`}</h6>
              {loading ? <LoadingSpinner /> : null}
              <ul className="no-bullets">
                {officeArray.map((item) => (
                  <div key={id++}>
                    <li
                      className="li-results"
                      onClick={() => Toggle(item.index)}
                    >
                      <span className="span-item1">
                        <img
                          className="party-icon"
                          src={`./images/${item.party}Icon.png`}
                          alt=""
                        />
                        <span className="span-candidate">{item.candidate}</span>
                      </span>
                      <span className="span-votes">{item.votes}</span>
                    </li>
                    <div className={no}>
                      {item.subArray.map((item2) => (
                        <div key={id++}>
                          {item.show ? (
                            <li className="li-children">
                              <span className="span-sub-container">
                                <span className="s1">{item2.party}</span>
                                <span className="s2">{item2.votes}</span>
                              </span>
                            </li>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </ul>
              <div className="br-turnout" />
              {year > 2012 && !prim.includes("Primary") ? (
                <button
                  className="turnout-button"
                  onClick={() => ToggleTurnout()}
                >
                  {`${year} Turnout for ${office}`}
                </button>
              ) : null}
              {turnoutButton ? (
                <TurnoutExpand1
                  year={year}
                  muniType={muniType}
                  muniName={muniName}
                  office={office}
                  totalBallot={totalBallot}
                />
              ) : null}
              <div className="br-turnout" />
              <button
                className="turnout-button"

              >
                <Link
                  className="no-link-style"
                  to={{
                    pathname: "/7",
                  }}
                >
                  <span className="span-sub-container2">
                    Regional Election Results
                  </span>
                </Link>
              </button>
              <div></div>
            </div>
            <br />
            <br />
            <br />
            {year > 2010 && !prim.includes("Primary") ? (
              <button className="map-button" onClick={() => [window.open("/11"), sessionStorage.setItem("uEstate", "0")
            ]}>
                Show Map of Results
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayList6;
