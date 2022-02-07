import Parse from "parse";
import { useState, useEffect } from "react";
import NavBarTrans from "../NavBarTrans";
import PartyColors from "../model/PartyColors";
import LoadingSpinner from "../LoadingSpinner";

function Pollsite() {
  const parseQ = new Parse.Query(`PollSiteList`);
  const what = [JSON.parse(localStorage.getItem("voterObject"))];
  let voter = "";
  for (const item of what) {
    voter = item.voterObject;
  }
  let [query, setQuery] = useState("");
  let [siteName, setSiteName] = useState("");
  let [address1, setAddress1] = useState("");
  let [address2, setAddress2] = useState("");
  let [loading, setLoading] = useState(true);

  const partyColor = PartyColors(voter.party);
  let bg = "";
  if (partyColor === "#00009a") {
    bg = "mainBackground";
  } else if (partyColor === "#9a0000") {
    bg = "repVoter1";
  } else {
    bg = "nonVoter2";
  }

  const thisFunc = async () => {
    parseQ.contains("twd", voter.twd);
    let queryResults = await parseQ.find();
    setQuery(queryResults);

    const siteData = query;
    for (const item of query) {
      setSiteName(item.get("pollSiteName"));
      setAddress1(item.get("address1"));
      setAddress2(item.get("address2"));
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      thisFunc();
    }
    return () => {
      isMounted = false;
    };
  });

  return (
    <div className="App">
      <div className="backGround1">
        <div
          className="blue-stretch2"
          style={{ backgroundImage: "url('/images/mainBackground.png')" }}
        >
          <div
            className="main-screen-voter"
            style={{ backgroundImage: `url('/images/${bg}.png')` }}
          >
            <NavBarTrans />
            {loading ? (
              <div className="map-spinner">
                <LoadingSpinner />
              </div>
            ) : null}
            <br />
            <div className="voter-whiteboard">
              <br />
              <br />
              <div className="pollsite-name">{siteName}</div>
              <div className="pollsite-address">{address1}</div>
              <div className="pollsite-address">{address2}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pollsite;
