import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import instance from "../../../../baseUrl";
import FilterByTime from "../DepartmentBudget/filterByTime";

export default function ClientDebts() {
  const [debtList, setDebtList] = useState([]);
  const selector = useSelector((state) => state?.paymentList);
  console.log(selector);
  const getDebtList = async () => {
    try {
      const res = await instance.get("order/clients-with-debt/");
      setDebtList(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getDebtList();
  }, []);
  return (
    <div>
      <div className="page-header">
        <div className="road-map-box">
          <h3>Мижозлар қарздорлиги </h3>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td scope="col">T/Р</td>
              <td scope="col">Омбор</td>
              <td scope="col">Клиент номи</td>
              <td scope="col">Қарз сўммаси</td>
              <td scope="col">Агенти исм фамилияси</td>
              <td scope="col">Ишчи телефон рақами</td>
              <td scope="col">Директор телефон рақами </td>
              {/* <td scope="col">Жараён</td> */}
            </tr>
          </thead>
          <tbody>
            {debtList.map((item, index) => {
              const { client, warehouse, debt } = item;
              const {
                name,
                responsible_agent,
                work_phone_number,
                director_phone_number,
              } = client;
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{warehouse?.name}</td>
                  <td>{name}</td>
                  <td>{debt}</td>
                  <td>{responsible_agent}</td>
                  <td>{work_phone_number}</td>
                  <td>{director_phone_number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
