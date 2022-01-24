import react, { useState, useEffect } from "react";
import TurnoutExpand1 from "../ElecResultsItems/TurnoutExpand1";
import NavBar from "../NavBar";
import GetResultData from "./GetResultData";
import { Link } from "react-router-dom";

function ArrayList6(props) {
  const [no, yes] = useState("");
  const [turnoutButton, setTurnoutButton] = useState(false);
  let id = -1;

  const year = localStorage.getItem("year");
  const muniType = localStorage.getItem("muniType");
  const muniName = localStorage.getItem("muniName");
  const office = localStorage.getItem("office");
  const prim = localStorage.getItem("elec");
  let totalBallot = 0;

  let officeArray = GetResultData(year, muniType, muniName, office, prim);

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
      <NavBar title="" />
      <div className="array-bg">
        <h6 className="result-title">{`${year} ${muniName.toUpperCase()} ${office.toUpperCase()}`}</h6>
        <ul className="no-bullets">
          {officeArray.map((item) => (
            <div key={id++}>
              <li className="li-results" onClick={() => Toggle(item.index)}>
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
          <button className="turnout-button" onClick={() => ToggleTurnout()}>
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
        <button className="turnout-button">
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
      </div>
      <div>
        <button className="map-button" onClick={() => window.open("/10")}>Show Map of Results</button>
      </div>
    </div>
  );
}

export default ArrayList6;
