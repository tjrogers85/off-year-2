import NavBar from "../NavBar";
import GetOfficesP from "../model/GetOfficesP";
import { Link } from "react-router-dom";

function ArrayList5P() {
  const title = "Office";
  const year = localStorage.getItem("year");
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

  const officeArray = GetOfficesP(year, muniType, muniName, muniTypeArray);

  return (
    <div className="App">
      <NavBar title={title} />
      <ul className="no-bullets">
        {officeArray.map((item) => (
          <Link className="no-link-style" to={{ pathname: "/6" }} key={officeArray.indexOf(item)}>
            <li
              onClick={() => localStorage.setItem("office", `${item.office}`)}
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
  );
}

export default ArrayList5P;
