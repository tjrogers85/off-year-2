import NavBar from "../NavBar";

function Subdivisions() {
  const subdivisions = JSON.parse(localStorage.getItem("subdivisions"));

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title="Political Subdivisions" />
          <div className="array-bg">
            <nav>
              <ul className="no-bullets">
                <li className="li-standard">{subdivisions.congress}</li>
                <li className="li-standard">{subdivisions.stateSenate}</li>
                <li className="li-standard">{subdivisions.stateAssembly}</li>
                <li className="li-standard">{subdivisions.countyLegislator}</li>
                <li className="li-standard">{subdivisions.townCity}</li>
                {subdivisions.councilDistrict !== "" ? (
                  <li className="li-standard">
                    {subdivisions.councilDistrict}
                  </li>
                ) : null}
                {subdivisions.village !== "" ? (
                  <li className="li-standard">{subdivisions.village}</li>
                ) : null}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subdivisions;
