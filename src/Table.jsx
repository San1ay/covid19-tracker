import React from "react";
import "./Table.css";
import numeral from "numeral";
import { sortData } from "./util";
export default function Table({ worldcases, onClick, countries, caseType }) {
  const sortedCoutries = sortData(countries, caseType);
  return (
    <div className="table">
      <tr onClick={() => onClick("worldwide")}>
        <td>
          <img className="flag" src="world_image.png" alt="Globe" />
          Worldwide
        </td>
        <strong>
          {<td>{numeral(worldcases[caseType]).format("0,0")}</td>}
        </strong>
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
