import React, { useEffect, useState } from "react";
import instance from "../../../../baseUrl";
import PageMap from "../page-road-map/page-map";

const SubmitReturnedProduct = () => {
  // state = {
  //   returnedProduct: [],
  //   btn_type: "Тасдиқлаш",
  //   update: false,
  //   id: "",
  //   creditial: "",
  // };
  const [returnedProduct, setReturnedProduct] = useState([]);
  const [btn_type, setBtn_type] = useState("Тасдиқлаш");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [creditial, setCreditial] = useState("");
  const [agent, setAgent] = useState([]);
  const [agentId, setAgentId] = useState('')
  const getAgent = async () => {
    const url = "/user/agent-list/";
    try {
      const response = await instance.get(url);
      setAgent(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getReturnedProduct = async () => {
    const url = `/order/returned-product/?agent=${agentId}`;
    try {
      const res = await instance.get(url);
      setReturnedProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = (e) => {
    const url = `/order/approve-returned-product/${e}/`;
    try {
      const res = instance.patch(url, { is_approved: "director" });
    } catch (error) {
      console.log(error);
    }
    // instance.patch(url, { is_approved: "director" }).then((response) => {
    //   if (response.data != null) {
    //     this.setState({
    //       returnedProduct: this.state.returnedProduct.filter(
    //         (data) => data.id != e
    //       ),
    //     });
    //   }
    // });
  };

  useEffect(() => {
    getReturnedProduct();
    getAgent();
  }, []);
  useEffect(() => {
    getReturnedProduct();
  }, [agentId]);


  console.log(agent, 'agent');
  return (
    <>
      <div className="page-header">
        <PageMap page_name={"Қайтган Маҳсулотларни Тасдиқлаш"} />
        <select className="selectStyle" onChange={e => setAgentId(e.target.value)}>
          <option>Агентлар</option>
          {
            agent?.map((v, i) => {
              return <option key={i} value={v.id}>{v?.first_name}</option>
            })
          }

        </select>
      </div>
      <div className="register-box _expense">

        <div className="register-table-box table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">Т/Р</td>
                <td scope="col">Мижоз</td>
                <td scope="col">Манзил</td>
                <td scope="col">Телефон Рақам</td>
                <td scope="col">Агент</td>
                <td scope="col">Телефон Рақам</td>
                <td scope="col">Сотиш</td>
                <td scope="col">Қайтган Миқдор</td>
                <td scope="col">Ҳолати </td>
                <td scope="col">Tасдиқланган</td>
                <td scope="col">Қайтарилган кун</td>
                <td scope="col">Тасдиқлаш</td>
              </tr>
            </thead>
            {returnedProduct.map((data, index) => {
              return (
                <tbody key={data.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.client === null ? "-" : data.client.name}</td>
                    <td>
                      {data.client === null ? "-" : data.client.address}
                    </td>
                    <td>
                      {data.client === null
                        ? "-"
                        : data.client.work_phone_number}
                    </td>
                    <td>
                      {data.agent.first_name + " " + data.agent.last_name}
                    </td>
                    <td>{data.agent.phone_number}</td>
                    <td>
                      {data.sell_order === null
                        ? "-"
                        : data.sell_order.given_quantity}
                    </td>
                    <td>{data.returned_quantity}</td>
                    <td>
                      {data.status === "client_valid"
                        ? "Мижоз қайтарган яроқли"
                        : data.status === "client_invalid"
                          ? "Мижоз қайтарган яроқсиз"
                          : "Сотилмаган"}
                    </td>
                    <td
                      className={
                        data.is_approved === "agent"
                          ? "text-warning"
                          : "text-success"
                      }
                    >
                      {data.is_approved === "agent" ? "Агент" : "Омборчи"}
                    </td>
                    <td>{data.created_date.slice(0, 10)}</td>
                    <td className="d-flex justify-content-center">
                      <i
                        className="far fa-check-circle"
                        onClick={() => onSubmit(data.id)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default SubmitReturnedProduct;
