import React, { Component } from "react";
import DailySaleChart from "../charts/dailySaleChart";
import instance from "../../../../baseUrl";
class DailySaleStats extends Component {
  state = {
    chartData: [],
  };
  componentDidMount = async () => {
    this._makeApiRequest();
  };

  async _makeApiRequest() {
    let cash = [];
    let credit_card = [];
    let money_transfer = [];
    let cash_dollar = [];
    let cash_sum = [];
    let debt = [];
    const response = await instance.get(this.props.url, {
      params: {
        start_date: this.props.start_date,
        end_date: this.props.end_date,
        department: this.props.department,
      },
    });
    console.log(response);
    response.data.forEach((element) => {
      cash = [
        ...cash,
        {
          date: element.date,
          quantity: element.cash,
        },
      ];
      credit_card = [
        ...credit_card,
        {
          date: element.date,
          quantity: element.credit_card,
        },
      ];
      cash_dollar = [
        ...cash_dollar,
        {
          date: element.date,
          quantity: element.cash_dollar,
        },
      ];
      cash_sum = [
        ...cash_sum,
        {
          date: element.date,
          quantity: element.cash_sum,
        },
      ];
      money_transfer = [
        ...money_transfer,
        {
          date: element.date,
          quantity: element.money_transfer,
        },
      ];
      // debt = [
      //   ...debt,
      //   {
      //     date: element.date,
      //     quantity: element.debt,
      //   },
      // ];
    });

    let dataChart = [
      { name: "cash dollar", data: cash_dollar },
      {
        name: "cash sum",
        data: cash_sum,
      },
      {
        name: "plastik karta",
        data: credit_card,
      },
      {
        name: "pul o'tkazish",
        data: money_transfer,
      },
      // {
      //   name: "debt",
      //   data: debt,
      // },
    ];
    this.setState({ chartData: dataChart });
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this._makeApiRequest();
    }
  }
  render() {
    return (
      <div className="chart-box">
        <DailySaleChart
          name={this.props.name}
          title={this.props.title}
          chartData={this.state.chartData}
          axisY={this.props.axisY}
        />
      </div>
    );
  }
}

export default DailySaleStats;
