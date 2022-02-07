import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import LoadMapEdArray from "../dataFolder/LoadMapEdArray";
import "mapbox-gl/dist/mapbox-gl.css";
import Parse from "parse";
import EdArray from "../dataFolder/EdArray";
import GetDemPct from "../dataFolder/GetDemPct";
import LoadingSpinner from "../LoadingSpinner";
import ZoomCoords from "../mapFolder/ZoomCoords";
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FzaGlraTIyNTEyMSIsImEiOiJja3QzcThmMTUwa2J3MzJudDdnaDVpeG5mIn0.MiGBhPWKUsgW4Y7gbw4pQA";

const ArrayList11 = () => {
  const mapContainer = useRef();
  const [edMapArray, setEdMapArray] = useState([]);
  const [edButton, setEdButton] = useState(false);
  const [hideBox, setHideBox] = useState(false);
  let loadingInt = localStorage.getItem("loadingInt");
  const [zoom, setZoom] = useState(10);
  const [latLong, setLatLong] = useState([-73.7619, 41.1129]);
  const parseQ = new Parse.Query(`Coords2016`);
  const muniType = localStorage.getItem("muniType");
  const muniName = localStorage.getItem("muniName");
  const office = localStorage.getItem("office");
  let checking = +localStorage.getItem("uEstate");
  const hideBoxstorage = localStorage.getItem("hideBox");
  let test = [];
  let loading;

  if (localStorage.getItem("loadingInt") === "0") {
    loading = true;
  }

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

  let edArray = [];
  if (
    (muniType === "Town/City" || muniType === "Village") &&
    !office.includes("City Council")
  ) {
    test = EdArray(muniName);
  } else {
    test = EdArray(office);
  }
  const test2 = [...new Set(test)];

  const demCandArray = GetDemPct(test2);

  console.log(muniType)

  useEffect(() => {
    if (demCandArray.length > 500 && hideBoxstorage === "hide") {
      setZoom(11);
      setHideBox(true);
    }
  });


  useEffect(() => {
    let zoomCoords = ""
    if (muniType === "Town/City") {
      zoomCoords = ZoomCoords(muniName.toUpperCase())
    } else {
      zoomCoords = ZoomCoords(office.toUpperCase())
    }
    setZoom(zoomCoords.zoom)
    setLatLong([zoomCoords.coordinates[0], zoomCoords.coordinates[1]])    
  }, []);


  const ThisFunc = async () => {

    if (checking < 1) {
      console.log("SDJFSJDJSDF")
      parseQ.containedIn("twd", test2);
      parseQ.limit(100000);
      let queryResults = await parseQ.find();

      for (const item of queryResults) {
        let object = { ed: "", coords: [] };
        object.ed = item.get("twd");
        object.coords = item.get("coords");
        if (
          !(item.get("supp") === "supp" || item.get("supp") === "suppAdded")
        ) {
          edArray.push(object);
        }
      }
      setEdMapArray(edArray);
      checking = checking + 1;
      localStorage.setItem("uEstate", checking);
    }
    let tempArray3 = [];

    for (const item of edMapArray) {
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
      for (const item2 of demCandArray) {
        if (item.name === item2.ed) {
          item.demPct = item2.demPct;
          item.demPctString = item2.demPctString;
          item.colors = item2.colors;
          item.mapEd = item2.mapEd;
        }
      }
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: latLong,
      zoom: zoom,
    });

    if (tempArray3.length > 0) {
      loading = false;
      localStorage.setItem("loadingInt", "1");
    }

    localStorage.setItem("mapArray", JSON.stringify({ mapArray: tempArray3 }));

    if (tempArray3.length > 500) {
      tempArray3 = "";
    }

    map.on("load", () => {
      tempArray3.map((item) => {
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
          // STYLE LAYER #2
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
  }, [demCandArray]);
  // localStorage.setItem("hideBox", 1)

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }}></div>
      <button className="ed-button" onClick={() => ToggleEds()}>
        {edButton ? "Hide ED's" : "Show ED's"}
      </button>
      {loading ? (
        <div className="map-spinner">
          <LoadingSpinner />
        </div>
      ) : null}
      {hideBox ? (
        <div className="big-map">
          <text is="webView">This map is very large and may not render.</text>
          <br />
          <br />
          <text is="webView">
            But you may view a map of a smaller area of this election using the
            "Regional Results" function
          </text>
          <button
            className="big-map-button"
            onClick={() => [HideBigMap(), localStorage.setItem("hideBox", "1")]}
          >
            OK
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ArrayList11;
