import { Checkbox, Button } from "@material-ui/core/";
import React from "react";
import { useEffect, useState } from "react";
import axios from "../../../../baseUrl";
import FilterByDepartment from "../DepartmentBudget/filterByDepartment";
import FilterByTime from "../DepartmentBudget/filterByTime";
import { useSelector, useDispatch } from "react-redux";

const PaymentByAgent = () => {
  const selector = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const [userListId, setUserListId] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [userList, setUserList] = useState([]);
  const [state, setState] = useState({
    userListId: [],
    totalPayment: "",
  });
  const [refresh, setRefresh] = useState(false);

  const getPaymentList = async () => {
    try {
      const res = await axios.get("/order/sell-order-payment/?limit=100000");
      // res.data.payments.map((item) => {
      // if (item.approved == false) {
      setUsers(res.data.payments);
      // }
      // });
    } catch (error) {
      console.log(error);
    }
  };
  const showTableRow = (e, paymentOld, id, payment_type) => {
    console.log(paymentOld);
    e.preventDefault();
    const newPayment =
      payment_type === "нақд пул"
        ? "sum"
        : payment_type === "пластик карта"
        ? "karta"
        : payment_type === "пул ўтказма"
        ? "kvitansiya"
        : payment_type === "dollar"
        ? "dollar"
        : "";
    console.log(newPayment);

    if (e.target.checked) {
      console.log("checked");
      let sumPayment = parseFloat(totalPayment) + parseFloat(paymentOld);
      setTotalPayment(sumPayment);
      setState((prevState) => ({
        userListId: [
          ...prevState.userListId,
          {
            id: id,
            payment_type: newPayment,
          },
        ],
      }));
    } else {
      console.log("unchecked");
      let sumPayment = parseFloat(totalPayment) - parseFloat(paymentOld);
      setTotalPayment(sumPayment);
      setState({
        userListId: state.userListId.filter((userId) => userId.id != id),
      });
      console.log(state.userListId);
    }
  };

  const paymentAction = async () => {
    if (state.userListId.length !== 0) {
      state.userListId.map((userId, index) => {
        console.log(userId);
        const url = `/order/sell-order-payment-detail/${userId.id}/`;
        axios
          .put(url, {
            approved: "true",
            payment_type: userId.payment_type,
          })
          .then((res) => {
            if (res.status === 201) {
              setRefresh(true);
              setTotalPayment(0);
            } else {
              setRefresh(false);
            }
          });
      });

      // setState({
      //   userListId: {
      //     id: 0,
      //     payment_type: "",
      //   },
      //   usersdata: [],
      // });
      getPaymentList();
    }
  };
  useEffect(() => {
    setUsers(selector?.paymentList?.data?.payments);
  }, [selector]);
  useEffect(() => {
    if (refresh) {
      alert("Пуллар қабул қилиндди");
      getPaymentList();
    }
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    getPaymentList();
  }, [selector]);
  console.log(users);
  return (
    <div>
      <div className="page-header">
        <FilterByTime />
      </div>
      <div className="row">
        <div style={{ width: "100%", height: "70vh", overflow: "scroll" }}>
          <h4 style={{ color: "white", textAlign: "center" }}>
            Агентларни тўловлари
          </h4>
          <div style={{ height: "55vh" }} className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
              <thead>
                <tr>
                  <td scope="col">Т/Р</td>
                  <td scope="col">Дўкон коди</td>
                  <td scope="col">Дўкон номи</td>
                  <td scope="col">Манзили</td>
                  <td scope="col">Ишчи</td>
                  <td scope="col">Ишчини номери</td>
                  <td scope="col">ИНН</td>
                  <td scope="col">Aгент Номи</td>
                  <td scope="col">Тўлов сумма</td>
                  <td scope="col">Тўлов тури</td>
                  {/* <td scope="col">Ҳолати </td> */}
                  <td scope="col">Яратилган кун</td>
                  {/* <td scope="col">Жараён</td> */}
                </tr>
              </thead>
              <tbody>
                {users
                  ?.filter((item) => item.approved === false)
                  .map((item, index) => {
                    const { id, approved, created_date, payment, client } =
                      item;
                    let payment_type = item.payment_type;
                    if (payment_type === "sum") payment_type = "нақд пул";
                    if (payment_type === "karta")
                      payment_type = "пластик карта";
                    if (payment_type === "kvitansiya")
                      payment_type = "пул ўтказма";
                    if (payment_type === "dollar") payment_type = "dollar";
                    return (
                      <>
                        <tr key={id}>
                          <th scope="row">{index + 1}</th>
                          <td>{client?.market_code}</td>
                          <td>{client?.name}</td>
                          <td>{client?.address}</td>
                          <td>{client?.responsible_agent}</td>
                          <td>{client?.work_phone_number}</td>
                          <td>{client?.INN}</td>
                          <td>
                            {
                              (client?.sale_agent?.first_name ||client?.sale_agent?.last_name ) ?
                             `${client?.sale_agent?.first_name} ${client?.sale_agent?.last_name}`:null
                              }
                          </td>
                          <td>
                            {new Intl.NumberFormat("de-DE", {
                              style: "currency",
                              currency: "USD",
                            }).format(payment)}
                          </td>
                          <td>{payment_type}</td>
                          {/* <td>
                            {" "}
                            {approved ? (
                              <span className="delivered">Тасдиқланган</span>
                            ) : (
                              <span className="ordered">Тасдиқланмаган</span>
                            )}
                          </td> */}
                          <td>
                            {created_date?.slice(0, 10)}{" "}
                            {created_date?.slice(11, 16)}
                          </td>
                          {/* <td>
                            <Checkbox
                              color="primary"
                              onChange={(e) =>
                                showTableRow(e, payment, id, payment_type)
                              }
                            />
                          </td> */}
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* <div
            className="total-price"
            style={{ width: "30%", color: "white", height: "5vh" }}
          >
            <span>Жами қиймати: </span>
            <p style={{ marginRight: "10px" }}>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "USD",
              }).format(totalPayment)}
            </p>
            <Button
              style={{ margin: "5px" }}
              color="primary"
              variant="outlined"
              onClick={() => paymentAction()}
            >
              Pul qabul qilish
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentByAgent;
