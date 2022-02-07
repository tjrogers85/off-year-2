import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import GetOffices from "../model/GetOffices";

function ArrayList5(props) {
  const title = "Office";
  const muniName = localStorage.getItem("muniName");
  const muniType = localStorage.getItem("muniType");
  const muniTypeArray = localStorage.getItem("muniTypeArray");

  if (muniType === "County") {
    localStorage.setItem("muniName", "Westchester");
  } else if (muniType === "State") {
    localStorage.setItem("muniName", "New York");
  } else if (muniType === "Federal") {
    localStorage.setItem("muniName", "U.S.");
  }
  const officeArray = GetOffices(muniType, muniName, muniTypeArray);

  if (muniType === "State") {
    localStorage.setItem("muniName", "New York");
  } else if (muniType === "Federal") {
    localStorage.setItem("muniName", "United States");
  }

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title={title} />
          <div className="array-bg">
            <div className="list-box-container">
              <ul className="no-bullets">
                {officeArray.map((item) => (
                  <Link
                    className="no-link-style"
                    to={{ pathname: "/6" }}
                    key={item}
                  >
                    <li
                      className="li-standard"
                      onClick={() => localStorage.setItem("office", `${item}`)}
                    >
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

export default ArrayList5;
