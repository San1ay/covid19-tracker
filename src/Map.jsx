import React from "react";
import { Map as LeafMap, TileLayer, Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import "./Map.css";

export default function Map({ darkMode, countries, casesType, center, zoom }) {
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 250,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 250,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 250,
    },
  };

  const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fill={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup className={`info-container ${darkMode ? "dark" : "light"}`}>
          <div>
            <div className="info-flag">
              <img
                // className="flag"
                src={country.countryInfo.flag}
                alt={"Flag of " + country.country}
              />
            </div>
            <div className="info-name">{country.country}</div>
            <div className="info-cases">
              Cases :{numeral(country.cases).format("0,0")}{" "}
            </div>
            <div className="info-recovered">
              Recoverd:{numeral(country.deaths).format("0,0")}{" "}
            </div>
            <div className="info-deaths">
              Deaths :{numeral(country.deaths).format("0,0")}{" "}
            </div>
          </div>
        </Popup>
      </Circle>
    ));

  return (
    <div className={`map ${darkMode ? "dark" : "light"}`}>
      <LeafMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafMap>
    </div>
  );
}
