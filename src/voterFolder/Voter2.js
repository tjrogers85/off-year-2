import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import Parse from "parse";
import TownCodeToTown from "../model/TownCodeToTown";
import { useState, useEffect } from "react";
import PartyColors from "../model/PartyColors";
import TwdToTownCode from "../model/TwdToTownCode";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

function Voter2() {
  const navigate = useNavigate();
  let [query, setQuery] = useState([]);
  const [hideBox, setHideBox] = useState(false);
  const [loading, setLoading] = useState(true);
  const voterSearchObject = JSON.parse(
    sessionStorage.getItem("voterSearchObject")
  );
  const parseQ = new Parse.Query(`Voter20220209`);
  // const parseQ = new Parse.Query(`Voter20211208`);

  let first = "";
  let last = "";
  let address = "";
  let po = "";
  let muni = "";
  let party = "";

  const thisFunc = async () => {
    if (voterSearchObject.first !== "") {
      parseQ.startsWith("firstName", voterSearchObject.first.toUpperCase());
    }
    if (voterSearchObject.last !== "") {
      parseQ.startsWith("lastName", voterSearchObject.last.toUpperCase());
    }
    if (voterSearchObject.address !== "") {
      parseQ.contains("address", voterSearchObject.address.toUpperCase());
    }
    if (voterSearchObject.po !== "") {
      parseQ.contains("cityState", voterSearchObject.po.toUpperCase());
    }
    if (voterSearchObject.muni !== "") {
      parseQ.startsWith("twd", voterSearchObject.muni);
    }
    if (voterSearchObject.party !== "") {
      parseQ.contains("party", voterSearchObject.party.toUpperCase());
    }

    let queryResults = await parseQ.find();

    if (queryResults.length > 99) {
      setHideBox(true);
    }

    setLoading(false);
    setQuery(queryResults);
  };

  useEffect(() => {
    thisFunc();
  }, []);

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title="Select Voter for More Info" />
          <div className="array-bg">
            {loading ? (
              <div className="map-spinner">
                <LoadingSpinner />
              </div>
            ) : null}
            <nav>
              <ul className="no-bullets">
                {query.map((item) => (
                  <Link
                    className="no-link-style"
                    to={{
                      pathname: "/voter3",
                    }}
                    key={`${item.get("firstName")}${item.get(
                      "lastName"
                    )}${item.get("address")}`}
                  >
                    <li
                      className="voter-arrange-group"
                      // key={item}
                      onClick={() =>
                        sessionStorage.setItem(
                          "voterObject",
                          JSON.stringify({ voterObject: item })
                        )
                      }
                    >
                      <div className="voter-lines">
                        <span className="voter-name">
                          {item.get("firstName")} {item.get("lastName")}
                        </span>
                        <span
                          className="voter-party"
                          style={{ color: `${PartyColors(item.get("party"))}` }}
                        >
                          {item.get("party")}
                        </span>
                      </div>
                      <div className="voter-lines">
                        <span className="voter-address">
                          {item.get("address")}
                        </span>
                        <span className="voter-muni">
                          {TownCodeToTown([
                            TwdToTownCode(item.get("twd"), "twd"),
                          ])}
                        </span>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {hideBox ? (
        <div className="too-many">
          <text is="webView">Your query returned too many results.</text>
          <br />
          <text is="webView">Please narrow your search.</text>
          <button
            className="big-map-button"
            onClick={() => [setHideBox(false), navigate("/voter1")]}
          >
            OK
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Voter2;
