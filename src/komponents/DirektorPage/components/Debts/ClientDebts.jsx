import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import instance from "../../../../baseUrl";
import FilterByTime from "../CalendarFilter/filterByTime";
import StyleClient from "./StyleClientDebt";

export default function ClientDebts() {
  const [debtList, setDebtList] = useState([]);
  const [open, setOpen] = useState(false);
  const [getSell, setGetSell] = useState([]);
  const [debtSumma, setDebtSumma] = useState([]);

  const selector = useSelector((state) => state?.paymentList);

  console.log(selector);
  const getDebtList = async () => {
    try {
      const res = await instance.get("order/agents-list/");
      setDebtList(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClientDebt = async (id) => {
    // setOpen(!open);
    try {
      const res = await instance.get(`order/agent-clients-debts/${id}/`);
      console.log(res.data);
      setGetSell(res.data);
      togleCard();
    } catch (error) {
      console.error(error);
    }
  };

  const togleCard = () => {
    setOpen(!open);
  };
  console.log(debtList);
  useEffect(() => {
    getDebtList();
    // getClientDebt();
  }, []);
  return (
    <StyleClient>
      <div className="page-header">
        <div className="road-map-box">
          <h3>Мижозлар қарздорлиги </h3>
        </div>
        <FilterByTime />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td scope="col">T/Р</td>
              <td scope="col">Клиент номи</td>
              <td scope="col">Қарз сўммаси</td>
              <td scope="col">Агенти тури</td>
              <td scope="col">Ишчи телефон рақами</td>
              {/* <td scope="col">Директор телефон рақами</td> */}
              {/* <td scope="col">Жараён</td> */}
            </tr>
          </thead>
          <tbody>
            {debtList.map((item, index) => {
              const {
                agent_type,
                date_joined,
                id,
                get_agent_debt,
                last_name,
                first_name,
                phone_number,
              } = item;
              console.log();
              console.log(date_joined);
              return (
                <tr
                  style={{ cursor: "pointer" }}
                  onClick={() => getClientDebt(id)}
                >
                  <td>{index + 1}</td>
                  <td>{first_name + "    " + last_name} </td>
                  <td>$ {get_agent_debt}</td>
                  <td>{agent_type}</td>
                  <td>{phone_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {open && (
          <div className="modal-me">
            <div className="modal-content">
              <div className="modal-head">
                <h4 className="modal-title" onClick={() => setOpen(false)}>
                  x
                </h4>
                <div className="overflow-x-scroll	">
                  <div className=" foodver-card">
                    <div className="text-card">
                      <table className="table table-striped table-hover text-center  mb-0">
                        <thead>
                          <tr>
                            <td scope="col">T/Р</td>
                            <td scope="col">Ismi</td>
                            <td scope="col">Director raqami</td>
                            <td scope="col">Sana</td>
                            <td scope="col">INN</td>
                            <td scope="col">Qarzdorlik</td>
                          </tr>
                        </thead>
                        <tbody>
                          {getSell.map((item, index) => {
                            const { client, id } = item;
                            console.log(client.address);
                            return (
                              <tr onClick={() => getClientDebt(id)}>
                                <td>{index + 1}</td>
                                <td>{client?.name}</td>
                                <td>{client?.director_phone_number}</td>
                                <td>
                                  {client?.created_date.slice(
                                    0,
                                    client?.created_date.indexOf("T")
                                  )}
                                </td>
                                <td>{client?.INN}</td>
                                <td>{item?.debt}</td>
                                {/* <td>{quantity * price.price}</td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <div className="card-form">
                    <form>
                      <p className="help-box">Заполните все поля</p>
                    </form>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyleClient>
  );
}
