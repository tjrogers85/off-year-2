import React from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";

function NavBar(props) {

  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <span className="left">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </span>
      <span className="menu-title">
        <span>{props.title}</span>
      </span>
      <span className="right">
        <span> 
        <button className="so-button" onClick={() => navigate("/main")}>Start Over</button>
        </span>
      </span>
    </div>
  );
}

export default NavBar;
