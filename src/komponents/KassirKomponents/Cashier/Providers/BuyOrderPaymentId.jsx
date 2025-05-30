import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import instance from "../../../../baseUrl";
import FilterByDepartment from "../DepartmentBudget/filterByDepartment";
import FilterByTime from "../DepartmentBudget/filterByTime";

const BuyOrderPaymentId = () => {
  const [windowDisplay, setWindowDisplay] = useState("none");
  const [buyOrderPayment, setBuyOrderPayment] = useState({
    payment_type: "",
    payment: "",
  });
  const [warehouseId,setWarehouseId] = useState()
  const selector = useSelector((state) => state);
  const [providerNameFullInfo, setproviderNameFullInfo] = useState({
    sellOrderId: "",
    providerFName: "",
    providerDebt: "",
  });

  console.log(providerNameFullInfo);
  const [paymentsList, setPaymentsList] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    setBuyOrderPayment({ ...buyOrderPayment, [name]: value });
  };
  const params = useParams()

  const getProviderById = async()=>{
      try {
          const res = await instance.get(`/order/provider-with-debt/${params?.id}`)
          setPaymentsList(res.data?.data)
          console.log(res.data);
      } catch (error) {
          
      }
  }
  const showOrderPaymentDiv = (warehouse, sellOrderId, providerName, debt) => {
    console.log(warehouse);
    setBuyOrderPayment(() => {
      return {
        payment_type: "",
        payment: "",
      };
    });
    console.log(warehouseId);

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

  const paymentOrderActionLocal = () => {
    paymentOrderAction(buyOrderPayment, providerNameFullInfo);
    renderTable();
  };
  const paymentOrderAction = () => {
    setWindowDisplay("flex");
    if (buyOrderPayment.payment_type !== "none" && buyOrderPayment.payment) {
      instance
        .post(`/order/providers-with-debt-payment/${paymentsList[0].provider.id}/${paymentsList[0].warehouse.id}/`, {
          payment_type: buyOrderPayment.payment_type,
          payment: buyOrderPayment.payment,
          provider:  paymentsList[0].provider?.id,
          warehouse: paymentsList[0].warehouse?.id
        })
        .then((res) => {
          console.log(res);
          if (res?.data?.Error) {
            alert(res?.data?.Error);
          }
          getProviderById()
          renderTable();
        })
        .catch((error) => {
          console.log({ errorMessage: error.toString() });
        });
    }
  };

  useEffect(()=>{
        getProviderById()
  },[])
  console.log("salom", providerNameFullInfo);
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
                  {/* {providerNameFullInfo?.providerDebt}{" "} */}
                </span>
                <span style={{ color: "red" }}>
                  {providerNameFullInfo?.providerFName}{" "}
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
                  <td scope="col">Омбор</td>
                  <td scope="col">Омбор Манзили</td>
                  <td scope="col">Омборчи</td>
                  <td scope="col">Қарз</td>
                  <td scope="col">Сотиб олинган вақт</td>
                  <td scope="col">Тўлов қилиш</td>
                </tr>
              </thead>
              <tbody>
                {paymentsList?.map((iteam, index) => {
                    const {id} = iteam.warehouse
                  return (
                    <tr onClick={()=> setWarehouseId(id)} key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{iteam?.provider?.name}</td>
                      <td>{iteam?.provider?.address}</td>
                      <td>{iteam?.provider?.director}</td>
                      <td>{iteam?.provider?.responsible_agent}</td>
                      <td>
                        {iteam?.provider.phone_number1
                          ? iteam?.provider.phone_number1
                          : "Nomer kiritilmagan"}
                      </td>
                      <td>
                        {iteam?.provider.phone_number2
                          ? iteam?.provider.phone_number2
                          : "Nomer kiritilmagan"}
                      </td>
                      <td>{iteam?.warehouse?.name}</td>
                      <td>{iteam?.warehouse?.address}</td>
                      <td>{iteam?.warehouse?.user}</td>
                      <td>
                        <span className="debt">
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "usd",
                          }).format(iteam?.debt_usd)}
                        </span>
                      </td>
                      <td>
                        {iteam?.updated_date.slice(0, 10)}{" "}
                        {iteam?.updated_date.slice(11, 16)}
                      </td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            showOrderPaymentDiv(
                                iteam?.id,
                                iteam?.providerName,
                                iteam?.debt_usd,
                            )
                          }
                        >
                          Тўлов
                        </button>
                      </td>
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

export default BuyOrderPaymentId;