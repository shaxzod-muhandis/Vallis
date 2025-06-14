import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import BuyProducts from "../DirektorPage/components/buyProducts/buyProducts";
import ClientStats from "../DirektorPage/components/CRM/clientStats";
import Register from "../DirektorPage/components/HRM/addingStaff";
import Sm_Sidebar from "./components/sidebar/sm-sidebar/sm-sidebar";

class ControlBuyProduct extends Component {
  state = {
    dataUpdate: null,
    notif: true,
    count: true,
    department: "",
    car: "",
    agent: "",
  };

  handleCallback = (childData) => {
    this.setState({ dataUpdate: childData });
  };
  parentNotif = (childData, count) => {
    this.setState({ notif: childData, count });
  };
  handleDepartment = (id) => {
    this.setState({ department: id });
  };
  handleFilterCar = (car) => {
    this.setState({ car });
  };
  handleFilterAgent = (agent) => {
    this.setState({ agent });
  };
  render() {
    // console.log(this.state.department);
    const token = sessionStorage.getItem("token");
    if(token === null) {
      this.props.history.push("/")
    }
    return (
      <React.StrictMode>
        <HashRouter>
          <Sm_Sidebar
            parentCallback={this.handleCallback}
            count={this.state.count}
            parentNotif={this.parentNotif}
            handleDepartment={this.handleDepartment}
          />
          <div
            className={
              this.state.dataUpdate
                ? "main-content-box toggle"
                : "main-content-box "
            }
          >
            <Switch>
              <Route path={`/director/product`} component={BuyProducts} />
            </Switch>
          </div>
        </HashRouter>
      </React.StrictMode>
    );
  }
}

export default ControlBuyProduct;
