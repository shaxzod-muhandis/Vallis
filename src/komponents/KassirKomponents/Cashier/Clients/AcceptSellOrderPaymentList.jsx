// page4

import { useEffect, useState } from "react";
import axios from "../../../../baseUrl";
import Loading from "../Loading/index";
import { observer } from "mobx-react";
import { confirmAlert } from "react-confirm-alert";
import { globalState } from "../../../../globalState";
import FilterByDepartment from "../DepartmentBudget/filterByDepartment";
import FilterByTime from "../DepartmentBudget/filterByTime";
import { useSelector } from "react-redux";

const AcceptSellOrderPayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentsList, setPaymentsList] = useState([]);
  const selector = useSelector((state) => state?.paymentList);
  const fetchPaymentList = async () => {
    setLoading(true);
    try {
      await axios
        .get("/order/sell-order-payment/?limit=100000", {
          params: {
            term: globalState.search,
          },
        })
        .then((response) => {
          setLoading(false);
          console.log(response, "res");
          setPaymentsList(
            response.data.payments.filter((res) => res.approved === false)
          );
          renderTable();
        });
    } catch (error) {
      setLoading(false);
    }
  };

  // const showDeleteButton = (e) => {
  //   confirmAlert({
  //     message: "Ўчириш учун тасдиқланг",
  //     buttons: [
  //       {
  //         label: "Ўчириш",
  //         onClick: () => onOrderDelete(e),
  //       },
  //       {
  //         label: "Қайтиш",
  //         onClick: () => console.log(""),
  //       },
  //     ],
  //   });
  // };

  // const onOrderDelete = (e) => {
  //   const url = "/order/sell-order-payment-detail/";
  //   axios.delete(url + e).then((response) => {
  //     if (response.data != null) {
  //       fetchPaymentList();
  //       renderTable();
  //     }
  //   });
  // };
  const handleAccept = async (item, status) => {
    // const url = `/order/sell-order-payment-detail/${item.id}/?status=${status}`;
    const url = `/order/sell-order-payment-detail/${item.id}/`;
    await axios.patch(url, { status });
    fetchPaymentList();
  };
  useEffect(() => {
    fetchPaymentList();
  }, [globalState.search]);
  useEffect(() => {
    fetchPaymentList();
  }, []);
  useEffect(() => {
    setPaymentsList(selector?.data?.payments);
    console.log(selector?.data?.payments, "selector");
  }, [selector?.data?.payments]);

  function renderTable() {
    if (loading) {
      return (
        <main>
          <Loading />
        </main>
      );
    } else {
      return (
        <div>
          <div className="page-header">
            <div className="road-map-box">
              <h3>Тўловларни тасдиқлаш</h3>
            </div>
            <FilterByTime />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">T/Р</td>
                  {/* <td scope="col">Aгент номи</td> */}
                  {/* <td scope="col">Манзил</td> */}
                  {/* <td scope="col">Масул шахс</td> */}
                  {/* <td scope="col">Ишчи телефон рақами</td> */}
                  {/* <td scope="col">Директор телефон рақами</td> */}
                  <td scope="col">Агент исми </td>
                  <td scope="col">Агент фамилияси</td>
                  <td scope="col">Агент телефон рақами</td>
                  <td scope="col">Тўлов тури</td>
                  <td scope="col">Тўлов суммаси</td>
                  <td scope="col">Изоҳ</td>
                  <td scope="col">Тўланган сана</td>
                  <td scope="col">Қабул қилинган сана</td>
                  <td scope="col">Таҳрирлаш</td>
                  {/* <td scope="col">тасдиқланг</td> */}
                  {/* <td scope="col">Жараён</td> */}
                </tr>
              </thead>
              <tbody>
                {paymentsList?.map((item, index) => {
                  const {
                    id,
                    payment_type,
                    payment,
                    created_date,
                    updated_date,
                    approved,
                    comments,
                    status,
                    agent,
                  } = item;

                  if (payment_type === "credit_card")
                    payment_type = "Пластикдан тўлов";
                  if (payment_type === "cash") payment_type = "Нақт пул";
                  if (payment_type === "money_transfer")
                    payment_type = "Пул ўтказма";
                  console.log(agent);
                  return (
                    <>
                      <tr key={id}>
                        <th scope="row">{index + 1}</th>
                        {/* <td>{client?.name}</td> */}
                        {/* <td>{client?.address}</td> */}
                        {/* <td>{client?.responsible_agent}</td> */}
                        {/* <td>{client?.work_phone_number}</td> */}
                        {/* <td>{client?.director_phone_number}</td> */}
                        <td>{agent?.first_name}</td>
                        <td>{agent?.last_name}</td>
                        <td>{agent?.phone_number}</td>
                        <td>{payment_type}</td>
                        <td>{payment}</td>
                        <td>{comments}</td>
                        <td>
                          {created_date.slice(0, 10)}{" "}
                          {created_date.slice(11, 16)}
                        </td>
                        <td>
                          {updated_date.slice(0, 10)}{" "}
                          {updated_date.slice(11, 16)}
                        </td>
                        <td
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          {status !== "rejected" ? (
                            <>
                              <p
                                style={{ fontSize: "20px", cursor: "pointer" }}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                className=" btn btn-success btn-sm"
                                onClick={() => handleAccept(item, "accepted")}
                              >
                                <i className=" fas fa-check "></i>
                              </p>
                              <p
                                style={{ fontSize: "20px", cursor: "pointer" }}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                className="btn btn-danger btn-sm ml-2"
                                onClick={() => handleAccept(item, "rejected")}
                              >
                                <i className=" fas fa-x"></i>
                              </p>
                            </>
                          ) : (
                            <p style={{ color: "red", fontSize: "20px" }}>
                              Рад етилган
                            </p>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
  return <div>{renderTable()}</div>;
};

export default observer(AcceptSellOrderPayment);
