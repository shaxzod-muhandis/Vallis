import React, { Component } from "react";
import FilterByTime from "../CalendarFilter/filterByTime";
import PageMap from "../page-road-map/page-map";
import Statistics from "../statistics/statistics";
import DateSaleStats from "../stats/dateSaleStats";
import DataTable from "../tables/dataTable";
import instance from "../../../../baseUrl";
class BuyProducts extends Component {
  state = {
    infos: [],
    start_date: "",
    end_date: "",
    update: false,
    newWarehouseId: "",
    warehouses: [],
  };

  onSetDay = (start_date) => {
    this.setState({
      start_date,
      update: true,
    });
  };

  onSetWeek = (start_date) => {
    this.setState({
      start_date,
      update: true,
    });
  };
  onSetMonth = (start_date) => {
    this.setState({
      start_date,
      update: true,
    });
  };
  onFilterDateSubmit = (startDate, endDate) => {
    this.setState({
      start_date: startDate,
      end_date: endDate,
      update: true,
    });
  };

  componentDidMount = async () => {
    try {
      const res = await instance.get("/warehouse/warehouses/");
      this.setState({ warehouses: res.data.results });
      console.log(res.data.results);
    } catch (error) {}
  };
  breakUpdate = (value) => {
    this.setState({ update: value });
  };
  render() {
    const headers = [
      "Т/Р",
      "Таминотчи",
      "Маъсул шахс",
      "Қарз",
      "Умумий қиймат",
      // "Кирим нархи",
      // "Қиймати",
      // "Дебт",
      // "Кирим куни",
    ];
    const name = "buyProduct";
    return (
      <div>
        <div className="page-header">
          <PageMap page_name={"Маҳсулотлар Кирими"} />
          <select
            className="warehouseId"
            onChange={(e) => this.setState({ newWarehouseId: e.target.value })}
          >
            <option value="">Barchasi</option>
            {this.state.warehouses.map((item) => {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
          <FilterByTime
            onFilterDateSubmit={this.onFilterDateSubmit}
            onSetDay={this.onSetDay}
            onSetWeek={this.onSetWeek}
            onSetMonth={this.onSetMonth}
          />
        </div>
        <DataTable
          name={name}
          headers={headers}
          url={`/order/providers-info/`}
          start_date={this.state.start_date}
          end_date={this.state.end_date}
          newWarehouseId={this.state.newWarehouseId}
        />

        <div>
          <Statistics newWarehouseId={this.state.newWarehouseId} />
        </div>
        <div className="pie-chart">
          <DateSaleStats
            url={"/order/data-pie-chart/"}
            start_date={this.state.start_date}
            end_date={this.state.end_date}
            updateData={this.state.update}
          />
        </div>
      </div>
    );
  }
}

export default BuyProducts;
