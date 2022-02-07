import NavBar from "../NavBar";

function Absentee() {
  const absArray = [JSON.parse(localStorage.getItem("absArray"))];

  let genArray = [];
  let primArray = [];
  for (const item of absArray) {
    for (const item2 of item.absArray) {
      if (item2.startsWith("gen")) {
        const genItem = `20${item2.slice(-2)} General Election`;
        genArray.push(genItem);
      } else {
        const primItem = `20${item2.slice(-2)} Primary Election`;
        primArray.push(primItem);
      }
    }
  }
  genArray.sort();
  genArray.reverse();
  primArray.sort();
  primArray.reverse();

  return (
    <div className="App">
      <div className="backGround1">
        <div className="work-screen">
          <NavBar title="Voting History" />
          <div className="array-bg">
            {genArray.length > 0 && (
              <div>
                <h5>General Elections</h5>
                <ul className="no-bullets">
                  {genArray.map((item) => (
                    <li className="li-standard" key={`${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <br />
            <div>
              {primArray.length > 0 && (
                <div>
                  <h5>Primary Elections</h5>
                  <ul className="no-bullets">
                    {primArray.map((item) => (
                      <li className="li-standard" key={`${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Absentee;
