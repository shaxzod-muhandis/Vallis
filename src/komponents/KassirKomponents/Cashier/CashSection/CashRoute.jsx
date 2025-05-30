import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import instance from "../../../../baseUrl";
import StyleCash from "./StyleCash";

export default function CashRoute() {
  const [kassa, SetKassa] = useState();
  const [dollar, setDollar] = useState([]);
  const [open, setOpen] = useState();
  const [clients, setClients] = useState([]);
  const [kassaPost, setKassaPost] = useState();
  const [kassaTitle, setKassaTitle] = useState();
  const [comment, setComment] = useState();
  const [amount, setAmount] = useState();
  const [kassaClient, setKassaClient] = useState();

  const [state, setState] = useState({
    title: "",
    description: "",
    money: "",
    payment_type: "",
    client: "",
  });

  const getClients = async () => {
    try {
      const res = await instance.get("/client/client-list/");
      setClients(res.data.clients);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getKassa = async () => {
    try {
      const res = await instance.get("core/kassa/");
      console.log(res);
      SetKassa(res?.data?.kassa);
      console.log(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const postKassa = async () => {
    try {
      const res = await instance.post("core/income-by-kassa/", {
        client: kassaClient,
        title: kassaTitle,
        money: amount,
        description: comment,
        payment_type: kassaPost,
      });
      // if (res.status === 201) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Your work has been saved",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const agentById = async (arg) => {
    const id = arg[0]?.value;
    if (!id) return;
    try {
      const res = await instance.get(
        `/client/client-list/?agent=${id}&limit=1000`
      );
    } catch (error) {}
  };

  const getDollar = async () => {
    try {
      const res = await instance.get("order/sell-order-payment/");
      console.log(res.data.payments);
      setDollar(res?.data?.payments);
      console.log(dollar);
      console.log(dollar?.payment);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKassa();
    getDollar();
    getClients();
    // postKassa();
  }, []);

  console.log(dollar);

  return (
    <StyleCash>
      <div className="container">
        
      </div>
      <div className="container">
        <div className="flex 	 kas-form">
          <div className="kassa-box  w-4/6	">
            {/* <table className="table  table-striped table-hover text-center  mb-0">
              <thead>
                <tr className="tab-me ">
                  <td scope="col">T/R</td>
                  <td scope="col">Agent</td>
                  <td scope="col">Sana</td>
                  <td scope="col">Dollar</td>
                  <td scope="col">S'om</td>
                  <td scope="col">Plastk</td>
                  <td scope="col">Bank o'tkazma</td>
                </tr>
              </thead>
              <tbody>
                {dollar.map((item, index) => {
                  console.log(item);
                  console.log(item.payment_type);
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item?.client?.name}</td>
                        <td>
                          {item?.created_date.slice(
                            0,
                            item?.created_date.indexOf("T")
                          )}
                        </td>
                        <td>
                          {item?.payment_type == "dollar" ? item?.payment : ""}
                        </td>
                        <td>
                          {item?.payment_type == "sum" ? item?.payment : ""}
                        </td>
                        <td>
                          {item?.payment_type == "kvitansiya"
                            ? item?.payment
                            : ""}
                        </td>
                        <td>
                          {" "}
                          {item?.payment_type == "karta" ? item?.payment : ""}
                        </td>
                      </tr>
                    </>
                  );
                })}
                <tr>
                  <td scope="col">Umumiy</td>
                  <td scope="col"></td>
                  <td scope="col"></td>
                  <td scope="col">
                    {dollar
                      ?.filter((item) => item.payment_type == "dollar")
                      .reduce((a, b) => +a + +b?.payment, 0)}
                  </td>
                  <td scope="col">
                    {dollar
                      ?.filter((item) => item.payment_type == "sum")
                      .reduce((a, b) => +a + +b?.payment, 0)}
                  </td>
                  <td scope="col">
                    {dollar
                      ?.filter((item) => item.payment_type == "kvitansiya")
                      .reduce((a, b) => +a + +b?.payment, 0)}
                  </td>
                  <td scope="col">
                    {dollar
                      ?.filter((item) => item.payment_type == "karta")
                      .reduce((a, b) => +a + +b?.payment, 0)}
                  </td>
                </tr>
              </tbody>
            </table> */}
          </div>
          {/* <div className="register-form">
            <div className="title">
              <h2> Kassaga kirim </h2>
            </div>
            <div className="d-flex flex">
              <div className="pr-2">
                <input
                  className="naqt"
                  type="radio"
                  id="Karta"
                  name="drone"
                  value="karta"
                  onClick={(e) => setKassaPost(e.target.value)}
                />
                <label for="Karta">Karta orqali</label>
              </div>

              <div className="pr-2">
                <input
                  className="naqt"
                  type="radio"
                  id="Naqt"
                  name="drone"
                  value="Naqt"
                />
                <label onClick={() => setOpen(!open)} for="Naqt">
                  Naqt pul
                </label>
              </div>

              <div>
                <input
                  className="naqt"
                  type="radio"
                  id="bank"
                  name="drone"
                  value="kvitansiya"
                  onClick={(e) => setKassaPost(e.target.value)}
                />
                <label for="bank">Bank orqali</label>
              </div>
            </div>
            {open && (
              <div>
                <div className="d-flex drop-som">
                  <div className="flex items-center	">
                    <input
                      className="naqt"
                      type="radio"
                      id="Dollar"
                      name="drone"
                      value="dollar"
                      onClick={(e) => setKassaPost(e.target.value)}
                    />
                    <label for="Dollar">$ Dollar</label>
                  </div>
                  <div className="flex items-center	expence-som">
                    <input
                      className="naqt"
                      type="radio"
                      id="som"
                      name="drone"
                      value="sum"
                      onClick={(e) => setKassaPost(e.target.value)}
                    />
                    <label for="som">So`m</label>
                  </div>
                </div>
              </div>
            )}
            <div className="input-form">
              <input
                type="text"
                name="title"
                placeholder="Sarlavha"
                onChange={(e) => setKassaTitle(e.target.value)}
              />
              <textarea
                name="izox"
                placeholder="Izox"
                onChange={(e) => setComment(e.target.value)}
              />
              <input
                type="number"
                name="miqdori"
                placeholder="Miqdori"
                onChange={(e) => setAmount(e.target.value)}
              />
              <select
                name="client"
                onChange={(e) => setKassaClient(e.target.value)}
              >
                <option selected hidden>
                  Klient tanlang
                </option>
                <option>-</option>
                {clients.map((client) => {
                  return (
                    <option value={client?.id}>
                      {client?.name} - {client.INN} -{" "}
                      {client.sale_agent.first_name}
                    </option>
                  );
                })}
              </select>
              <label className="notification"></label>
              <button className="btn btn-primary" onClick={postKassa}>
                Qo'shish
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </StyleCash>
  );
}
