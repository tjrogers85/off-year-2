import NavBar from "../NavBar";
import TownOrVillage from "../model/TownOrVillage";
import { Link } from "react-router-dom";

function ArrayList4(props) {
  const title = "Municipality Name";
  const muniType = sessionStorage.getItem("muniType");
  const muniTypeArray = sessionStorage.getItem("muniTypeArray");
  const prim = sessionStorage.getItem("elec");
  let five = "5";

  if (prim.includes("Primary")) {
    five = "5P";
  }

  let twdArray = [];

  const parsedArray = JSON.parse(muniTypeArray);

  parsedArray.map((item) => {
    if (item.muni === muniType) {
      twdArray.push(item.twd);
    }
    return twdArray;
  });

  const townVillageArray = TownOrVillage(twdArray, muniType);

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title={title} />
          <div className="array-bg">
            <div className="list-box-container">
              <div>
                {muniType === "Town/City" && <h5>TOWNS</h5>}
                <ul className="no-bullets">
                  {townVillageArray.townVillage.map((item) => (
                    <Link
                      className="no-link-style"
                      to={{
                        pathname: `/${five}`,
                      }}
                      key={item}
                    >
                      <li
                        className="li-standard"
                        onClick={() =>
                          sessionStorage.setItem("muniName", `${item}`)
                        }
                      >
                        {item}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
              {townVillageArray.city.length > 0 && (
                <div>
                  <h5>CITIES</h5>
                  <ul className="no-bullets">
                    {townVillageArray.city.map((item) => (
                      <Link
                        className="no-link-style"
                        to={{
                          pathname: `/${five}`,
                        }}
                        key={item}
                      >
                        <li
                          className="li-standard"
                          onClick={() =>
                            sessionStorage.setItem("muniName", `${item}`)
                          }
                        >
                          {item}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayList4;
