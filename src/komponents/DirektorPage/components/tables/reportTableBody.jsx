import React, { Component } from "react";
import Loading from "../../../../img/loading-5.gif";

class ReportTableBody extends Component {
  state = {};
  render() {
    let count = 0;
    if (typeof this.props.reportList.data === "undefined") {
      return (
        <div className="loading-box">
          <img src={Loading} alt="" />
        </div>
      );
    } else {
      return (
        <>
          {this.props.reportList.data.map((user,idx) => {
            count++;
                return (
                  <tbody key={idx}>
                    <tr>
                      <td>{count}</td>
                      <td>{user.agent}</td>
                      <td>{user.product}</td>
                      <td>{user.category}</td>
                      <td>
                        {user.outcome_price}
                      </td>
                      <td>{user.agent_sell_price}</td>
                      <td className="d-flex justify-content-center">
                      {user.given_quantity}
                      </td>
                    </tr>
                  </tbody>
                );
              
          })}
        </>
      );
    }
  }
}

export default ReportTableBody;
