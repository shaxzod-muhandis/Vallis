import instance from "../../../../baseUrl";
import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import preLoader from "../../../../img/loading-5.gif";
import { default as ReactSelect } from "react-select";
import Option, { colourOptions } from "../create_price/SelectOption";

const Discount = () => {
  const [discountList, setDiscountList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [discount, setDiscount] = useState();
  const [postClient, setPostClient] = useState([]);
  const [status, setStatus] = useState();
  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState();
  const [filteredClient, setFilteredClient] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [priceType, setPriceType] = useState([]);
  const [editId, setEditId] = useState();
  const [priceId, setPriceId] = useState("");
  const [statusName, setStatusName] = useState("");
  const [typeSena, setTypeSena] = useState("");
  const [state, setState] = useState({
    optionSelected: null,
  });

  const [selected, setSelected] = useState([]);

  const getClientList = async () => {
    try {
      let clientList = await instance.get("/client/client-list/?limit=1000");
      setClientList(clientList.data.clients);
    } catch (error) {
      console.log(error);
    }
  };
  const getDuscountList = async () => {
    try {
      const discountList = await instance.get(
        `/expense_discount/client-discount/?limit=1000&type_cena=${typeSena}`
      );
      setDiscountList(discountList?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPriceTypeList = async () => {
    try {
      const res = await instance.get("/client/price-type-list/?limit=1000");
      if (res.status === 200) {
        setPriceType(res.data.results);
      }
    } catch (error) {}
  };
  console.log(priceType);
  const createDiscount = async (event) => {
    console.log({
      postClient,
    });
    try {
      const response = await instance.post(
        "/expense_discount/client-discount/",
        {
          discount: discount,
          is_active: isActive,
          client: postClient,
          status: status,
        }
      );
      if (response.status === 201) {
        getDuscountList();
      }
    } catch (error) {
      console.log(error);
    }
    setIsActive(false);
    setDiscount("");
    setClient("");
    setStatus("");
    setClientId("");
    getDuscountList();
  };
  const onDelete = async (e, id) => {
    try {
      const response = await instance.delete(
        `/expense_discount/client-discount-detail/${id}/`
      );
      console.log(response, "sdfghjkl");
    } catch (error) {}
    getDuscountList();
  };
  const onDeleteAlert = (e, id) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => onDelete(e, id),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  const getEditData = async (id) => {
    setIsEdit(true);
    try {
      const response = await instance.get(
        `/expense_discount/client-discount-detail/${id}/`
      );
      console.log(response);
      setDiscount(response.data.discount);
      setIsActive(false);
      setClientId(response?.data?.client?.id);
      setClient(response.data.client.name);
      setStatus(response.data.status);
      if (response.data.status == "yearly") {
        setStatusName("Йилик");
      } else {
        setStatusName("Ойлик");
      }
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = () => {
    try {
      const response = instance.patch(
        `/expense_discount/client-discount-detail/${editId}/`,
        {
          is_active: isActive,
          discount: discount,
          client: clientId,
          status: status,
        }
      );
      setDiscount("");
      setIsActive(false);
      setClientId("");
      setClient("");
      setStatus("");
      setEditId("");
    } catch (error) {}
    getDuscountList();
  };

  useEffect(() => {
    getClientList();
    getPriceTypeList();
    getDuscountList();
  }, []);

  const allOption = {
    label: "Барчасини танлаш",
    value: "*",
  };

  const handleChange = (selected = []) => {
    console.log(selected);
    setState({
      optionSelected: selected,
    });
    const arr = selected.map((item) => item.id);
    console.log(arr);
    setClient(arr);
  };
  const handlePriceTypes = (id) => {
    console.log(id);
    const filteredClientList = clientList.filter(
      (item) => item?.price_type?.id == id
    );
    console.log(filteredClientList);
    setFilteredClient(filteredClientList);
  };
  const newArr = filteredClient.map(({ name, id }) => ({
    label: name,
    id: id,
  }));
  console.log(newArr);
  const addKey = newArr.map((item) =>
    Object.assign(item, { value: item?.label })
  );
  console.log(addKey);
  useEffect(() => {
    getDuscountList();
  }, [typeSena]);
  return (
    <div className="solary-box">
      <div className="filter-box mb-4" style={{ display: "flex" }}>
        <h4>Мижозга чегирма белгилаш</h4>
        <select name="status" onChange={(e) => setTypeSena(e.target.value)}>
          <option value={status}>
            {"Муддати " + status ? statusName : ""}
          </option>
          <option value="yearly">Йиллик</option>
          <option value="monthly">Ойлик</option>
        </select>
      </div>
      <div className="input-form">
        <input
          type="number"
          name="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder=" Фоизда"
        />
        <span>
          <input
            id="usd"
            type="checkbox"
            onChange={() => setIsActive(!isActive)}
          />
          <label htmlFor="usd">Фаол</label>
        </span>
        <select onChange={(e) => setStatus(e.target.value)} name="status">
          <option value={status}>
            {"Муддати " + status ? statusName : ""}
          </option>
          <option value="yearly">Йиллик</option>
          <option value="monthly">Ойлик</option>
        </select>

        <select
          onChange={(e) => handlePriceTypes(e.target.value)}
          name="priceType"
        >
          <option value={clientId}>
            {"Жорий Мижоз " + client ? client : ""}
          </option>
          {priceType.map((list) => {
            return (
              <option key={list.id} value={list.id}>
                {list.type}
              </option>
            );
          })}
        </select>

        <ReactSelect
          options={[allOption, ...addKey]}
          isMulti
          placeholder="Жорий Мижоз "
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
          className="react-select"
          onChange={(selected = []) => {
            if (
              selected !== null &&
              selected.length > 0 &&
              selected[selected.length - 1].value === allOption.value
            ) {
              return setState({
                optionSelected: addKey,
              });
            }
            console.log(selected);
            setState({
              optionSelected: selected,
            });
            const arr = selected.map((item) => item.id);
            console.log(arr);
            setPostClient(arr);
          }}
          allowSelectAll={true}
          value={state.optionSelected}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#707491",
              primary: "#36394c",
            },
          })}
        />
        {/* <select onChange={(e) => setClientId(e.target.value)} name="client">
          <option value={clientId}>
            {"Жорий Мижоз " + client ? client : ""}
          </option>
          {filteredClient.map((list) => {
            return (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            );
          })}
        </select> */}

        {/* 
          <ReactSelect
            options={addKey}
            isMulti
            placeholder="Жорий Мижоз "
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option
            }}
            className='react-select'
            onChange={handleChange}
            allowSelectAll={true}
            value={state.optionSelected}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#707491',
                primary: '#36394c',
              },
            })}
          /> */}

        {isEdit ? (
          <button className="btn btn-primary" onClick={onEdit}>
            Сақлаш
          </button>
        ) : (
          <button className="btn btn-primary" onClick={createDiscount}>
            Қўшиш
          </button>
        )}
      </div>
      <div className="solary-table table-responsive">
        <label className="notification"></label>
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td scope="col">T/P</td>
              <td scope="col">Фоиз</td>
              <td scope="col">Мижоз</td>
              <td scope="col">Муддати</td>
              <td scope="col">Холати</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          <tbody>
            {discountList?.map((data, index) => {
              if (data.length === 0) {
                return <img src={preLoader} alt="" />;
              } else {
                return (
                  <tr key={data?.id}>
                    <td>{index + 1}</td>
                    <td>{data?.discount} %</td>
                    <td>{data?.client.name}</td>
                    <td>{data?.status === "yearly" ? "Йиллик" : "Ойлик"}</td>
                    <td>{data?.is_active ? "Фаол" : "Фаолемас"}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={() => getEditData(data.id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        onClick={(e) => onDeleteAlert(e, data.id)}
                      ></i>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discount;
