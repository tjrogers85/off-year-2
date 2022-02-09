import NavBar from "../NavBar";
import GetOfficesP from "../model/GetOfficesP";
import { Link } from "react-router-dom";

function ArrayList5P() {
  const title = "Office";
  const year = sessionStorage.getItem("year");
  const muniName = sessionStorage.getItem("muniName");
  const muniType = sessionStorage.getItem("muniType");
  const muniTypeArray = sessionStorage.getItem("muniTypeArray");

  if (muniType === "County") {
    sessionStorage.setItem("muniName", "Westchester");
  } else if (muniType === "State") {
    sessionStorage.setItem("muniName", "New York");
  } else if (muniType === "Federal") {
    sessionStorage.setItem("muniName", "U.S.");
  }

  const officeArray = GetOfficesP(year, muniType, muniName, muniTypeArray);

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title={title} />
          <div className="array-bg">
            <ul className="no-bullets">
              
              {officeArray.map((item) => (
                <Link
                  className="no-link-style"
                  to={{ pathname: "/6" }}
                  key={officeArray.indexOf(item)}
                >
                  <li
                    onClick={() =>
                      [sessionStorage.setItem("office", `${item.office}`), 
                      sessionStorage.setItem("section", `${item.section}`)]
                    }
                  >
                    <span className="span-item1">
                      <img
                        className="party-icon"
                        src={`./images/${item.party}Icon.png`}
                        alt=""
                      />
                      <span className="span-office">{item.office}</span>
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayList5P;
