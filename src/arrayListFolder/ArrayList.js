import { Link } from "react-router-dom";
import "../App.css";
import yearData from "../dataFolder/Years";
import NavBar from "../NavBar";

function ArrayList() {

const title = "Year"
localStorage.setItem("toggleCounter", 0)

  return (
    <div className="App">
      <NavBar title={title}/>
      <nav>
        <ul className="no-bullets">
          {yearData.map((item) => (
            <Link
              className="no-link-style"
              to={{
                pathname: "/2",
                state: {item: item.year}
              }}
              key={item.year}
            >
              <li className="li-standard" onClick={() => localStorage.setItem("year", `${item.year.toString()}`)}>{item.year}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default ArrayList;
