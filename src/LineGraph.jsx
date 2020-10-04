import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
// import { red } from "@material-ui/core/colors";

export default function LineGraph({ darkMode, caseType, country = "all" }) {
  const [data, setData] = useState({});
  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: darkMode ? "white" : "black",
          },
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: darkMode ? "white" : "black",
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  //"https://disease.sh/v3/covid-19//all?lastdays=30"

  const buildChartData = (data, dataType = "cases") => {
    const chartData = [];
    let lastData;
    // console.log(data[dataType]);
    // data[dataType].forEach((date) => {
    for (let date in data[dataType]) {
      if (lastData) {
        const newData = {
          x: date,
          y: data[dataType][date] - lastData,
        };

        chartData.push(newData);
      }
      lastData = data[dataType][date];
      // console.log(lastData);
    }

    return chartData;
  };

  useEffect(() => {
    console.log("c", country);
    fetch(
      `https://disease.sh/v3/covid-19/historical/${
        country === "worldwide" ? "all" : country
      }?lastdays=90`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (country === "all" || country === "worldwide")
          setData(buildChartData(data, caseType));
        else {
          setData(buildChartData(data.timeline, caseType));
        }
        // console.log(data);
      });
  }, [caseType, country]);

  return (
    <div className="LineGraph">
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204,16,52,0.5)",
                borderColor: "#cc1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}
