import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import regionPicked from "../dataStorage/RegionPicked";
import regionalSelect from "../dataStorage/RegionalSelect";
import RegionalDefine from "./RegionalDefine";
import { setLocalDatastore } from "parse/lib/browser/CoreManager";

function ArrayList7() {
  const title = "Select Region";
  const muniType = sessionStorage.getItem("muniType");
  const muniName = sessionStorage.getItem("muniName");
  const office = sessionStorage.getItem("office");
  sessionStorage.setItem("uEstate", 0);
  let regionMuniType = "";

  function storeElec(regionMuniType) {
    sessionStorage.setItem("regionMuniType", regionMuniType);

    sessionStorage.setItem("regionObjectArray", JSON.stringify(defineResults));
  }

  let searchVar = "";
  let edArray = [];
  let regionArray = [];
  const county = "county";

  if (
    (muniType === "Town/City" || muniType === "Village") &&
    !office.includes("Council District")
  ) {
    searchVar = muniName;
  } else if (
    office.includes("State Senate") ||
    office.includes("State Assembly") ||
    office.includes("Congress") ||
    office.includes("County Legislator") ||
    office.includes("City Council")
  ) {
    if (office.includes("State Senate -")) {
      office = office.replaceAll("State Senate - District", "State Senate SD");
    } else if (office.includes("State Assembly -")) {
      office = office.replaceAll(
        "State Assembly - District",
        "State Assembly AD"
      );
    } else if (office.includes("Congress -")) {
      office = office.replaceAll("Congress - District", "Congress CD");
    }
    searchVar = office;
  } else {
    searchVar = county;
  }

  sessionStorage.setItem("searchVar", searchVar);

  regionPicked.map((item) => {
    if (searchVar !== "county") {
      if (item.region === searchVar) {
        edArray.push(item.ed);
      }
    } else {
      edArray.push(item.ed);
    }
  });

  for (const edItem of edArray) {
    regionalSelect.map((regionItem) => {
      if (regionItem.ed === edItem) {
        regionArray.push(regionItem);
      }
    });
  }

  const defineResults = RegionalDefine(regionArray);
  let preArray = [];
  for (const item of defineResults) {
    let key = Object.keys(item)[0];
    preArray.push(key);
  }
  let resultArray = [...new Set(preArray)];
  resultArray.push("Election District");

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title={title} />
          <div className="array-bg">
            <div className="list-box-container">
              <ul className="no-bullets">
                {resultArray.map((item) => (
                  <Link
                    className="no-link-style"
                    to={{
                      pathname: "/8",
                    }}
                    key={item}
                  >
                    <li className="li-standard" onClick={() => storeElec(item)}>
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayList7;
