import axios from "axios";
import instance from "../../../../baseUrl";
import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaginationContainer } from "../tables/PaginationStyle";
import ReactPaginate from "react-paginate";
const CreateWarehouse = () => {
  const selector = useSelector((state) => state?.department);
  const [name, setName] = useState("");
  const [address,setAddress] = useState("");
  const [btn_type, setBtn_type] = useState("Қўшиш");
  const [update, setUpdate] = useState(false);
  const [productList, setProductList] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [user,setUser] = useState('')
  const [userName,setUserName] = useState('')
  const [id, setId] = useState("");
  const [prev,setPrev] = useState(null)
  const [next,setNext] = useState(null)
  const [prd, setPrd] = useState([]);
  const [offset, setOffset] = useState(0);
  const[limit,setLimit] = useState(20)
  const [count, setCount] = useState(0);
const [usersList,setUsersList] = useState([])
  console.log(prev);
 
  const getWarehouse = async () => {
    try {
      if (selector) {
        const incomePriceList = await instance.get(
          `/warehouse/warehouses/?category=${selector}&limit=1000`
        );
        console.log(incomePriceList.data, "incomePriceList");
        setPrd(incomePriceList?.data?.results);
      } else {
        const incomePriceList = await instance.get(
          `/warehouse/warehouses/`
        );
        console.log(incomePriceList.data, "incomePriceList");
        setPrd(incomePriceList?.data?.results);
        setCount(incomePriceList?.data.count);
        setPrev(incomePriceList?.data.previous)
        setNext(incomePriceList?.data.next)
        console.log(incomePriceList?.data)
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

    
  };
  const handlePagination = async (count) => {
    const {selected} = count
    let offset = limit * (selected);
    let response = await instance.get(`/product/income-price-list/?limit=${limit}&offset=${offset}`);
    console.log(response);
    setPrd(response.data.results)
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
    setPrd(response.data.results)
    setNext(response.data.next)
    setPrev(response.data.previous)
  };
  const handleNext = async () => {
    let response = await instance.get(next);
    setPrd(response.data.results)
    setNext(response.data.next)
    setPrev(response.data.previous)
  };
  useEffect(() => {
    getWarehouse();
  }, [ selector]);
  const createIncome = async () => {
    try {
      const url = "/warehouse/warehouses/";
      console.log(user);
      const res=await instance.post(url, { name:name, address:address, user: user });
    } catch (error) {
      console.log(error);
    }
    
    setName("");
    setAddress("");
    setUser('')
    getWarehouse();
  };
  const getUser = async () => {
    let productList = await instance.get("/user/user-list/?warehouseman=true");
    setUsersList(productList.data)
  };
  const onDelete = async (e) => {
    try {
      const url = `/warehouse/warehouses/${e}/`;
      const res=await instance.delete(url);
    
    } catch (error) {
      console.log(error);
    }
    getWarehouse();
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
  const onEdit =async (id) => {
    const url = "/warehouse/warehouses/";
    try {
      const res=await instance.get(url + id)
        console.log(res.data,'res');
        setUser(res.data.user.id);
        setUserName(res.data.user.first_name+" "+res.data.user.last_name)
        setAddress(res.data.address);
        setName(res.data.name);
        setBtn_type("Таҳрирлаш");
        setUpdate(true);
        setId(id);
       
    } catch (error) {
      console.log(error);
     } 
    
   
  };

  const onUpdate = () => {
    try {
      const url = `/warehouse/warehouses/${id}/`;
      const res = instance.patch(url, { name, address, user:user });
      setBtn_type("Қўшиш");
      setUpdate(false);
      setName("");
      setAddress('')
      setUser("");
    } catch (error) {
      console.log(error);
    }
    getWarehouse();
    // setUpdate(true);
  };

  useEffect(() => {
    getWarehouse();
    getProductList();
    getUser();
  }, []);

  
  return (
    <div className="solary-box">
      <div className="filter-box mb-4">
        <h4>Омбор рўйхати</h4>
      </div>
      <div className="input-form">
        <select onChange={e=>  setUser(e.target.value)} name="user">
            <option value={user}>
              {"Жорий  " + "  "+userName }
            </option>
            {usersList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.first_name +" "+ list.last_name}
                </option>
              );
            })}
        </select>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />    <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
        {update ? (
          <button className="btn btn-primary" onClick={ onUpdate}>
            {btn_type}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={createIncome}
          >
           {  btn_type}
          </button>
        )}
      </div>
      <div className="solary-table table-responsive">
        <label className="notification">{}</label>
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td scope="col">T/P</td>
              <td scope="col">Омбор </td>
              <td scope="col">user</td>
              <td scope="col">аддресс</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          <tbody>
            {prd?.map((data,index) => {
              if (data.length === 0) {
                return <h1>Loading</h1>;
              } else {
                return (
                  <tr key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>

                    <td>{data.user.first_name}</td>
                    <td>{data.address}</td>
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
        <PaginationContainer>
          <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          onPageChange={handlePagination}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(count / 10)}
          previousLabel="&laquo;"
          renderOnZeroPageCount={null}
        />
        </PaginationContainer>
        {/* <div className="pagination-container">
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
        </div> */}
      </div>
    </div>
  );
};

export default CreateWarehouse;
