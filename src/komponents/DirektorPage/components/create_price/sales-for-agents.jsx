import instance from "../../../../baseUrl";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Loading from "../../../../img/loading-5.gif";
import { useSelector } from "react-redux";
import { default as ReactSelect } from "react-select";
import "./select.css";
import Option, { colourOptions } from "./SelectOption";
import { Link } from "react-router-dom";

const SalesForAgents = () => {
  const [outcomePriceList, setOutcomePriceList] = useState([]);
  const productSelector = useSelector((state) => state?.product);
  const [productList, setProductList] = useState([]);
  const [priceTypeList, setPriceTypeList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [price_type, setPrice_type] = useState("");
  const [agent_type, setAgent_type] = useState("");
  const [price_type_name, setPrice_type_name] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const [product_name, setProduct_name] = useState("");
  const [agents, setAgents] = useState("");
  const [client_name, setClient_name] = useState("");
  const [btn_type, setBtn_type] = useState("Қўшиш");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [updateData, setUpdateData] = useState(false);
  const [category, setCategory] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [check, setCheck] = useState(false);
  const [price_typeName, setPrice_typeName] = useState("");
  const [priceName, setPriceName] = useState("");
  const [productName, setProductName] = useState("");
  const [clientName, setClientName] = useState("");
  const selector = useSelector((state) => state.department);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [prd, setPrd] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [count, setCount] = useState(0);
  const [state, setState] = useState({
    optionSelected: null,
  });

  const [appear, setAppear] = useState(false);

  console.log(state.optionSelected);

  const handlePagination = async (count) => {
    console.log(count);
    let offset = limit * (count - 1);
    let response = await instance.get(
      `/product/outcome-price-list-agents/?limit=${limit}&offset=${offset}&product=${
        productSelector ? productSelector : ""
      }`
    );
    console.log(response);
    setPrd(response.data.results);
    setNext(response.data.next);
    setPrev(response.data.previous);
  };

  const handlePages = () => {
    let newCount = Math.ceil(count / limit);
    return Array.from(Array(newCount), (e, i) => {
      return (
        <li key={i} className="page-item">
          <Link
            className="page-link"
            onClick={() => handlePagination(i + 1)}
            to="#"
          >
            {i + 1}
          </Link>
        </li>
      );
    });
  };

  const handlePrevious = async () => {
    let response = await instance.get(prev);
    setPrd(response.data.results);
    setNext(response.data.next);
    setPrev(response.data.previous);
  };

  const handleNext = async () => {
    let response = await instance.get(next);
    setPrd(response.data.results);
    setNext(response.data.next);
    setPrev(response.data.previous);
  };

  const getClientList = async () => {
    try {
      const response = await instance.get(
        "/order/price-type-for-agents-create-list/"
      );
      // const response2 = await instance.get("/user/agent-list/");
      console.log(response.data.results);
      // console.log("===agent-list", response2);
      setClientList(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPriceTypeList = async () => {
    try {
      const response = await instance.get(
        "/client/price-type-list/?limit=1000"
      );
      setPriceTypeList(response.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductList = async () => {
    try {
      const response = await instance.get("/product/product-list/?limit=1000");
      setProductList(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryList = async () => {
    try {
      const response = await instance.get("/product/category-list/?limit=1000");
      setCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOutcomePriceList = async () => {
    try {
      if (productSelector) {
        const response = await instance.get(
          `/product/outcome-price-list-agents/?limit=${limit}&offset=${offset}&product=${
            productSelector ? productSelector : ""
          }`
        );
        setPrd(response.data.results);
      } else {
        const response = await instance.get(
          `/product/outcome-price-list-agents?limit=${limit}&offset=${offset}&product=${
            productSelector ? productSelector : ""
          }`
        );
        const datas = response.data.results.filter((el) => !!el.agent);
        setPrd(datas);
        console.log("---", datas);
        setCount(response?.data.count);
        setPrev(response?.data.previous);
        setNext(response?.data.next);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createOutcomePrice = async (event) => {
    try {
      const url = "/product/outcome-price-list-agents/";
      console.log(agents);
      await instance.post(url, {
        price_type,
        price,
        product,
        agents: agents,
      });
    } catch (error) {
      console.log(error);
    }
    setPrice("");
    setState({ optionSelected: null });
    getOutcomePriceList();
  };

  const onDelete = async (e) => {
    try {
      const url = `/product/outcome-price-agent-detail/${e}`;
      const response = await instance.delete(url);
    } catch (error) {
      console.log(error);
    }
    getOutcomePriceList();
  };
  const onDeleteAlert = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => onDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  const onEdit = async (id) => {
    try {
      const url = "/product/outcome-price-agent-detail/";
      // const url2 = "/order/price-type-for-agents-update-delete/";
      const response = await instance.get(url + id + "/");
      // const response2 = await instance.get(url2 + id + "/");
      setPrice(response.data?.price);
      setPrice_type_name(response?.data.price_type.type);
      setPrice_type(response.data?.price_type.id);
      setAgent_type(response.data?.agent.agent_type);
      setProduct_name(response.data?.product.name);
      setCategory_name(response.data?.product.category.name);
      setCategory(response.data?.product.category.id);
      setProduct(response.data?.product.id);
      setAgents(response.data?.agent?.id);
      setClient_name(response.data.client?.name);
      setState({
        optionSelected: {
          id: response.data?.agent?.id,
          label:
            response.data?.agent.first_name +
            " " +
            response.data?.agent.last_name,
          value:
            response.data?.agent.first_name +
            " " +
            response.data?.agent.last_name,
        },
      });
      setBtn_type("Сақлаш");
      setUpdate(true);
      setId(id);
      setAppear(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async () => {
    try {
      const url = `/product/outcome-price-agent-detail/${id}/`;
      await instance
        .patch(url, {
          price,
          price_type,
          product,
          agent: agents[0],
        })
        .then((res) => console.log("salam", res));
    } catch (error) {
      console.log(error);
    }
    setBtn_type("Қўшиш");
    setUpdate(false);
    setUpdateData(true);
    setPrice("");
    // setPrice_type_name("");
    setClient_name("");
    // setProduct_name("");
    // setCategory_name("");
    // setProduct("");
    setState({ optionSelected: null });
    setAppear(true);
    getOutcomePriceList();
  };
  useEffect(() => {
    getOutcomePriceList();
    getProductList();
    getPriceTypeList();
    getClientList();
    getCategoryList();
  }, []);
  useEffect(() => {
    getOutcomePriceList();
  }, [productSelector]);
  const allOption = {
    label: "Барчасини танлаш",
    value: "*",
  };

  // const handleChange = (selected = []) => {
  //   if (
  //     selected !== null &&
  //     selected.length > 0 &&
  //     selected[selected.length - 1].value === allOption.value
  //   ) {
  //     return  setState({
  //       optionSelected:options
  //     })
  //   }

  //   console.log(selected);
  //   setState({
  //     optionSelected:selected
  //   })
  //   const arr = selected.map(item=> item.id)
  //   console.log(arr);
  //   setClient(arr)
  // };
  console.log(productList);
  console.log(state.optionSelected);
  const filteredProduct = productList.filter(
    (item) => item.category.id == category
  );
  console.log(price_type);
  const filteredClient = clientList.filter(
    (item) => item.price_type.id == price_type
  );
  const filteredClient2 = filteredClient.filter((item) =>
    item.agent ? item.agent.agent_type === agent_type : item.agent.agent_type
  );
  const newArr = filteredClient2.map(({ agent }) => ({
    label: agent.first_name + " " + agent.last_name,
    id: agent.id,
  }));
  console.log(filteredClient2);
  console.log(newArr);
  const addKey = newArr.map((item) =>
    Object.assign(item, { value: item?.label })
  );
  console.log(state);

  return (
    <div className="solary-box">
      <div className="filter-box mb-4">
        <h4>Aгентлар учун Сотиш Нархи</h4>
      </div>
      <div className="input-form">
        <input
          type="number"
          name="price"
          value={price}
          style={{ width: "100px" }}
          placeholder="Нархи"
          onChange={(e) => setPrice(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)} name="category">
          {/* {appear ? (
            <option value={category}>{category_name}</option>
          ) : ( */}
          <option value={""}>{"Жорий Категория"}</option>
          {/* )} */}

          {categoryList.map((list) => {
            return (
              <option
                selected={list.id == category}
                key={list.id}
                value={list.id}
              >
                {list.name}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => setProduct(e.target.value)} name="product">
          {/* {appear ? (
            <option value={product}>{product_name}</option>
          ) : ( */}
          <option value={""}>{"Жорий Маҳсулот"}</option>
          {/* )} */}
          {filteredProduct.map((list) => {
            return (
              <option
                selected={list.id == product}
                key={list.id}
                value={list.id}
              >
                {list.name}
              </option>
            );
          })}
        </select>
        <select
          disabled={!!state?.optionSelected?.length}
          onChange={(e) => setPrice_type(e.target.value)}
          name="price_type"
        >
          {/* {appear ? (
            <option value={price_type}>{price_type_name}</option>
          ) : ( */}
          <option value={""}>{"Жорий Нарх тури"}</option>
          {/* )} */};
          {priceTypeList.map((list) => {
            return (
              <option
                selected={list.id == price_type}
                key={list.id}
                value={list.id}
              >
                {list.type}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => setAgent_type(e.target.value)}
          name="price_type"
        >
          {/* {appear ? (
            <option value={agent_type}>
              {agent_type === "client_agent" ? "Klient Agent" : "Agent"}
            </option>
          ) : ( */}
          <option value={""}>{"Жорий Aгент тури"}</option>
          {/* )} */}
          <option selected={agent_type === "agent"} value={"agent"}>
            Agent
          </option>
          <option
            selected={agent_type === "client_agent"}
            value={"client_agent"}
          >
            Klient Agent
          </option>
        </select>
        <ReactSelect
          options={[allOption, ...addKey]}
          isMulti
          placeholder="Жорий Aгент"
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
          }}
          className="react-select"
          onChange={(selected = []) => {
            console.log(selected);
            if (
              selected.length > 0 &&
              selected[selected.length - 1].value == allOption.value
            ) {
              setState({
                optionSelected: addKey,
              });

              const arr = addKey.map((item) => item.id);
              console.log(arr);
              return setAgents(arr);
            }
            console.log(selected);
            setState({
              optionSelected: selected,
            });
            console.log(state.optionSelected);
            const arr = selected.map((item) => item.id);
            console.log(arr);
            setAgents(arr);
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
        {update ? (
          <button className="btn btn-primary" onClick={onUpdate}>
            {btn_type}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={createOutcomePrice}>
            {" "}
            {btn_type}
          </button>
        )}
      </div>
      <div className="solary-table table-responsive">
        <label className="notification">{}</label>
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td scope="col">T/P</td>
              <td scope="col">Маҳсулот</td>
              <td scope="col">Нархи</td>
              <td scope="col">Нарх тури</td>
              <td scope="col">Aгент тури</td>
              <td scope="col">Category</td>
              <td scope="col">Aгент</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          <tbody>
            {prd.map((data, index) => {
              if (data === undefined) {
                return (
                  <div className="loading-box">
                    <img src={Loading} alt="" />
                  </div>
                );
              } else {
                return (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.product.name}</td>
                    <td>{data.price} $</td>
                    <td>{data.price_type.type}</td>
                    <td>{data.agent.agent_type}</td>
                    <td>{data?.product?.category?.name}</td>
                    <td>
                      {data.agent === null
                        ? "Мижоз бириктирилмаган"
                        : data.agent.first_name + " " + data.agent.last_name}
                    </td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={() => onEdit(data.id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        onClick={() => onDeleteAlert(data.id)}
                      ></i>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <div className="pagination-container">
          <ul className="pagination">
            {prev === null ? (
              <div></div>
            ) : (
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  onClick={handlePrevious}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
            )}

            {handlePages()}
            {next === null ? (
              <div></div>
            ) : (
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  onClick={handleNext}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesForAgents;
