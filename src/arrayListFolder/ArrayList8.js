import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import regionPicked from "../dataStorage/RegionPicked";
import TwdToElectionDistrict from "../model/TwdToElectionDistrict";
import { useState } from "react";

function ArrayList8() {
  const [searchTerm, setSearchTerm] = useState('')


  const tempArray2 = [1, 2, 3, 4];
  const title = "Select Region Name";
  const regionArray = localStorage.getItem("regionObjectArray");
  const parsedArray = JSON.parse(regionArray);
  const listAnchor = localStorage.getItem("regionMuniType");
  const searchVar = localStorage.getItem("searchVar");
  let twdArray = [];
  let returnArray = [];
  let nextArray = [];

  if (listAnchor !== "Election District") {
    for (const item of parsedArray) {
      let key = Object.keys(item)[0];

      if (key === listAnchor) {
        returnArray.push(item[listAnchor]);
      }
    }
  } else {
    for (const item of regionPicked) {
      if (searchVar !== "county") {
        if (item.region === searchVar) {
          twdArray.push(item.ed);
        }
      } else {
        twdArray.push(item.ed);
      }
    }
    for (const twd of twdArray) {
      let ed = TwdToElectionDistrict(twd);
      returnArray.push(ed.ed);
      nextArray.push(ed);
    }
    const edArray = { name: "edArray", array: nextArray };
    localStorage.setItem("edSelect", JSON.stringify(edArray));
  }

  return (
    <div className="App">
      <NavBar title={title} />
      <div className="input-container">
        <input className="input-item" type="text" placeholder="Search"  onChange={event => {setSearchTerm(event.target.value)}}/>
      </div>
      <div className="ui search" />
      <ul className="no-bullets">
        {returnArray.filter((val)=> {
          if (searchTerm === "") {
            return val
          } else if (val.toLowerCase().includes(searchTerm.toLowerCase())){
            return val
          }
        }).map((item) => (
          <Link
            className="no-link-style"
            to={{
              pathname: "/9",
            }}
            key={item}
          >
            <li
              className="li-standard"
              onClick={() => localStorage.setItem("region", `${item}`)}
            >
              {item}
            </li>{" "}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ArrayList8;
