import React, { Component } from "react";
import axios from "axios";
import DataTable2 from "../tables/dataTable2";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import ABCStats from "../stats/abcStats";
import ABCTable from "./abcTable";
import instance from "../../../../baseUrl";

class SellProducts extends Component {
  state = {
    ABCProfit: [],
    ABCSale: [],
    start_date:
      new Date().getFullYear() +
      "-" +
      parseInt(new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    update: false,
    categoryList:[],
    category:'',
  };
  headers = [
    "Т/Р",
    "Мижоз",
    "Манзил",
    "Телефон рақам",
    "Агент",
    "Маҳсулот",
    "Миқдори",
    "Нархи",
    "Чегирма",
    "Ҳолати 3",
    "Кирим куни",
  ];
  async componentDidMount() {
    this.getNetProfitABC();
    this.getSaleABC();
    this.getCategoryList()
  }
  getNetProfitABC = async () => {
    const url = "/report/net-profit-abc-analysis/";
    await instance(url).then((response) =>
      this.setState({ ABCProfit: response.data })
    );
  };
  getSaleABC = async () => {
    const url = "/report/sale-abc-analysis/";
    await instance(url).then((response) =>
      this.setState({ ABCSale: response.data })
    );
  };

  onSetDay = async (start_date) => {
    await this.setState({
      start_date,
      update: true,
    });
  };

  onSetWeek = async (start_date) => {
    await this.setState({
      start_date,
      update: true,
    });
  };
  onSetMonth = async (start_date) => {
    await this.setState({
      start_date,
      update: true,
    });
  };
  onFilterDateSubmit = async (startDate, endDate) => {
    await this.setState({
      start_date: startDate,
      end_date: endDate,
      update: true,
    });
  };
  breakUpdate = (value) => {
    this.setState({ update: value });
  };
  getCategoryList = async () => {
    let productList = await instance.get(`/user/agent-list/`);
    console.log(productList);
    this.setState({
      categoryList:productList.data
    })
  };
  handleDepartment =(e)=>{
    const {value} = e.target;
    this.setState({
      category:value
    })

  }
  render() {
    console.log(this.state.categoryList,'categoryList')
    const name = "sellProduct";
    if (typeof this.state.ABCSale && this.state.ABCProfit !== undefined) {
      return (
        <div>
          <div className="page-header">
            <PageMap page_name={"Юк чиққан тарихи"} />
        
               <select style={{marginRight:'20px'}} name="department" className="selectStyle" onChange={(e)=>this.handleDepartment(e)}>
              <option value="">Барчаси</option>
              {this.state.categoryList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.first_name+' '+list.last_name}
                </option>
              );
            })}
            </select>
            <FilterByTime
              onFilterDateSubmit={this.onFilterDateSubmit}
              onSetDay={this.onSetDay}
              onSetWeek={this.onSetWeek}
              onSetMonth={this.onSetMonth}
            />
          </div>
          <DataTable2
            name={name}
            headers={this.headers}
            url={`/order/sell-order-list/?agent=${this.state.category}`}
            start_date={this.state.start_date}
            end_date={this.state.end_date}
            categoryId = {this.state.category}
          />
          <div className="graphics-box">
            <div className="graphics">
              <div className="column-graphics">
                <div className="graphics-item">
                  <ABCStats
                    name={"АБC Савдо Таxлили"}
                    code={"sale"}
                    url={"/report/sale-abc-analysis/"}
                    params={this.state.start_date}
                  />
                </div>
                <div className="graphics-item">
                  <ABCStats
                    name={"АБC Ялпи Даромад Таxлили"}
                    code={"net-profit"}
                    url={"/report/net-profit-abc-analysis/"}
                    params={this.state.start_date}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="total-datas control-product">
            <div className="control-product-item">
              <div className="total-item">
                <span>А Умумий Савдо: </span>
                {this.state.ABCSale.a_category_data === undefined
                  ? ""
                  : this.state.ABCSale.a_category_data.total_price.toFixed(2) +
                    " $"}
              </div>
              <div className="total-item">
                <span>B Умумий Савдо: </span>
                {this.state.ABCSale.b_category_data === undefined
                  ? ""
                  : this.state.ABCSale.b_category_data.total_price.toFixed(2) +
                    " $"}
              </div>
              <div className="total-item">
                <span>C Умумий Савдо: </span>
                {this.state.ABCSale.c_category_data === undefined
                  ? ""
                  : this.state.ABCSale.c_category_data.total_price.toFixed(2) +
                    " $"}
              </div>
            </div>
            <div className="control-product-item">
              <div className="total-item">
                <span>A Ялпи даромад: </span>
                {this.state.ABCProfit.a_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.a_category_data.total_profit.toFixed(
                      2
                    ) + " $"}
              </div>
              <div className="total-item">
                <span>B Ялпи даромад: </span>
                {this.state.ABCProfit.b_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.b_category_data.total_profit.toFixed(
                      2
                    ) + " $"}
              </div>
              <div className="total-item">
                <span>C Ялпи даромад: </span>
                {this.state.ABCProfit.c_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.c_category_data.total_profit.toFixed(
                      2
                    ) + " $"}
              </div>
            </div>
          </div>

          <div className="abc-table">
            <div className="box">
              <ABCTable
                url={"/report/sale-abc-analysis/"}
                params={this.state.start_date}
              />
            </div>
            <div className="box">
              <ABCTable
                url={"/report/net-profit-abc-analysis/"}
                params={this.state.start_date}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default SellProducts;
