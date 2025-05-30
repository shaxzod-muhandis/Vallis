// page 5

import React, { Component } from "react";
import instance from "../../../../baseUrl";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { baseUrl } from "../../constants";
import ModalImage from "react-modal-image";
import PageMap from "../page-road-map/page-map";

class AgentReport extends Component {
  state = {
    userReport: [],
    setQuery: "",
  };

  componentDidMount() {
    this.getReportData();
  }

  getReportData = () => {
    const url = "/warehouse/agent-report/";
    instance(url).then((res) => {
      console.log(res);
      this.setState({ userReport: res.data });
    });
  };
  modalImage = (e) => {
    let img = e.target.src;
  };
  onDeleteReport = (e) => {
    const url = `/report/agent-photo-report-detail/`;
    instance.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          userReport: this.state.userReport.filter((data) => data.id != e),
        });
      }
    });
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "O'chirish uchun tasdiqlang",
      buttons: [
        {
          label: "O'chirish",
          onClick: () => this.onDeleteReport(e),
        },
        {
          label: "Qaytish",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  render() {
    let count = 0;
    return (
      <div>
        <PageMap page_name={"Agentlar Hisoboti"} />
        {/* <div className="search">
          <input type="search" placeholder="Search"
            value={this.state.setQuery} onChange={(e) => this.setState({ setQuery: e.target.value })} />
          <i className="fas fa-search"></i>
        </div> */}
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">Agent</td>
                <td scope="col">Rasm</td>
                <td scope="col">Izox</td>
                <td scope="col">Yuborilgan kun</td>
                <td scope="col">O'chirish</td>
              </tr>
            </thead>
            <tbody>
              {this.state.userReport.map((report) => {
                count++;
                var splits = report.created_date.slice(0, 10);
                return (
                  <tr key={report.id}>
                    <td>{count}</td>
                    <td>
                      {report.agent.first_name +
                        report.agent.last_name}
                    </td>
                    {/* <td><img src={`${baseUrl + report.image}`} alt="agent-photo-report" onClick={this.modalImage} /></td> */}
                    <td className="image-td">
                      {
                        
                        
                        report.images.length ?  report.images.map(img=>{
                           return <div className = "my-1">
                             <ModalImage
                             className="modal-report-image"
                          small={`${img.image}`}
                          large={`${img.image}`}
                          alt="Agent report image"
                        />
                           </div>
                        }):"" 
                      }
                      
                      {/* <img src={report.images[0]?.image} alt="" style = {{width: '15px'}} /> */}
                    </td>
                    <td className="td-comment">{report.comment}</td>
                    <td>{splits}</td>
                    <td>
                      <i
                        className="fas fa-trash"
                        onClick={this.onDeleteAlert.bind(this, report.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AgentReport;
