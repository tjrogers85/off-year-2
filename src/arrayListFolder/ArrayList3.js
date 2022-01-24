import NavBar from "../NavBar";
import muniType from "../dataFolder/MuniType";
import elecSearch from "../dataStorage/ElecSearchTree";
import { Link } from "react-router-dom";

function ArrayList3(props) {
  const title = "Municipality Type";
  const yearElec = localStorage.getItem("yearElec");
  const primaryCode = localStorage.getItem("elec");
  let muniTypeArray = [];
  let nextArray = [];
  let five = '5'

  if (primaryCode.includes('Primary')) {
    five = '5P'
  }

 elecSearch.map((item) => {
    if (item.yearElec === yearElec) {
      muniTypeArray.push(item.muni);
      nextArray.push(item)
    }
    localStorage.setItem("muniTypeArray", JSON.stringify(nextArray))
    return muniTypeArray;
  });

  const elecSetArray = [...new Set(muniTypeArray)];
  
  return (
    <div className="App">
      <NavBar title={title} />
      <ul className="no-bullets">
        {elecSetArray.map((item) => (
          ((["Federal", "State", "County"].includes(item)) ? <Link
          className="no-link-style"
          to={{
            pathname: `/${five}`,
          }}
          key={item}
        >
          <li className="li-standard" onClick={() => localStorage.setItem("muniType", `${item}`)}>
            {item}
          </li>{" "}
        </Link> : 
        <Link
          className="no-link-style"
          to={{
            pathname: "/4",
          }}
          key={item}
        >
          <li className="li-standard" onClick={() => localStorage.setItem("muniType", `${item}`)}>
            {item}
          </li>{" "}
        </Link> )
        ))}
      </ul>
    </div>
  );
}

export default ArrayList3;
