import React from "react";
import Parse from 'parse/dist/parse.min.js';
import "./App.css";
import ArrayList from "./arrayListFolder//ArrayList";
import { Route, Routes } from "react-router-dom";
import ArrayList2 from "./arrayListFolder/ArrayList2";
import ArrayList3 from "./arrayListFolder/ArrayList3";
import ArrayList4 from "./arrayListFolder/ArrayList4";
import ArrayList5 from "./arrayListFolder/ArrayList5";
import ArrayList5P from "./arrayListFolder/ArrayList5P";
import ArrayList6 from "./arrayListFolder/ArrayList6"; 
// import Map from "./arrayListFolder/Map";
import ArrayList7 from "./arrayListFolder/ArrayList7";
import ArrayList8 from "./arrayListFolder/ArrayList8";
import ArrayList9 from "./arrayListFolder/ArrayList9";
// import ArrayList10 from "./arrayListFolder/ArrayList10";


const PARSE_APPLICATION_ID = 'HvHIBwLaC0R5axHWAL1Xj8Ma7LPCTHfz3Sq4tcpg';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'RapCcuo8B1itBAtdTTxyqjyueLVMXzmaXb7nHT1A';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;



function App() {

  return (
      <Routes>
        <Route exact path="/*" element={<ArrayList />} />
        <Route exact path="/2" element={<ArrayList2 />} />
        <Route exact path="/3" element={<ArrayList3 />} />
        <Route exact path="/4" element={<ArrayList4 />} />
        <Route exact path="/5" element={<ArrayList5 />} />
        <Route exact path="/5P" element={<ArrayList5P />} />
        <Route exact path="/6" element={<ArrayList6 />} />
        {/* <Route exact path="/map2" element={<Map2 />} /> */}
        <Route exact path="/7" element={<ArrayList7 />} />
        <Route exact path="/8" element={<ArrayList8 />} />
        <Route exact path="/9" element={<ArrayList9 />} />
        {/* <Route exact path="/10" element={<ArrayList10 />} /> */}

      </Routes>
  );
}

export default App;
