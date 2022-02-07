import react, { useState } from "react";
import TurnoutExpand2 from "../ElecResultsItems/TurnoutExpand2";
import NavBar from "../NavBar";
import GetRegionalData from "./GetRegionalData";
import LoadingSpinner from "../LoadingSpinner";

function ArrayList9(props) {
  const [no, yes] = useState("");
  const [turnoutButton, setTurnoutButton] = useState(false);
  let loading = true

  let id = -1;

  const year = localStorage.getItem("year");
  const muniType = localStorage.getItem("muniType");
  const muniName = localStorage.getItem("muniName");
  const office = localStorage.getItem("office");
  const regionMuniType = localStorage.getItem("regionMuniType");
  const region = localStorage.getItem("region");
  const prim = localStorage.getItem("elec");

  let totalBallot = 0;

  let officeArray = GetRegionalData(
    year,
    muniType,
    muniName,
    office,
    region,
    prim
  );

  console.log(officeArray)

  if (officeArray.length > 0) {
    loading = false
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
    id = localStorage.getItem("toggleCounter");
    yes(id);
    id++;
    localStorage.setItem("toggleCounter", id);
  }

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
                  {`${year} Turnout for ${region}`}
                </button>
              ) : null}
              {turnoutButton ? (
                <TurnoutExpand2
                  year={year}
                  muniType={muniType}
                  muniName={muniName}
                  office={office}
                  region={region}
                  totalBallot={totalBallot}
                />
              ) : null}
            </div>
            <div>
            <br />
            <br />
            <br />
              <button
                className="map-button"
                onClick={() => [window.open("/11R"), localStorage.setItem("uEstate", "0")]}
              >
                Show Map of Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayList9;
