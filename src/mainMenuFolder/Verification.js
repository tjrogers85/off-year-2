import Header from "../Header";
import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Verification() {

    const [verification, setVerification] = useState("");
    const alertVerif = localStorage.getItem("AlertVerif")
    const navigate = useNavigate();

    console.log(alertVerif)

    if (alertVerif === "0") {
        console.log("I'm here!")
        alert("Thank You. A verification code will be emailed to you, pending approval.")
        localStorage.setItem("AlertVerif", 1)
    }

    function verify() {
        const accessCode = localStorage.getItem("AccessCode")
        const userNumber = localStorage.getItem("UserNumber")
        if (verification === accessCode) {
            localStorage.setItem("AccessCode", accessCode)
            navigate("/main")
        } else {
            alert("Verification code is not valid. Please try again.")
            setVerification("")
        }
    }

  return (
    <div className="App">
      <Header />
      <div
        className="auth-main"
        style={{ backgroundImage: "url('/images/mainBackground.png')" }}
      >
        <div className="auth-button-box">
          <div className="verif-bg">
            <div className="enter-verif">Enter Verification Code</div>
            <div><input
              className="input-verif"
              type="text"
                value={verification}
              placeholder="v-code"
                onChange={(event) => {
                  setVerification(event.target.value);
                }}
            /></div>
            
            <button
                className="verif-button"
                onClick={() => verify()}
              >
                Enter
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
