import React, { useEffect, useState } from "react";
import "./Table.css";
import numeral from "numeral";
import { sortData } from "./util";
export default function Table({ onClick, countries, caseType }) {
  const sortedCoutries = sortData(countries, caseType);
  const [worldData, setworldData] = useState(0);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => setworldData(data));
  }, []);

  return (
    <div className="table">
      <tr onClick={() => onClick("worldwide")}>
        <td>
          <img className="flag" src="world_image.png" alt="Globe" />
          Worldwide
        </td>
        <strong>{<td>{numeral(worldData[caseType]).format("0,0")}</td>}</strong>
      </tr>
      {sortedCoutries.map(({ countryInfo, country, [caseType]: cases }) => (
        <tr onClick={() => onClick(countryInfo.iso2)}>
          <td>
            <img
              className="flag"
              src={countryInfo.flag}
              alt={"flag of " + country}
            />
            {country}
          </td>
          <strong>
            <td>{numeral(cases).format("0,0")}</td>
          </strong>
        </tr>
      ))}
    </div>
  );
}
