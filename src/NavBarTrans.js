import React from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";

function NavBarTrans(props) {

  const navigate = useNavigate();

  return (
    <div className="nav-bar-trans">
      <span className="left">
        <button className="back-button-trans" onClick={() => navigate(-1)}>Back</button>
      </span>
      <span className="menu-title-trans">
        <span>{props.title}</span>
      </span>
      <span className="right">
        <span> 
        <button className="so-button-trans" onClick={() => navigate("/main")}>Main</button>
        </span>
      </span>
    </div>
  );
}

export default NavBarTrans;
