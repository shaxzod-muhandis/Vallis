import React, { Component, useState } from "react";
import Loading from "../../../../img/loading-5.gif";
import instance from "../../../../baseUrl";
import { useHistory } from "react-router-dom";

const BuyTableBody = (props) => {
  const [state, setState] = useState({
    incomeList: "",
  });
  const history = useHistory()
  let count = 0;
  let total_price = 0;
  if (typeof props.orderList === "undefined") {
    return (
      <div className="loading-box">
        <img src={Loading} alt="" />
      </div>
    );
  } else {
    return (
      <>
        <tbody>
          {props.orderList.map((order, index) => {
            const numDebt = order?.total_debt;
            const formattedDebt = numDebt?.toLocaleString("en-US");

            const numValue = order?.total_value;
            total_price += +numValue;
            const formattedValue = numValue?.toLocaleString("en-US");
            // var splits = order?.created_date.slice(0, 10);
            count++;
            return (
              <tr
                onClick={() =>
                  history.push(`/director/provider/${order.id}`)
                }
                style={{cursor:"pointer"}}
                key={order?.id}
              >
                <td>{count}</td>
                <td>{order?.name}</td>
                <td>{order?.responsible_agent}</td>
                <td>$ {formattedDebt}</td>
                <td> $ {formattedValue}</td>
                {/* <td>{order?.quantity + `${""}` + order?.product?.unit}</td> */}
                {/* <td className="text-success">{order?.price?.price}</td> */}
                {/* <td>{order?.quantity * order?.price?.price}</td> */}
                {/* <td className="text-danger">{order?.debt}</td> */}
                {/* <td>{splits}</td> */}
              </tr>
            );
          })}
        </tbody>
        {total_price? <div className="total-price">
          <span>Жами қиймати: </span>
          <p>{total_price + " So'm"}</p>
        </div>:null}
      </>
    );
  }
};

export default BuyTableBody;
