import react, { useState, useEffect } from "react";
import Header from "../Header";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

function Authorization() {
  const parseQ = new Parse.Query(`OffYearUsers`);
  const navigate = useNavigate();
  localStorage.setItem("AlertVerif", 0)
  const emailCode = localStorage.getItem('emailCode')

  const [create, setCreate] = useState(false);
  const [have, setHave] = useState(false);
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [org, setOrg] = useState("");
  const [committee, setCommittee] = useState("");

  function ExpandCreate() {
    create ? setCreate(false) : setCreate(true);
    setHave(false);
  }

  function ExpandHave() {
    have ? setHave(false) : setHave(true);
    setCreate(false);
  }

  async function getEmail() {
    let emailObject = {"firstName": "", "accessCode": "", "email": ""}
    parseQ.matches("Email", email, "i");
    parseQ.contains("AccessStatus", "Approved");
    let queryResults = await parseQ.find();
    let queryObject = ''
    for (const item of queryResults) {
      queryObject = item
    }
    if (queryResults.length > 0) {
      emailObject.firstName = queryObject.get("FirstName")
      emailObject.accessCode = queryObject.get("AccessCode")
      emailObject.email = queryObject.get("Email")
    
      if (emailCode === "0") {
        emailjs.send(
          "service_hb7wxza",
          "template_dsapdsp",
          emailObject,
          "user_l2bg54CHOtGPO5rD7DfXL"
        ).then(res=>{
        }).catch(err=> console.log(err))
        localStorage.setItem("emailCode", "1")
      }
      localStorage.setItem("UserNumber", queryObject.get("UserNumber"))
      localStorage.setItem("AccessCode", emailObject.accessCode)
      localStorage.setItem("AlertVerif", 1)
      alert(`Thanks ${emailObject.firstName}! Your verification code has been emailed to you.`)
      navigate("/verif")

    } else {
      alert("Sorry. There is no Off Year account with this email. Please try again or create a new Off Year account.")
    }
  }

  async function CreateAccout() {
    const accessCode = Math.random().toString(36).slice(-4);
    const userNumber = Math.random().toString(36).slice(-7);
    let create = new Parse.Object("OffYearUsers");
    create.set("FirstName", first);
    create.set("LastName", last);
    create.set("Org", org);
    create.set("Committee", committee);
    create.set("Email", email);
    create.set("AccessCode", accessCode);
    create.set("UserNumber", userNumber);
    create.set("AccessStatus", "Pending");
    localStorage.setItem("AccessCode", accessCode)
    localStorage.setItem("UserNumber", userNumber)

    const createObject = { "firstName": first, "lastName": last }
    
    try {
      await create.save();
    } catch (error) {
      console.log("Error" + error.message);
    }

    if (emailCode === "0") {
      emailjs.send(
        "service_hb7wxza",
        "template_lg6l1bq",
        createObject,
        "user_l2bg54CHOtGPO5rD7DfXL"
      ).then(res=>{
      }).catch(err=> console.log(err))
      localStorage.setItem("emailCode", "1")
    }

    navigate("/verif")
  }

  return (
    <div className="App">
      <Header />
      <div
        className="auth-main"
        style={{ backgroundImage: "url('/images/mainBackground.jpg')" }}
      >
        <div className="auth-button-box">
          <button className="auth-button" onClick={() => ExpandCreate()}>
            Create an Off Year account
          </button>
          {create ? (
            <div className="auth-bg">
              <div className="input-container-auth">
                <input
                  className="input-item-auth"
                  type="text"
                  value={first}
                  placeholder="First Name"
                  onChange={(event) => {
                    setFirst(event.target.value);
                  }}
                />
                <input
                  className="input-item-auth"
                  type="text"
                  value={last}
                  placeholder="Last Name"
                  onChange={(event) => {
                    setLast(event.target.value);
                  }}
                />
                <input
                  className="input-item-auth"
                  type="text"
                  value={org}
                  placeholder="Organization (Optional)"
                  onChange={(event) => {
                    setOrg(event.target.value);
                  }}
                />
                <select
                  className="select-item-auth"
                  type="text"
                  defaultValue={undefined}
                  value={committee}
                  onChange={(event) => {
                    setCommittee(event.target.value);
                  }}
                >
                  <option disabled={true} value="" hidden>
                    Democratic Town or City Committee
                  </option>
                  <option value="No Committee">No Committee</option>
                  <option value="Bedford">Bedford</option>
                  <option value="Cortlandt">Cortlandt</option>
                  <option value="Eastchester">Eastchester</option>
                  <option value="Greenburgh">Greenburgh</option>
                  <option value="Harrison">Harrison</option>
                  <option value="Lewisboro">Lewisboro</option>
                  <option value="Mamaroneck">Mamaroneck</option>
                  <option value="Mount Kisco">Mount Kisco</option>
                  <option value="Mount Pleasant">Mount Pleasant</option>
                  <option value="New Castle">New Castle</option>
                  <option value="North Castle">North Castle</option>
                  <option value="North Salem">North Salem</option>
                  <option value="Ossining">Ossining</option>
                  <option value="Pelham">Pelham</option>
                  <option value="Pound Ridge">Pound Ridge</option>
                  <option value="Rye Town">Rye Town</option>
                  <option value="Scarsdale">Scarsdale</option>
                  <option value="Somers">Somers</option>
                  <option value="Yorktown">Yorktown</option>
                  <option value="Mount Vernon">Mount Vernon</option>
                  <option value="New Rochelle">New Rochelle</option>
                  <option value="Peekskill">Peekskill</option>
                  <option value="Rye City">Rye City</option>
                  <option value="White Plains">White Plains</option>
                  <option value="Yonkers">Yonkers</option>
                </select>
                <input
                  className="input-item-auth"
                  type="text"
                  value={email}
                  placeholder="email address"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <br />
              <button
                className="voter-search-button"
                onClick={() => CreateAccout()}
              >
                Submit
              </button>
            </div>
          ) : null}
          <button className="auth-button" onClick={() => ExpandHave()}>
            I already have an Off Year account
          </button>
          {have ? (
            <div className="auth-bg">
              <div className="input-container-auth">
                <input
                  className="input-item-auth"
                  type="text"
                  value={email}
                  placeholder="Please submit your email address"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <br />
              <button
                className="voter-search-button"
                onClick={() => getEmail()}
              >
                Submit
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Authorization;
