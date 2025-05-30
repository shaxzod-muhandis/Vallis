import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";
import DataTable from "../tables/dataTable";
import StatisticsDataTable from "../tables/statistics_data_table";
import instance from "../../../../baseUrl";
class Statistics extends Component {
  state = {
    statisticsData: [],
  };
  async componentDidMount() {
    this.getStatisticsData();
  }
  getStatisticsData = async () => {
    const url = "/report/statistics/";
    await instance(url).then((response) => {
      this.setState({ statisticsData: response.data.total });
    });
    console.log(this.state.statisticsData);
  };

  render() {
    console.log(this.props);
    const headers = [
      "Т/Р",
      "Маҳсулот",
      "Қолдиқ",
      "Кирим Нархи",
      "Сотиш Нархи",
      "Ўртача Кунлик Савдо",
      "Норматив, кун",
      "Умимий Қолдиқ, $",
      "Қолдиқ, кун",
      "Ялпи даромад, кунлик",
      "Ялпи Даромадда улушлар",
      "Маржа",
      "Устама",
      "ООС сабабли йўқотиш",
      "Музлатилган пул",
      "Музлатилган пул қолдиққа нисбатан фоизда",
      "Керакли Маҳсулот",
      "Керакли пул",
    ];
    const name = "statistics";
    console.log(this.state.statisticsData.total_residue);
    return (
      <>
        <div className="page-header mt-5">
          <PageMap page_name={"Ortiqcha Zaxira / Zaxirada mavjud emas"} />
          <div className="total-datas">
            <div className="total-item">
              <span>ООС сабабли йўқотиш: </span>
              {this.state.statisticsData.OOS
                ? this.state.statisticsData.OOS.toFixed(2) + " $"
                : ""}
            </div>
            <div className="total-item">
              <span>Кунлик Ялпи Даромад: </span>
              {this.state.statisticsData.daily_total_income !== undefined
                ? this.state.statisticsData.daily_total_income.toFixed(2) +
                  " $"
                : "" + " $"}
            </div>
            <div className="total-item">
              <span>Музлатилган Пул: </span>
              {this.state.statisticsData.frozen_money !== undefined
                ? this.state.statisticsData.frozen_money.toFixed(2) + " $"
                : "" + " $"}
            </div>
            <div className="total-item">
              <span>Умумий Қолдиқ: </span>
              {this.state.statisticsData.total_residue !== undefined
                ? this.state.statisticsData.total_residue.toFixed(2) + " $"
                : "" + " $"}
            </div>
          </div>
        </div>
        <StatisticsDataTable
          headers={headers}
          name={name}
          newWarehouseId={this.props.newWarehouseId}
          url={"/report/statistics/"}
        />
      </>
    );
  }
}

export default Statistics;
