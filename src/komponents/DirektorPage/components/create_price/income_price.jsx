import axios from "axios";
import instance from "../../../../baseUrl";
import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { set } from "mobx";
const CreateIncomePrice = () => {
  const selector = useSelector((state) => state?.department);
  const productSelector = useSelector((state) => state?.product);
  const [price, setPrice] = useState("");
  const [incomePriceList, setIncomePriceList] = useState([]);
  const [product, setProduct] = useState("");
  const [product_name, setProduct_name] = useState("");
  const [btn_type, setBtn_type] = useState("Қўшиш");
  const [update, setUpdate] = useState(false);
  const [productList, setProductList] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [is_usd, setIs_usd] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [category_name, setCategoryName] = useState("");
  const [check, setCheck] = useState(null);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [prd, setPrd] = useState([]);
  const [offset, setOffset] = useState(20);
  const [limit, setLimit] = useState(20);
  const [count, setCount] = useState(0);
  const [nameProduct, setNameProduct] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [appear,setAppear] = useState(false)

  console.log(prev);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCategory({ [name]: value });
  };
  const getIncomePriceList = async () => {
    try {
      if (selector) {
        const incomePriceList = await instance.get(
          `/product/income-price-list/?limit=20&offset=0&product=${
            productSelector ? productSelector : ""
          }`
        );
        setIncomePriceList(incomePriceList.data.results);
        setPrd(incomePriceList?.data?.results);
      } else {
        const incomePriceList = await instance.get(
          `/product/income-price-list/?limit=20&offset=0&product=${
            productSelector ? productSelector : ""
          }`
        );
        setPrd(incomePriceList?.data?.results);
        setCount(incomePriceList?.data.count);
        setPrev(incomePriceList?.data.previous);
        setNext(incomePriceList?.data.next);
        console.log(incomePriceList?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProductList = async () => {
    try {
      const productList = await instance.get(
        `/product/product-list/?limit=1000`
      );
      setProductList(productList.data.products);
    } catch (error) {
      console.log(error);
    }

    // let productList = await instance.get("/product/product-list/?limit=1000");
    // setProductList(productList.data.data);
  };
  const handlePagination = async (count) => {
    console.log(count);
    let offset = limit * (count - 1);
    let response = await instance.get(
      `/product/income-price-list/?limit=${limit}&offset=${offset}&product=${
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
  useEffect(() => {
    getIncomePriceList();
  }, [productSelector]);




  const createIncome = async () => {
    try {
      const url = "/product/income-price-list/";
      const res = await instance.post(url, {
        price: price,
        product: product,
        is_usd: true,
      });
    } catch (error) {
      console.log(error);
    }

    setPrice("");
    setProduct("");
    setProduct_name("");
    getIncomePriceList();
  };
  const getCategoryList = async () => {
    let productList = await instance.get("/product/category-list/?limit=20&offset=0");
    console.log(productList);
    setCategoryList(productList.data);
  };
  const onDelete = async (e) => {
    try {
      const url = `/product/income-price-detail/${e}/`;
      const res = await instance.delete(url);
    } catch (error) {
      console.log(error);
    }
    // const url = `/product/income-price-detail/`;
    // instance.delete(url + e)
    getIncomePriceList();
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
  const refreshPage = () => {
    window.location.reload();
  };



  const onEdit = async (id) => {
    const url = "/product/income-price-detail/";
    try {
      const res = await instance.get(url + id);
      console.log(res.data, "res");
      setPrice(res.data.price);
      setProduct(res.data.product.id);
      setBtn_type("Таҳрирлаш");
      setUpdate(true);
      setId(id);
      setCategoryName(res.data.product.category.name);
      setIs_usd(false);
      setAppear(true);
      setProduct_name(res.data.product.name);
    } catch (error) {
      console.log(error);
    }

    getIncomePriceList();
  };

  const onUpdate = async() => {
    try {
      const url = `/product/income-price-detail/${id}/`;
      const res = await instance.patch(url, { price, product, is_usd: true });
      setBtn_type("Қўшиш");
      setUpdate(false);
      setPrice("");
      setCategoryName("");
      setProduct_name("");
      setAppear(true);
      refreshPage()
    } catch (error) {
      console.log(error);
    }
    //  setUpdate(true);
  };

  useEffect(() => {
    getIncomePriceList();
    getProductList();
    getCategoryList();
  }, []);
  console.log(incomePriceList, "incomePriceList");
  const filteredProduct = productList.filter(
    (item) => item.category.id == category.category
  );
  console.log(filteredProduct);
  console.log(category);
  return (
    <div className="solary-box">
      <div className="filter-box mb-4">
        <h4>Сотиб Олиш Нархи $</h4>
      </div>
      <div className="input-form">
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Нархи $"
        />
        {/* <span>
          <input
            id="usd"
            name="radio"
            type="radio"
            onChange={() => setCheck(true)}
          />
          <label htmlFor="usd">Доллардами</label>
        </span> */}
        {/* <span>
          <input
            id="som"
            name="radio"
            type="radio"
            onChange={() => setCheck(false)}
          />
          <label htmlFor="som">Сўмда</label>
        </span> */}
        <select onChange={handleInput} name="category">
          {/* Жорий Категория */}
         { appear ? 
          <option value={category}>{category_name}</option>:
          <option value={""}>{"Жорий Категория"}</option>}
          {categoryList.map((list) => {
            return (
              <>
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
              </>
            );
          })}
        </select>
        <select onChange={(e) => setProduct(e.target.value)} name="product">
         { appear ?
          <option value={product}>{product_name}</option>:
          <option value={""}>{"Жорий Маҳсулот"}</option>}

          {filteredProduct?.map((list) => {
            return (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            );
          })}
        </select>
        {update ? (
          <button className="btn btn-primary" onClick={onUpdate}>
            {btn_type}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={createIncome}>
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
              <td scope="col">Category</td>
              <td scope="col">USD</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          <tbody>
            {prd?.map((data, index) => {
              if (data.length === 0) {
                return <h1>Loading</h1>;
              } else {
                return (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.product?.name}</td>
                    <td>{data.price} $</td>
                    <td>{data?.product?.category?.name}</td>
                    <td>Долларда</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={(e) => onEdit(data.id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        onClick={(e) => onDeleteAlert(data.id)}
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

export default CreateIncomePrice;
