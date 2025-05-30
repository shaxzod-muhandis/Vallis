import axios from "../../../../baseUrl";
import React, { Component } from "react";
import Loading from "../../../../img/loading-5.gif";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

class StatisticsTableBody extends Component {
  state = {
    modal: false,
    id: 0,
    estimated_delivery_days: 0,
    info: false,
  };

  handleEdit = (id) => {
    this.setState({
      id: id,
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
      id: 0,
    });
  };
  handleEdited = () => {
    const send = {
      estimated_delivery_days: this.state.estimated_delivery_days,
    };
    this.setState({
      modal: true,
    });
    axios
      .put(`/product/product-edit-days/${this.state.id}/`, send)
      .then(() => {
        setTimeout(() => {
          this.setState({
            id: 0,
            modal: false,
            info: true,
          });
        }, 1500);
      })
      .catch((error) => {
        console.log({ errorMessage: error.toString() });
        this.setState({
          id: 0,
          modal: false,
        });
      });
  };

  render() {
    let count = 0;
    //console.log(this.state.info, "statistika")
    return (
      <React.Fragment>
        <tbody>
          {this.props.statisticsData.data === undefined ? (
            <div className="loading-box">
              <img src={Loading} alt="" />
            </div>
          ) : (
            this.props.statisticsData.data.map((data) => {
              console.log(data);
              count++;
              let total_average = data.rest_quantity * data.average_cost;
              let residue_day =
                (data.rest_quantity / data.average_sell_quantity === Infinity || isNaN(data.rest_quantity / data.average_sell_quantity))
                  ? 0
                  : data.rest_quantity / data.average_sell_quantity;
              let daily_income = isNaN(data.average_price - data.average_cost)
                ? 0
                : (data.average_price - data.average_cost) *
                  data.average_sell_quantity;

              console.log(daily_income, "daily_income");
              console.log(data.average_price, "average_price");

              let margin = 0;
              if (data.average_price === 0) {
                margin = "Sotish narxi 0";
              } else {
                margin =
                  (data.average_price - data.average_cost) / data.average_price;
              }

              let ustama = 0;
              if (data.average_cost === 0) {
                ustama = 0;
              } else {
                ustama =
                  (data.average_price - data.average_cost) / data.average_cost;
              }

              let OOS =
                (residue_day - data?.estimated_delivery_days) * daily_income;

              console.log(
                residue_day,
                "resue",
                data.rest_quantity,
                "rest_quantity",
                data.average_sell_quantity,
                "average_sell_quantity"
              );
              console.log(data.estimated_delivery_days, "estimate");
              console.log(OOS, "OOS");
              console.log(daily_income, "daily_income");

              let frozen_money =
                (residue_day - data.estimated_delivery_days) *
                data.average_cost *
                data.average_sell_quantity;

              let frozen_money_prasent = isNaN(frozen_money / total_average)
                ? 0
                : frozen_money / total_average;
              console.log(frozen_money_prasent, "frozen_money_prasent");
              if (residue_day === Infinity) {
                residue_day = 0;
              } else if (residue_day === -Infinity) {
                residue_day = 0;
              } else {
                residue_day = residue_day;
              }
              if (margin === Infinity) {
                margin = 0;
              } else if (margin === -Infinity) {
                margin = 0;
              } else {
                margin = margin;
              }
              if (data.average_sell_quantity === 0) {
                residue_day = 0;
              } else {
                residue_day = residue_day;
              }

              let desired_product =
                (residue_day - data.estimated_delivery_days) *
                data.average_sell_quantity;
              let need_money = desired_product * data.average_cost;
              return (
                <tr key={count}>
                  <td>{count}</td>
                  <td>{data.product_name}</td>
                  <td>{data.rest_quantity.toFixed(2).split('.')[0]}</td>
                  <td>{data.average_cost.toFixed(2).split('.')[0]}</td>
                  <td>{data.average_price.toFixed(2).split('.')[0]}</td>
                  <td>{data.average_sell_quantity.toFixed(2).split('.')[0]}</td>
                  {/*  */}
                  {/* <td className="td_kun" onClick={this.handleEdit.bind(this, data.product_id)}>
                  {data.estimated_delivery_days.toFixed(2).split(".")[0]}
                </td> */}

                  {this.state.id === data.product_id ? (
                    <td className="modal_fade">
                      <input
                        onChange={(e) => {
                          this.setState({
                            estimated_delivery_days: e.target.value,
                          });
                        }}
                        type="number"
                      />
                      <button onClick={this.handleEdited}>
                        <i className="fas fa-check"></i>
                      </button>
                      <button onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                      </button>
                    </td>
                  ) : (
                    <td className="td_kun" onClick={this.handleEdit.bind(this, data.product_id)}>
                      {data.estimated_delivery_days.toFixed(2).split('.')[0]}
                    </td>
                  )}

                  {/*  */}
                  <td>{total_average.toFixed(2).split('.')[0]}</td>
                  <td>{residue_day.toFixed(2).split('.')[0]}</td>
                  <td>{daily_income.toFixed(2).split('.')[0]}</td>
                  <td>
                    {this.props.statisticsData.total.daily_total_income
                      ? (daily_income / this.props.statisticsData.total.daily_total_income).toFixed(
                          2,
                        )
                      : 0}
                  </td>
                  <td>{(data.average_cost - data.average_price) * data.average_price}</td>
                  <td>{ustama.toFixed(2) + ' %'}</td>
                  <td>{OOS.toFixed(2).split('.')[0]}</td>
                  <td>{frozen_money.toFixed(2)}</td>
                  <td>{frozen_money_prasent.toFixed(2)}</td>
                  <td>{desired_product.toFixed(2).split('.')[0]}</td>
                  <td>{need_money.toFixed(2).split('.')[0]}</td>
                </tr>
              );
            })
          )}
        </tbody>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.modal}
          onClose={this.handleClose}
          className="modal_lider"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modal}>
            <CircularProgress />
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StatisticsTableBody;
