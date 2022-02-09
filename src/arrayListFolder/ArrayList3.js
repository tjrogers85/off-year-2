import NavBar from "../NavBar";
import muniType from "../dataFolder/MuniType";
import elecSearch from "../dataStorage/ElecSearchTree";
import { Link } from "react-router-dom";

function ArrayList3(props) {
  const title = "Municipality Type";
  const yearElec = sessionStorage.getItem("yearElec");
  const primaryCode = sessionStorage.getItem("elec");
  let muniTypeArray = [];
  let nextArray = [];
  let five = "5";

  if (primaryCode.includes("Primary")) {
    five = "5P";
  }

  elecSearch.map((item) => {
    if (item.yearElec === yearElec) {
      muniTypeArray.push(item.muni);
      nextArray.push(item);
    }
    sessionStorage.setItem("muniTypeArray", JSON.stringify(nextArray));
    return muniTypeArray;
  });

  const elecSetArray = [...new Set(muniTypeArray)];

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title={title} />
          <div className="array-bg">
            <div className="list-box-container">
              <ul className="no-bullets">
                {elecSetArray.map((item) =>
                  ["Federal", "State", "County"].includes(item) ? (
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
                          sessionStorage.setItem("muniType", `${item}`)
                        }
                      >
                        {item}
                      </li>{" "}
                    </Link>
                  ) : (
                    <Link
                      className="no-link-style"
                      to={{
                        pathname: "/4",
                      }}
                      key={item}
                    >
                      <li
                        className="li-standard"
                        onClick={() =>
                          sessionStorage.setItem("muniType", `${item}`)
                        }
                      >
                        {item}
                      </li>{" "}
                    </Link>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayList3;
