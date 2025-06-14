import React, { Component } from "react";
import instance from "../../../../baseUrl";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class SubmitExpense extends Component {
  state = {
    nomi: "",
    izox: "",
    miqdori: "",
    foydalanuvchi: "",
    usersdata: [],
    salarydata: [],
    deleteItem: [],
    btn_type: "Тасдиқлаш",
    update: false,
    id: "",
    creditial: "",
    start_date: "",
  };
  componentDidMount() {
    this.getUsersData(this.state.start_date);
  }
  getUsersData = async (start_date) => {
    const url = "/expense_discount/expense-list/";
    instance
      .get(url, {
        params: {
          start_date: start_date,
        },
      })
      .then((res) => {
        this.setState({ usersdata: res.data.expenses });
      });
  };
  onSubmit = (e, user, quantity, payment_type) => {
    const url = `/expense_discount/expense-detail/${e}/`;
    instance
      .patch(url, { approved: true, user, quantity, payment_type })
      .then((response) => {
        console.log(response);
        if (response.data != null) {
          this.setState({
            usersdata: this.state.usersdata.filter((user) => user.id != e),
          });
        } 
        alert(response.data)
      });
  };
  onRefuse = (e) => {
    const url = `/expense_discount/expense-detail/${e}/`;
    instance.delete(url, { approved: false }).then((response) => {
      //   if (response.data != null) {
      //     this.setState({
      //       usersdata: this.state.usersdata.filter((user) => user.id != e),
      //     });
      //   }
    });
  };

  render() {
    const { usersdata } = this.state;
    let count = 0;
    console.log(usersdata);
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Харажатларни  Тасдиқлаш"} />
        </div>
        <div className="register-box _expense">
          <div className="register-table-box table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/R</td>
                  <td scope="col">Номи</td>
                  <td scope="col">Изох</td>
                  <td scope="col">Миқдори</td>
                  <td scope="col">Фойдаланувчи</td>
                  <td scope="col">Сана</td>
                  <td scope="col">Тасдиқлаш</td>
                </tr>
              </thead>
              {usersdata.map((user) => {
                count++;
                {
                  if (user.approved === false) {
                    return (
                      <tbody key={user.id}>
                        <tr>
                          <td>{count}</td>
                          <td>{user.name}</td>
                          <td>{user.description}</td>
                          <td>{user.quantity}</td>
                          <td>
                            {user.user === null
                              ? "Исм киритилмаган"
                              : user.user.first_name +
                                " " +
                                user.user.last_name}
                          </td>
                          <td>{user.created_date.slice(0, 10)}</td>
                          <td className="d-flex justify-content-center">
                            <i
                              className="far fa-check-circle"
                              onClick={() =>
                                this.onSubmit(
                                  user.id,
                                  user.user.id,
                                  user.quantity,
                                  user.payment_type
                                )
                              }
                            ></i>
                            <i
                              className="fas fa-times-circle"
                              onClick={this.onRefuse.bind(this, user.id)}
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                }
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default SubmitExpense;
