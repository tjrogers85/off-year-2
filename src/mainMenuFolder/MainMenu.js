import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import Header from "../Header";

function MainMenu() {
  const chrome = localStorage.getItem("Chrome")

  const [hideBox, setHideBox] = useState(false);

  function NotYet() {
    hideBox ? setHideBox(false) : setHideBox(true);
  }

  var browser = (function() {
    var test = function(regexp) {return regexp.test(window.navigator.userAgent)}
    switch (true) {
        case test(/edg/i): return "Microsoft Edge";
        case test(/trident/i): return "Microsoft Internet Explorer";
        case test(/firefox|fxios/i): return "Mozilla Firefox";
        case test(/opr\//i): return "Opera";
        case test(/ucbrowser/i): return "UC Browser";
        case test(/samsungbrowser/i): return "Samsung Browser";
        case test(/chrome|chromium|crios/i): return "Google Chrome";
        case test(/safari/i): return "Apple Safari";
        default: return "Other";
    }
})();

if (chrome !== "1") {
  if (!(browser.includes("Chrome"))) {
    alert(`The Off Year web app has been optimized for Google Chrome. It will still funciton in ${browser} and other browsers, but you may notice some layout glitches - particularly with the maps. For best performance, open Off Year in Google Chrome.`)
  }
  localStorage.setItem("Chrome", "1")
}

  return (
    <div className="App">
      <Header />
      <div className="backGround1">
        <div
          className="main-screen"
          style={{ backgroundImage: "url('/images/mainBackground.jpg')" }}
        >
          <div className="button-group">
            <span className="button-row">
              <button className="main-button">
                <Link
                  className="no-link-style"
                  to={{
                    pathname: "/1",
                  }}
                >
                  <img
                    className="main-button-image"
                    src={`./images/electionResults.png`}
                    alt=""
                  />
                </Link>
              </button>
              <button className="main-button">
                <Link
                  className="no-link-style"
                  to={{
                    pathname: "/voter1",
                  }}
                >
                  <img
                    className="main-button-image"
                    src={`./images/voterFile.png`}
                    alt=""
                  />
                </Link>
              </button>
            </span>
            <span className="button-row">
              <button className="main-button-inactive">
                <img
                  className="main-button-image"
                  src={`./images/maps.png`}
                  alt=""
                  style={{ opacity: 0.5 }}
                  onClick={() => [NotYet()]}
                />
              </button>
              <button className="main-button-inactive">
                <img
                  className="main-button-image"
                  src={`./images/regData.png`}
                  alt=""
                  style={{ opacity: 0.5 }}
                  onClick={() => [NotYet()]}
                />
              </button>
            </span>
            <span className="button-row">
              <button className="main-button-inactive">
                <img
                  className="main-button-image"
                  src={`./images/docs.png`}
                  alt=""
                  style={{ opacity: 0.5 }}
                  onClick={() => [NotYet()]}
                />
              </button>
              <button className="main-button-inactive">
                <img
                  className="main-button-image"
                  src={`./images/financeData.png`}
                  alt=""
                  style={{ opacity: 0.5 }}
                  onClick={() => [NotYet()]}
                />
              </button>
            </span>
          </div>
        </div>
      </div>
      {hideBox ? (
        <div className="no-func">
          <text is="webView">This feature is </text>
          <br />
          <text is="webView">still in production</text>
          <button className="big-map-button" onClick={() => [NotYet()]}>
            OK
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default MainMenu;
