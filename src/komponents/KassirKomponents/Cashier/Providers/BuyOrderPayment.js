// page 2
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import instance from "../../../../baseUrl";
import FilterByDepartment from "../DepartmentBudget/filterByDepartment";
import FilterByTime from "../DepartmentBudget/filterByTime";

const BuyOrders = ({ providers, paymentOrderAction }) => {
  const [windowDisplay, setWindowDisplay] = useState("none");
  const [buyOrderPayment, setBuyOrderPayment] = useState({
    payment_type: "",
    payment: "",
  });
  console.log(providers, "paymentsList12");
  const selector = useSelector((state) => state)
  console.log(selector);;
  const [providerNameFullInfo, setproviderNameFullInfo] = useState({
    sellOrderId: "",
    providerFName: "",
    providerDebt: "",
  });
  const history = useHistory()
  const [paymentsList, setPaymentsList] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    setBuyOrderPayment({ ...buyOrderPayment, [name]: value });
  };

  const showOrderPaymentDiv = (sellOrderId, providerName, debt) => {
    console.log(debt);
    setBuyOrderPayment(() => {
      return {
        payment_type: "",
        payment: "",
      };
    });

    let formatValue = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "usd",
    }).format(debt);

    setproviderNameFullInfo(() => {
      return {
        providerFName: providerName,
        sellOrderId: sellOrderId,
        providerDebt: formatValue,
      };
    });

    setWindowDisplay("flex");
    renderTable();
  };
  console.log(paymentsList);
  const paymentOrderActionLocal = () => {
    paymentOrderAction(buyOrderPayment, providerNameFullInfo);
    renderTable();
  };
  // useEffect(() => {
  //   if (selector.paymentList.data.count>=0) {
  //     console.log("asdfghjkl;");
  //   } else {
  //     setPaymentsList(selector?.paymentList?.data);
  //   }
  //   if (selector?.paymentList?.data) {
  //   }
  //   // setPaymentsList(selector?.paymentList?.data);
  // }, [selector]);

  useEffect(async()=>{
    try {
      const res = await instance.get(`/order/providers-info/`)
      setPaymentsList(res.data.data)
    } catch (error) {
      
    }
  },[])
  useEffect(() => {
    if (selector.paymentList.data >= 0) {
      setPaymentsList(selector?.paymentList?.data?.data);
    }
  }, [selector]);
  console.log("salom", paymentsList);
  function renderTable() {
    return (
      <div className="form-style">
        <div className="page-header">
          <div className="road-map-box">
            <h4>Таъминотчилар</h4>
          </div>
          <FilterByTime />
        </div>

        <div className="oynacha" style={{ display: `${windowDisplay}` }}>
          <div className="card" style={{ display: "block" }}>
            <div className="card-header">
              <h4 style={{ textAlign: "center", color: "black" }}>
                Тўлов ойнаси <br />
              </h4>
              <h6 style={{ textAlign: "center", color: "black" }}>
                <span style={{ fontWeight: "bolder", color: "black" }}>
                  {providerNameFullInfo?.providerFName}{" "}
                </span>
                <span style={{ color: "red" }}>
                  {providerNameFullInfo?.providerDebt}{" "}
                </span>
                қарз
              </h6>
            </div>
            <div className="card-body">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="payment" style={{ color: "black" }}>
                    Тўлов тури
                  </label>
                  <select
                    className="form-control"
                    name="payment_type"
                    onChange={handleChange}
                    style={{ width: "90%" }}
                  >
                    <option hidden selected>
                      {" "}
                      Тўлов тури таланг
                    </option>
                    <option value="dollar">Доллар</option>
                    <option value="sum">Нақт сум</option>
                    <option value="karta">Пластик карта</option>
                    <option value="kvitansiya">Пул ўтказма</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="payment" style={{ color: "black" }}>
                    Пул миқдори
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="payment"
                    value={buyOrderPayment.payment}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-success"
                style={{ marginRight: "15px" }}
                onClick={() => paymentOrderActionLocal()}
              >
                Тўлов қилиш
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setWindowDisplay("none");
                }}
              >
                Ёпиш
              </button>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", overflow: "scroll" }}>
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/Р</td>
                  <td scope="col">Таминотчи номи</td>
                  <td scope="col">Манзили</td>
                  <td scope="col">Директор </td>
                  <td scope="col">Масул шахс</td>
                  <td scope="col">Телефон рақами 1</td>
                  <td scope="col">Телефон рақами 2</td>
                  <td scope="col">Банк коди</td>
                  <td scope="col">Банк</td>
                  <td scope="col">Aккоунт номери</td>
                  <td scope="col">ИНН</td>
                  <td scope="col">Қарз</td>
                  <td scope="col">Сотиб олинган вақт</td>
                  {/* <td scope="col">Тўлов қилиш</td> */}
                </tr>
              </thead>
              <tbody>
                {paymentsList?.map((iteam, index) => {
                  return (
                    <tr onClick={()=> history.push(`/cashier/provider-order/${iteam?.id}`)} key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{iteam?.name}</td>
                      <td>{iteam?.address}</td>
                      <td>{iteam?.director}</td>
                      <td>{iteam?.responsible_agent}</td>
                      <td>
                        {iteam?.phone_number1
                          ? iteam?.phone_number1
                          : "Nomer kiritilmagan"}
                      </td>
                      <td>
                        {iteam?.phone_number2
                          ? iteam?.phone_number2
                          : "Nomer kiritilmagan"}
                      </td>
                      <td>{iteam?.bank_code}</td>
                      <td>{iteam?.bank}</td>
                      <td>{iteam?.account_number}</td>
                      <td>{iteam?.INN}</td>
                      <td>
                        <span className="debt">
                          {iteam?.total_debt?new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "usd",
                          }).format(iteam?.total_debt):'-'}
                        </span>
                      </td>
                      <td>
                        {iteam?.created_date.slice(0, 10)}{" "}
                        {iteam?.created_date.slice(11, 16)}
                      </td>
                      {/* <td>
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            showOrderPaymentDiv(
                              iteam?.id,
                              iteam?.providerName,
                              iteam?.debt_usd
                            )
                          }
                        >
                          Тўлов
                        </button>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <>{renderTable()}</>;
};

export default BuyOrders;
