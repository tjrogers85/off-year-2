import react, { useState, useEffect } from "react";
import Header from "../Header";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

function Landing() {

    const parseQ = new Parse.Query(`OffYearUsers`);
    const navigate = useNavigate();

    async function thisFunc() {

        if (localStorage.getItem("UserNumber") === null) {
            localStorage.setItem("UserNumber", "")
        }
        if (localStorage.getItem("AccessCode") === null) {
            localStorage.setItem("AccessCode", "")
        }
        

        const accessCode = localStorage.getItem("AccessCode");
        const userNumber = localStorage.getItem("UserNumber");

        // const accessCode = ""
        // const userNumber = ""

        console.log(`${accessCode} ${userNumber}`)

        parseQ.contains("UserNumber", userNumber);
        let queryResults = await parseQ.find();
        let userObject = "";
        for (const item of queryResults) {
          userObject = item;
        }
        
        if (userObject.length === 0) {
            localStorage.setItem("emailCode", "0")
            navigate("/auth")
        }
        if ((userObject.get("UserNumber") === userNumber) && 
        (userObject.get("AccessCode") === accessCode) && 
        (userObject.get("AccessStatus") === "Approved")) {
            navigate("/main")
        } else if ((userObject.get("UserNumber") === userNumber) && 
        !(userObject.get("AccessCode") === accessCode) && 
        (userObject.get("AccessStatus") === "Approved")) {
            navigate("/verif")
        } else if ((userObject.get("UserNumber") === userNumber) && 
        (userObject.get("AccessCode") === accessCode) && 
        !(userObject.get("AccessStatus") === "Approved")) {
            navigate("/verif")
        } else if (!(userObject.get("UserNumber") === userNumber)) {
            localStorage.setItem("emailCode", "0")
            navigate("/auth")
        }
    }


  useEffect(() => {
    thisFunc();
  }, []);

  return (
    <div className="App">
      <Header />
      <div
        className="auth-main"
        style={{ backgroundImage: "url('/images/mainBackground.png')" }}
      ></div>
    </div>
  );
}

export default Landing;
