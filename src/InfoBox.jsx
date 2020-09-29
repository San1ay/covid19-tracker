import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
export default function InfoBox({ title, cases, total, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${props.active && "infoBox--selected"} ${
        props.isRed && "infobox--red"
      }`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${
            !props.isRed && "InfoBox__cases--green"
          }`}
        >
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} total
        </Typography>
      </CardContent>
    </Card>
  );
}
