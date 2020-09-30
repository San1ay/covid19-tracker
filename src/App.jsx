import React, { useState, useEffect } from "react";
import { FormControl, CardContent, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";
import "./App.css";
import "./InfoBox.css";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { prettyPrintStat } from "./util";
import "leaflet/dist/leaflet.css";
import { Sugar } from "react-preloaders";
import numeral from "numeral";

// import Footer from "./Footer";

export default function App() {
  const [countries, setCountries] = useState(["Nepal", "India"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 26.7957, lng: 86.2971 });
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const con = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));
          setLoading(false);
          setTableData(data);
          setCountries(con);
          setMapCountries(data);
        });
    };
    getCountriesData();
    onCountryChange("worldwide");
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target ? e.target.value : e;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === "worldwide"
          ? setMapCenter({ lat: 26.7957, lng: 86.2971 })
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  return (
    <>
      <Sugar
        customLoading={loading}
        animation="slide"
        background="rgb(40, 207, 236)"
      />
      <div className="app">
        <div className="app__left">
          <div className="app_header">
            <h1>COVID-19 Tracker</h1>
            <h3>
              Data are pulled from Worldometer
              <br /> (disease.sh API)
            </h3>
            <FormControl key="f" className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem key="worldwide" value="worldwide">
                  <img className="gflag" src="./world_image.png" alt="Globe" />
                  Worldwide
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.value} value={country.value}>
                    <img
                      className="flag"
                      src={country.flag}
                      alt={"Flag of " + country.name}
                    />
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0,0")}
            ></InfoBox>
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0,0")}
            ></InfoBox>
            <InfoBox
              isRed
              title="Death"
              active={casesType === "deaths"}
              onClick={(e) => setCasesType("deaths")}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0,0")}
            ></InfoBox>
          </div>

          <Map
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
          />
        </div>
        <div className="app__right">
          <CardContent>
            <div className="app__right__Table">
              <h1>Total {casesType} by Country</h1>
              <Table
                countries={tableData}
                onClick={onCountryChange}
                caseType={casesType}
              />
            </div>
            <div className="app__right__LineGraph">
              <h3>
                {countryInfo.country ? countryInfo.country : "Worldwide"} :
                {casesType.charAt(0).toUpperCase() + casesType.slice(1)} in 90
                days
              </h3>
              <LineGraph country={country} caseType={casesType} />
            </div>
          </CardContent>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
