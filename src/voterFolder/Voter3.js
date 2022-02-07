import NavBarTrans from "../NavBarTrans";
import { Link } from "react-router-dom";
import PartyColors from "../model/PartyColors";
import regionalSelect from "../dataStorage/RegionalSelect";
import { useNavigate } from "react-router-dom";
import TwdToElectionDistrict from "../model/TwdToElectionDistrict";
import TownCodeToTown from "../model/TownCodeToTown";
import TwdToTownCode from "../model/TwdToTownCode";

function Voter3() {
  const what = [JSON.parse(localStorage.getItem("voterObject"))];
  let voter = "";
  for (const item of what) {
    voter = item.voterObject;
  }

  let townCity = TownCodeToTown([
    TwdToTownCode(voter.twd, "twd"),
  ])[0].toLowerCase();

  const elecArray = [];
  const absArray = [];

  for (const property in voter) {
    if (
      (property.startsWith("gen") && !property.startsWith("gend")) ||
      property.startsWith("prim")
    ) {
      elecArray.push(property);
    }
  }

  for (const property in voter) {
    for (const item of elecArray) {
      if (item === property) {
        if (voter[property] === "2") {
          absArray.push(item);
        }
      }
    }
  }
  let oyVoter = 0;
  for (const item of elecArray) {
    let lastNums = 0;
    if (item.startsWith("gen")) {
      lastNums = +item.slice(-2);
    }
    if (lastNums % 2 !== 0) {
      oyVoter = oyVoter + 1;
    }
  }
  localStorage.setItem("elecArray", JSON.stringify({ elecArray: elecArray }));
  localStorage.setItem("absArray", JSON.stringify({ absArray: absArray }));

  let absQ = "";

  if (absArray.length > 0) {
    absQ = "YES";
  } else {
    absQ = "NO";
  }

  const navigate = useNavigate();
  const partyColor = PartyColors(voter.party);
  let bg = "";
  if (partyColor === "#00009a") {
    bg = "mainBackground";
  } else if (partyColor === "#9a0000") {
    bg = "repVoter1";
  } else {
    bg = "nonVoter2";
  }
  const getAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const voterAge = getAge(voter.birthdate);

  const subdivisionFunc = () => {
    for (const item of regionalSelect) {
      if (item.ed === voter.twd) {
        localStorage.setItem("subdivisions", JSON.stringify(item));
      }
    }
    navigate("/subdivisions");
  };

  const pollsiteFunc = () => {
    navigate("/pollsite");
  };

  const absenteeFunc = () => {
    navigate("/abs");
  };

  const votingHistFunc = () => {
    navigate("/voting-hist");
  };

  return (
    <div className="App">
      <div className="backGround1">
        <div
          className="blue-stretch2"
          style={{ backgroundImage: "url('/images/mainBackground.png')" }}
        >
          <div
            className="main-screen-voter">
            <NavBarTrans />
            <div className="voter-name-town">
              <span>
                <div className="voter-result-name">{voter.firstName}</div>
                <div className="voter-result-name">{voter.lastName}</div>{" "}
              </span>
              <span className="span-item1">
                <img
                  className="muni-image"
                  src={`./images/muniImages/${townCity}.png`}
                  alt=""
                />
              </span>
            </div>
            <div className="voter-whiteboard">
              <div className="voter-name-town">
                <button
                  className="voter-link-large-left"
                  style={{ color: partyColor }}
                  onClick={() => subdivisionFunc()}
                >
                  {TwdToElectionDistrict(voter.twd).ed}
                </button>
                <button
                  className="voter-link-large-right"
                  style={{ color: partyColor }}
                  onClick={() => pollsiteFunc()}
                >
                  Poll Site
                </button>
              </div>
              <div className="voter-plain-text">{voter.address}</div>
              <div className="voter-plain-text">
                {voter.cityState} {voter.zip}
              </div>
              <br />
              <div className="left-group">
                <span className="voter-bold-sec2">Age:</span>
                <span className="voter-plain-sec2">
                  {getAge(voter.birthdate)}
                </span>
              </div>
              <div className="left-group">
                <span className="voter-bold-sec2">Sex:</span>
                <span className="voter-plain-sec2">{voter.gender}</span>
              </div>
              <div className="left-group">
                <span className="voter-bold-sec2">Party:</span>
                <span className="voter-plain-sec2">{voter.party}</span>
              </div>
              <br />
              <div className="left-group">
                <span className="voter-bold-sec3">Registration Date:</span>
                <span className="voter-plain-sec3">{voter.regDate}</span>
              </div>
              <div className="left-group">
                <span className="voter-bold-sec3">DOB:</span>
                <span className="voter-plain-sec3">{voter.birthdate}</span>
              </div>
              <div className="left-group">
                <button
                  className="voter-link-sec3"
                  style={{ color: partyColor }}
                  onClick={() => absenteeFunc()}
                >
                  Absentee Voting:
                </button>
                <span className="voter-plain-sec3">{absQ}</span>
              </div>
              <div className="left-group">
                <span className="voter-bold-sec3">Off Year Voter:</span>
                <span className="voter-plain-sec3">{oyVoter}/6</span>
              </div>
              <div className="left-group">
                <button
                  className="voter-link-sec3"
                  style={{ color: partyColor }}
                  onClick={() => votingHistFunc()}
                >
                  Voting History:
                </button>
                <span className="voter-plain-sec3">
                  {elecArray.length} Elections
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voter3;
