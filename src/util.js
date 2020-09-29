import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from "react-leaflet";


// Sort countries on basis of Cases
export const sortData = (data, dataType = 'cases') => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a[dataType] > b[dataType]) {
      return -1;
    } else {
      return 1;
    }
  }); return sortedData;
};

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
//Draw Circles on Map
export const showDataOnMap = (data, casesType = 'cases') => (
  data.map(country => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fill={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div className="info-flag" >
            <img
              // className="flag"
              src={country.countryInfo.flag}
              alt={"Flag of " + country.country}
            />
          </div>
          <div className="info-name">{country.country}</div>
          <div className="info-cases">Cases :{numeral(country.cases).format("0,0")} </div>
          <div className="info-recovered">Recoverd:{numeral(country.deaths).format("0,0")} </div>
          <div className="info-deaths">Deaths :{numeral(country.deaths).format("0,0")} </div>
        </div>
      </Popup>
    </Circle>
  ))
);


//
export const prettyPrintStat = stat => stat ? `+${numeral(stat).format("0.00a")}` : "None";