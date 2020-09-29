import React from "react";
import "./Table.css";
import numeral from "numeral";
import { sortData } from "./util";
export default function Table({ onClick, countries, caseType }) {
  const sortedCoutries = sortData(countries, caseType);
  return (
    <div className="table">
      {sortedCoutries.map(({ countryInfo, country, [caseType]: cases }) => (
        <tr onClick={() => onClick(countryInfo.iso2)}>
          <td>
            <img className="flag" src={countryInfo.flag} alt="flag" />
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
