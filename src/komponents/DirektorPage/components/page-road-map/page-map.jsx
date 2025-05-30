import React, { Component } from "react";
import { useState } from "react";
import StatisticsDataTable from "../tables/statistics_data_table";
import "./page-map.css";
const PageMap = (props) => {
  const [state, setState] = useState("");
  return (
    <div className="road-map-box">
      <h4>{props.page_name}</h4>
      <p>{props.text}</p>
    </div>
  );
};

export default PageMap;
