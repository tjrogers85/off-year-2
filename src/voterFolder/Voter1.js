import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarTrans from "../NavBarTrans";
import Parse from "parse";
import { Link } from "react-router-dom";

function Voter1() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [address, setAddress] = useState("");
  const [po, setPO] = useState("");
  const [muni, setMuni] = useState("");
  const [party, setParty] = useState("");
  const navigate = useNavigate();

  let voterSearchObject = {
    first: "",
    last: "",
    address: "",
    po: "",
    muni: "",
    party: "",
  };

  const clearFields = () => {
    setFirst("");
    setLast("");
    setAddress("");
    setPO("");
    setMuni("");
    setParty("");
  };

  const searchFunc = () => {
    voterSearchObject.first = first;
    voterSearchObject.last = last;
    voterSearchObject.address = address;
    voterSearchObject.po = po;
    voterSearchObject.muni = muni;
    voterSearchObject.party = party;
    localStorage.setItem(
      "voterSearchObject",
      JSON.stringify(voterSearchObject)
    );
  };

  // useEffect(() => {
  //   document.addEventListener('keydown', logKey)
  //   function logKey(e) {
  //     if (e.code === "Enter") {
  //       searchFunc()
  //       console.log(voterSearchObject.first)

  //     }
  //   }}, []);

  //Starting the fuckery

  return (
    <div className="App">
      {/* <div className="backGround1"> */}
        <div className="blue-stretch2"
          style={{ backgroundImage: "url('/images/mainBackground.png')" }}
        >
          <div className="main-screen-voter">
            <NavBarTrans />

            <text is="webView">Westchester County</text>
            <br />
            <text is="webView">Registered Voters</text>
            <br />

            <div className="input-container-voter">
              <input
                className="input-item-voter"
                type="text"
                value={first}
                placeholder="First Name (full or partial)"
                onChange={(event) => {
                  setFirst(event.target.value);
                }}
              />
              <input
                className="input-item-voter"
                type="text"
                value={last}
                placeholder="Last Name (full or partial)"
                onChange={(event) => {
                  setLast(event.target.value);
                }}
              />
              <input
                className="input-item-voter"
                type="text"
                value={address}
                placeholder="Address (full or partial)"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <input
                className="input-item-voter"
                type="text"
                value={po}
                placeholder="Town, City, or Village (Post Office)"
                onChange={(event) => {
                  setPO(event.target.value);
                }}
              />

              <select
                className="select-item-voter"
                type="text"
                defaultValue=""
                value={muni}
                onChange={(event) => {
                  setMuni(event.target.value);
                }}
              >
                <option disabled={true} value="" hidden>
                  Town or City (Municipality)
                </option>
                <option value="01">Bedford</option>
                <option value="02">Cortlandt</option>
                <option value="03">Eastchester</option>
                <option value="04">Greenburgh</option>
                <option value="05">Harrison</option>
                <option value="06">Lewisboro</option>
                <option value="07">Mamaroneck</option>
                <option value="08">Mount Kisco</option>
                <option value="09">Mount Pleasant</option>
                <option value="10">New Castle</option>
                <option value="11">North Castle</option>
                <option value="12">North Salem</option>
                <option value="13">Ossining</option>
                <option value="14">Pelham</option>
                <option value="15">Pound Ridge</option>
                <option value="16">Rye Town</option>
                <option value="17">Scarsdale</option>
                <option value="18">Somers</option>
                <option value="19">Yorktown</option>
                <option value="20">Mount Vernon</option>
                <option value="21">New Rochelle</option>
                <option value="22">Peekskill</option>
                <option value="23">Rye City</option>
                <option value="24">White Plains</option>
                <option value="25">Yonkers</option>
              </select>

              <select
                className="select-item-voter"
                type="text"
                defaultValue=""
                value={party}
                onChange={(event) => {
                  setParty(event.target.value);
                }}
              >
                <option disabled={true} value="" hidden>
                  Party
                </option>
                <option value="DEM">Democratic</option>
                <option value="REP">Republican</option>
                <option value="NON">Unaffiliated</option>
                <option value="CON">Conservative</option>
                <option value="WOR">Working Families</option>
                <option value="IND">Independence</option>
                <option value="GRE">Green</option>
                <option value="WEP">Women's Equality</option>
                <option value="REF">Reform</option>
                <option value="LBT">Libertarian</option>
                <option value="LIB">Liberal</option>
                <option value="RTL">Right To Life</option>
                <option value="OTH">Other</option>
              </select>
            </div>
            <button className="clear-button" onClick={() => clearFields()}>
              Clear fields
            </button>
            <br />
            <button
              className="voter-search-button"
              onClick={() => searchFunc()}
            >
              <Link
                className="no-link-style-voter"
                to={{
                  pathname: "/voter2",
                }}
              >
                Search
              </Link>
            </button>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Voter1;
