import { Link } from "react-router-dom";
import "../App.css";
import yearData from "../dataFolder/Years";
import NavBar from "../NavBar";
import Header from "../Header";

function ArrayList() {
  const title = "Year";
  sessionStorage.setItem("toggleCounter", 0);

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title={title} />
          <div className="array-bg">
            <nav>
            <div className="list-box-container">

              <ul className="no-bullets">
                {yearData.map((item) => (
                  <Link
                    className="no-link-style"
                    to={{
                      pathname: "/2",
                      state: { item: item.year },
                    }}
                    key={item.year}
                  >
                    <li
                      className="li-standard"
                      onClick={() =>
                        sessionStorage.setItem("year", `${item.year.toString()}`)
                      }
                    >
                      {item.year}
                    </li>
                  </Link>
                ))}
              </ul>
              </div>

            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArrayList;
