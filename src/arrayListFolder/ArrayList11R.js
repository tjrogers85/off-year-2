import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import LoadMapEdArray from "../dataFolder/LoadMapEdArray";
import "mapbox-gl/dist/mapbox-gl.css";
import Parse from "parse";
import EdArrayR from "../dataFolder/EdArrayR";
import GetDemPct from "../dataFolder/GetDemPct";
import ZoomCoords from "../mapFolder/ZoomCoords";
import EdArray from "../dataFolder/EdArray";
import TwdToMapEd from "../model/TwdToMapEd";
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FzaGlraTIyNTEyMSIsImEiOiJja3QzcThmMTUwa2J3MzJudDdnaDVpeG5mIn0.MiGBhPWKUsgW4Y7gbw4pQA";

function ArrayList11R() {
  const mapContainer = useRef();
  const [edMapArray, setEdMapArray] = useState([]);
  const [edButton, setEdButton] = useState(false);
  const [hideBox, setHideBox] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [latLong, setLatLong] = useState([-73.7619, 41.1129]);
  const parseQ = new Parse.Query(`Coords2016`);
  const muniType = localStorage.getItem("muniType");
  const muniName = localStorage.getItem("muniName");
  const office = localStorage.getItem("office");
  let checking = localStorage.getItem("uEstate");
  const region = localStorage.getItem("region");
  const regionMuniType = localStorage.getItem("regionMuniType");

  const year = localStorage.getItem("year");
  const parseQ2 = new Parse.Query(`Regional${year}`);
  const getDems = JSON.parse(localStorage.getItem("demCandArray"));
  const mapArray = [JSON.parse(localStorage.getItem("mapArray"))][0].mapArray;

  const hideBoxstorage = localStorage.getItem("hideBox");
  let test = [];

  function ToggleEds() {
    edButton ? setEdButton(false) : setEdButton(true);
    // setLatLong([])
    // setZoom(10)
  }

  function HideBigMap() {
    hideBox ? setHideBox(false) : setHideBox(true);
    // setLatLong([])
    // setZoom(10)
  }

  let regionMapArray = [];
  const regionArrayPre = EdArrayR(region);
  const regionArray = [...new Set(regionArrayPre)];

  let test2 = [];

  let edArray = [];
  let edArray2 = [];

  if (
    (muniType === "Town/City" || muniType === "Village") &&
    !office.includes("City Council")
  ) {
    test = EdArray(muniName);
  } else {
    test = EdArray(office);
  }
  edArray = [...new Set(test)];

  let queryTest = [];

  parseQ2.containedIn("twd", edArray);
  parseQ2.containedIn("candidate", getDems.array);
  parseQ2.contains("office", office);
  parseQ2.limit(10000);

  let tempArray4 = [];

  const ThisFunc2 = async () => {
    let queryResults = await parseQ2.find();
    for (const item of queryResults) {
      let tempObject = { candidate: "", ed: "" };
      tempObject.candidate = item.get("candidate");
      tempObject.ed = item.get("twd");
      tempObject.office = item.get("office");
      tempObject.votes = item.get("votes");

      queryTest.push(tempObject);
    }

    for (const item of edArray) {
      let demMapArray = [];
      let tempArray3 = [];

      let object2 = { ed: item };
      let demTotal = 0;
      let tcTotal = 0;
      for (const item2 of queryTest) {
        if (item === item2.ed) {
          if (!item2.candidate.includes("TOTAL CANVASS")) {
            demTotal = demTotal + +item2.votes;
          } else {
            tcTotal = +item2.votes;
          }
        }
      }
      object2.demVotes = demTotal;
      object2.tcVotes = tcTotal;
      object2.demPct = demTotal / tcTotal;

      object2.demPctString = `${(object2.demPct * 100).toLocaleString("en-US", {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      })}%`;
      object2.mapEd = `${TwdToMapEd(item).ed} - ${object2.demPctString}`;

      demMapArray.push(object2);

      for (const item of demMapArray) {
        const demNum = item.demPct * 100;
        let b = 0;
        let g = 0;
        let r = 0;
        if (demNum > 51 && demNum < 101) {
          b = 229;
          if ((50 - demNum) * 5 + 204 < 0) {
            g = 0;
          } else {
            g = (50 - demNum) * 5 + 204;
          }
          if ((50 - demNum) * 7 + 179 < 0) {
            r = 0;
          } else {
            r = (50 - demNum) * 7 + 179;
          }
        } else if (demNum < 49) {
          if ((demNum - 50) * 6 + 184 < 0) {
            b = 0;
          } else {
            b = (demNum - 50) * 6 + 184;
          }
          if ((demNum - 50) * 6 + 184 < 0) {
            g = 0;
          } else {
            g = (demNum - 50) * 6 + 184;
          }
          r = 204;
        } else {
          b = 175;
          g = 175;
          r = 175;
        }
        item.colors = { b: b, g: g, r: r };
      }

      if (checking < 1) {
        parseQ.containedIn("twd", edArray);
        parseQ.limit(100000);
        let queryResults = await parseQ.find();

        for (const item of queryResults) {
          let object = { ed: "", coords: [] };
          object.ed = item.get("twd");
          object.coords = item.get("coords");
          if (
            !(item.get("supp") === "supp" || item.get("supp") === "suppAdded")
          ) {
            edArray2.push(object);
          }
        }
        checking = checking + 1;
        localStorage.setItem("uEstate", checking);
      }

      for (const item of edArray2) {
        let object = { name: "", data: [] };
        object.name = item.ed;
        let tempArray2 = [];
        for (let i = 0; i < item.coords.length - 1; i += 2) {
          let tempArray = [];
          tempArray.push(item.coords[i]);
          tempArray.push(item.coords[i + 1]);
          tempArray2.push(tempArray);
        }
        object.data = [tempArray2];

        tempArray3.push(object);
      }

      for (const item of tempArray3) {
        for (const item2 of demMapArray) {
          if (item.name === item2.ed) {
            item.demPct = item2.demPct;
            item.demPctString = item2.demPctString;
            item.colors = item2.colors;
            item.mapEd = item2.mapEd;
            tempArray4.push(item);
          }
        }
      }
    }
    console.log(tempArray4);
    setEdMapArray(tempArray4);

  };

  for (const item of edMapArray) {
    for (const item2 of regionArray) {
      if (item.name === item2) {
        regionMapArray.push(item);
      }
    }
  }

  useEffect(() => {
    ThisFunc2();
  }, []);

  useEffect(() => {
    console.log(muniType)

    let zoomCoords = "";
    if (regionMuniType === "Town/City") {
      zoomCoords = ZoomCoords(region.toUpperCase());
    } else {
      zoomCoords = ZoomCoords(region.toUpperCase());
    }
    setZoom(zoomCoords.zoom);
    setLatLong([zoomCoords.coordinates[0], zoomCoords.coordinates[1]]);
  }, []);

  const ThisFunc = async () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: latLong,
      zoom: zoom,
    });

    map.on("load", () => {
      regionMapArray.map((item) => {
        map.addSource(item.name, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: item.data,
            },
            properties: {
              name: edButton ? item.mapEd : "",
            },
          },
        });

        // //STYLE LAYER #1
        map.addLayer({
          id: item.name,
          type: "fill",
          source: item.name,
          layout: {},
          paint: {
            "fill-color": `rgb(${item.colors.r}, ${item.colors.g}, ${item.colors.b})`,
            "fill-opacity": 0.6,
            "fill-outline-color": "#aaa",
          },
        });

        if (edButton) {
          //STYLE LAYER #2
          map.addLayer({
            id: `${item.name}b`,
            type: "line",
            source: item.name,
            layout: {},
            paint: {
              "line-color": "#666",
              "line-width": 1,
            },
          });

          map.addLayer({
            id: `${item.name}c`,
            type: "symbol",
            source: item.name,
            layout: {
              "text-field": ["get", "name"],
              "text-size": 13,
              "text-font": ["Arial Unicode MS Bold", "Arial Unicode MS Bold"],
            },
            paint: {
              "text-color": "#ffffff",
              "text-halo-color": "#156c1b",
              "text-halo-width": 25,
            },
          });
        }
      });
    });

    return () => map.remove();
  };

  useEffect(() => {
    ThisFunc();
  }, [ToggleEds]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }}></div>
      <button className="ed-button" onClick={() => ToggleEds()}>
        {edButton ? "Hide ED's" : "Show ED's"}
      </button>
      {hideBox ? (
        <div className="big-map">
          <text>Please be patient...</text>
          <br />
          <text>This is a really big map!</text>
          <button
            className="big-map-button"
            onClick={() => [HideBigMap(), localStorage.setItem("hideBox", "1")]}
          >
            OK, I'll be patient
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ArrayList11R;
