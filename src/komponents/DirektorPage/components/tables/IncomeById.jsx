import React, { useState, useEffect } from "react";

import instance from "../../../../baseUrl";

export default function IncomeById() {
  const [incomeList, setIncomeList] = useState();

  const getIncomeList = async () => {
    try {
      const res = await instance.get(`/order/provider-info-detail/${id}/`);
      setIncomeList(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        <table className="table-item">
          <thead>
            <th>N</th>
            <th>Sana</th>
            <th>Partiya</th>
            <th>Model</th>
            <th>Buyurtmachi</th>
            <th>Rang</th>
            <th>Soni</th>
            <th>Bichuv stol</th>
            <th>Soni oldingi</th>
          </thead>
          <tbody>
            {bichuvCopy?.map((item, i) => {
              const {
                id,
                sana,
                bichuv_stol,
                klient,
                model,
                partiya,
                rang,
                soni,
                rang_kodi,
                kilosi,
              } = item;

              return (
                <tr className="tab-row">
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => getIdGramaj(id)}
                  >
                    {i + 1}
                  </td>
                  <td
                    onClick={() => cardToggle(id)}
                    style={{ cursor: "pointer" }}
                  >
                    {sana}
                  </td>
                  <td>{partiya}</td>
                  <td>{model}</td>
                  <td>{klient}</td>
                  <td>{rang}</td>
                  <td>{soni}</td>
                  <td>{bichuv_stol}</td>
                  <td>{kilosi}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
