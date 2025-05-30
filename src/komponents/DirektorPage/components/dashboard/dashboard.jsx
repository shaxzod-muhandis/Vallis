import React, { Component } from "react";
import DailySaleStats from "../stats/dailySaleStats";
// import axios from "axios";
import instance from "../../../../baseUrl";
import "./dashboard.css";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import ABCStats from "../stats/abcStats";
import MonthlyTurnOver from "../stats/monthlyTurnoverStats";

class Dashboard extends Component {
  state = {
    infos: [],
    total: 0,
    cash: 0,
    plastic: 0,
    transfer: 0,
    card_update: false,
    current_date: "Ҳафталик савдо",
    chart_date: "Ҳафталик савдо",
    warehouseList: [],
    warehouse: "",
    departmentList: [],
    category: "",
  };

  componentDidMount() {
    this.getSaleInfo();
    // this.getWarehouse()
    // this.getDepartmentList()
  }
  //118 119 / 64 65
  getSaleInfo = async (warehouse, category) => {
    const url = `/report/data-daily-sale/`;
    instance(url, { params: { start_date: this.state.start_date } }).then(
      (info) =>
        this.setState({
          infos: info.data,
          card_update: false,
          total: info.data.reduce((a, b) => a + b.total, 0),
          cash: info.data.reduce((a, b) => a + b.cash, 0),
          cash_sum: info.data.reduce((a, b) => a + b.cash_sum, 0),
          cash_dollar: info.data.reduce((a, b) => a + b.cash_dollar, 0),
          total_debt: info.data.reduce((a, b) => a + b.total_debt, 0),
          plastic: info.data.reduce((a, b) => a + b.credit_card, 0),
          transfer: info.data.reduce((a, b) => a + b.money_transfer, 0),
        })
    );
  };

  componentDidUpdate() {
    let total = 0;
    let cash = 0;
    let plastic = 0;
    let transfer = 0;
    let cash_sum = 0;
    let cash_dollar = 0;
    let total_debt = 0;
    this.state.infos.map((data) => {
      total = total + data.total;
      cash = cash + data.cash;
      cash_sum = cash_sum + data.cash_sum;
      total_debt = total_debt + data.total_debt;
      cash_dollar = cash_dollar + data.cash_dollar;
      plastic = plastic + data.plastic;
      transfer = transfer + data.transfer;
    });
    if (this.state.card_update === true) {
      this.getSaleInfo();
    }
  }

  onSetDay = async (date) => {
    await this.setState({
      start_date: date,
      card_update: true,
      current_date: "Кун",
      chart_date: "Бугунги Савдо",
    });
    await this.getSaleInfo();
  };

  onSetWeek = async (date) => {
    await this.setState({
      start_date: date,
      card_update: true,
      current_date: "Ўтган Ҳафта",
      chart_date: "Ўтган Ҳафталик Савдо",
    });
    await this.getSaleInfo();
  };
  onSetMonth = async (date) => {
    await this.setState({
      start_date: date,
      card_update: true,
      current_date: "Ўтган Ой",
      chart_date: "Ўтган Ойлик Савдо",
    });
    await this.getSaleInfo();
  };

  onFilterDateSubmit = async (startDate, endDate) => {
    await this.setState({
      card_update: true,
      start_date: startDate,
      end_date: endDate,
      current_date: startDate + " дан " + endDate + " гача",
      chart_date: startDate + " дан " + endDate + " гача",
    });
    await this.getSaleInfo();
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Дашбоард"} />
          <FilterByTime
            onFilterDateSubmit={this.onFilterDateSubmit}
            onSetDay={this.onSetDay}
            onSetWeek={this.onSetWeek}
            onSetMonth={this.onSetMonth}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "start" }}></div>
        <div className="dashboard-top">
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-cart-arrow-down"></i>
            </div>
            <div className="card-title">Умумий Савдо</div>
            <div className="count">{this.state?.total + " $"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="card-title">Нақд сум</div>
            <div className="count">{this.state?.cash_sum + " $"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="card-title">Нақд доллар</div>
            <div className="count">{this.state?.cash_dollar + " $"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="far fa-credit-card"></i>
            </div>
            <div className="card-title">Пластик</div>
            <div className="count">{this.state?.plastic + " $"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-university"></i>
            </div>
            <div className="card-title">Банк орқали</div>
            <div className="count">{this.state?.transfer + " $"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="  fas fa-money-check-alt"></i>
            </div>
            <div className="card-title">Насия</div>
            <div className="count">{this.state?.total_debt + "$"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
        </div>
        cash_sum
        <div className="graphics-box">
          <div className="graphics">
            <DailySaleStats
              title={{
                title: `${this.state.chart_date}`,
                titleAxisY: "Пул миқдори",
                suffix: "$",
              }}
              axisY={"quantity"}
              name={"name"}
              url={`/report/data-daily-sale/`}
              start_date={this.state.start_date}
              end_date={this.state.end_date}
            />
          </div>
        </div>
        <div className="graphics-box">
          <div className="graphics">
            <MonthlyTurnOver
              name={"Ойлик пул айланма"}
              nameAxisY={"$"}
              url={`/report/monthly-turnover/`}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
