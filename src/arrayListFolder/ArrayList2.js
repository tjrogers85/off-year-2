import NavBar from "../NavBar";
import elecType from "../dataFolder/ElecType";
import { Link } from "react-router-dom";

function ArrayList2(props) {
  const title = "Election";
  const year = sessionStorage.getItem("year");

  function storeElec(storeItem) {
    sessionStorage.setItem("elec", `${storeItem}`);
    sessionStorage.setItem("yearElec", `${year} ${storeItem}`);
  }

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title={title} />
          <div className="array-bg">
          <div className="list-box-container">
            <ul className="no-bullets">
              {elecType.map((item) => (
                <Link
                  className="no-link-style"
                  to={{
                    pathname: "/3",
                  }}
                  key={item.elec}
                >
                  <li
                    className="li-standard"
                    onClick={() => storeElec(item.elec)}
                  >
                    {year} {item.elec}
                  </li>{" "}
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
export default ArrayList2;
