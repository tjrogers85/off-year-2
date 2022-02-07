import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import LoadMapEdArray from "../dataFolder/LoadMapEdArray";
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FzaGlraTIyNTEyMSIsImEiOiJja3QzcThmMTUwa2J3MzJudDdnaDVpeG5mIn0.MiGBhPWKUsgW4Y7gbw4pQA";

export default function ArrayList10() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.7619);
  const [lat, setLat] = useState(41.1129);
  const [zoom, setZoom] = useState(9.95);

  const dataArray = LoadMapEdArray();

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("load", () => {
      dataArray.map((item) => {
        map.current.addSource(item.name, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: item.data,
            },
            properties: {
              name: item.name,
            },
          },
        });

        // //STYLE LAYER #1
        map.current.addLayer({
          id: item.name,
          type: "fill",
          source: item.name, 
          layout: {},
          paint: {
            "fill-color": "rgb(25,25,25)",
            "fill-opacity": 0.35,
            "fill-outline-color": "#000",
          },
        });

        //STYLE LAYER #2
        map.current.addLayer({
          id: item.name,
          type: "line",
          source: item.name, 
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });
      });
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("load", () => {
      dataArray.map((item) => {
        map.current.addLayer({
          id: item.name,
          type: "line",
          source: item.name, 
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });
      })
    })
  })

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
