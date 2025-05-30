import React, { Component } from "react";
import axios from "axios";
import Option from "../create_price/SelectOption";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import DataTable from "../tables/dataTable";
import instance from "../../../../baseUrl";
import ReactSelect from "react-select";
import { Wrapper } from "./report-style";
class Report extends Component {
  state = {
    usersdata: [],
    agentsList: [],
    salarydata: [],
    postData:[],
    optionSelected: null,
    warehouse: "",
    update: false,
    start_date: "",
    baseUrl: "/report/agents-statistics/",
    url: "/report/agents-statistics/" ,
    end_date: "",
    allOption: {
      label: "Барчасини танлаш",
      value: "*",
    },
  };
  componentDidMount() {
    // this.getReportData(this.state.start_date);
    this.getAgentList();
  }
  getAgentList = async () => {
    const url = "user/agent-list/";
    instance(url).then((res) => {
      console.log(res.data);
      this.setState({ agentsList: res.data });
    });
  };
  // getReportData = async (start_date) => {
  //   const url = "/salary/salary-list/";
  //   instance(url, {
  //     params: {
  //       start_date: start_date,
  //     },
  //   }).then((res) => this.setState({ salarydata: res.data }));
  // };
  onSetDay = async (start_date) => {
    await this.setState({
      url:
        this.state.baseUrl +
        `?start_date=${start_date}&&${this.state.warehouse==='0'?undefined:'warehouse='+this.state.warehouse}`,
      start_date,
      update: !this.state.update,
    });
  };

  onSetWeek = async (start_date) => {
    console.log(start_date);
    await this.setState({
      url:
        this.state.baseUrl +
        `?start_date=${start_date}&&${this.state.warehouse==='0'?undefined:'warehouse='+this.state.warehouse}`,
      start_date,
      update: !this.state.update,
    });
  };
  onSetMonth = async (start_date) => {
    await this.setState({
      url:
        this.state.baseUrl +
        `?start_date=${start_date}&&${this.state.warehouse==='0'?undefined:'warehouse='+this.state.warehouse}`,
      start_date,
      update: !this.state.update,
    });
  };
  handleInput = async(e) => {
    console.log(e.target.value);
    await this.setState({ 
      url:
        this.state.baseUrl +
        `?start_date=${this.state.start_date}&&end_date=${this.state.end_date}&&${e.target.value==='0'?undefined:'warehouse='+e.target.value}`,
        update: !this.state.update,
        // warehouse: this.state.value,
      })
  }
  onFilterDateSubmit = async (startDate, endDate) => {
    await this.setState({
      url:
        this.state.baseUrl +
        `?start_date=${startDate}&&end_date=${endDate}&&${this.state.warehouse==='0'?undefined:'warehouse='+this.state.warehouse}`,
      start_date: startDate,
      end_date: endDate,
      update: !this.state.update,
    });
  };
  // break = (childData) => {
  //   this.setState({ update: childData });
  // };
  render() {
    const name = "reportList";
    const headers = [
      "T/R",
      "Agent",
      "Maxsulot",
      "Kategoriya",
      "Outcomprice",
      "Sellprice",
      "Miqdor",
    ];
    console.log(this.state.agentsList);
    const newArr = this.state.agentsList.map(
      ({ first_name, last_name, id }) => ({
        label: first_name + " " + last_name,
        id: id,
      })
    );
    const addKey = newArr.map((item) =>
      Object.assign(item, { value: item?.label })
    );
    // const { usersdata, salarydata } = this.state;
    // let marketing_quantity = 0;
    // let others_quantity = 0;
    // let total_salary = 0;
    // usersdata.forEach((element) => {
    //   if (element.category === "marketing") {
    //     marketing_quantity =
    //       parseInt(marketing_quantity) + parseInt(element.quantity);
    //   } else {
    //     others_quantity =
    //       parseInt(others_quantity) + parseInt(element.quantity);
    //   }
    // });
    // salarydata.forEach((element) => {
    //   total_salary = parseInt(total_salary) + parseInt(element.salary);
    // });
    return (
      <Wrapper>
        <div className="page-header">
          <PageMap page_name={"Ҳисобот"} />
          <div className="filter_wrapper">
            <select
              className="select_category"
              onChange={this.handleInput}
              name="category"
            >
              <option value="" selected disabled>
                Joriy Kategroiya
              </option>
              <option value='0'>Barchasi</option>
              <option value="vitrina">Vitrina</option>
              <option value="sklad">Sklad</option>
            </select>
            <ReactSelect
              options={[this.state.allOption, ...addKey]}
              isMulti
              placeholder="Joriy Agent"
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
              className="react-select"
              onChange={async(selected = []) => {
                if (
                  selected !== null &&
                  selected.length > 0 &&
                  selected[selected.length - 1].value ===
                    this.state.allOption.value
                ) {
                  const arr = this.state.agentsList.map((item) => item.id);
                  // console.log("salom",selected)
                  // return {
                    await this.setState({
                    optionSelected: this.state.agentsList,
                    postData:arr,
                    url:
                    this.state.baseUrl +
                    `?start_date=${this.state.start_date}&&end_date=${this.state.end_date}&&${this.state.warehouse==='0'?undefined:'warehouse='+this.state.warehouse}`,
                    update: !this.state.update,
                  })
                // }
                }
                else{
                  const arr = selected.map((item) => item.id);
                  await this.setState({
                  postData: arr,
                  optionSelected: selected,
                  url:
                  this.state.baseUrl +
                  `?start_date=${this.state.start_date}&&end_date=${this.state.end_date}&&${this.state.warehouse==='0'?undefined:'warehouse='+this.state.warehouse}`,
                  update: !this.state.update,
                });
                console.log("salom", this.state.optionSelected);
              }
              }}
              allowSelectAll={true}
              value={this.state.optionSelected}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#707491",
                  primary: "#36394c",
                },
              })}
            />
            <FilterByTime
              onFilterDateSubmit={this.onFilterDateSubmit}
              onSetDay={this.onSetDay}
              onSetWeek={this.onSetWeek}
              onSetMonth={this.onSetMonth}
            />
          </div>
        </div>
        <div className="crm-page-header _expense"></div>
        <DataTable
          name={name}
          headers={headers}
          url={this.state.url}
          updateTable={this.state.update}
          agents={this.state.postData}
        />
      </Wrapper>
    );
  }
}

export default Report;
