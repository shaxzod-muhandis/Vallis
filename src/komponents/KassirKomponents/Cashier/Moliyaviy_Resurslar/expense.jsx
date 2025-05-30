import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import lodash from "lodash"
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import instance from "../../../../baseUrl";
import { useSelector } from "react-redux";
import StyleCash from "../CashSection/StyleCash";

const Expense = () => {
  const selector = useSelector((state) => state);
  console.log(selector?.paymentList?.data?.expenses, "fazi");
  const [nomi, setNomi] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [izox, setIzox] = useState("");
  const [miqdori, setMiqdori] = useState("");
  const [foydalanuvchi, setFoydalanuvchi] = useState("");
  const [usersdata, setUsersdata] = useState([]);
  const [userList, setUserList] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);
  const [btn_type, setBtn_type] = useState("Tasdiqlash");
  const [update, setUpdate] = useState(false);
  const [lavozimi, setLavozimi] = useState("");
  const [id, setId] = useState("");
  const [creditial, setCreditial] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCatergoryId] = useState();
  const [subCotegoryList, setSubCotegoryList] = useState([]);
  const [subId, setSubId] = useState();
  const [open, setOpen] = useState();
  const [expence, setExpence] = useState();
  const [kassa, SetKassa] = useState();
  const [total, setTotal] = useState('')

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
  const getUsersData = async () => {
    try {
      const res = await instance.get(`/expense_discount/expense-list/`);
      setUsersdata(res?.data?.expenses);
      console.log(res?.data?.expenses, "res");
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async () => {
    try {
      const res = await instance.get("/expense_discount/expense-category/");
      console.log(res.data.results, "resSDFAwe");
      setCategoryList(res?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getSub = () => {
    categoryList?.map((item) => {
      if (item.id == categoryId) {
        return setSubCotegoryList(item?.sub_category);
      }
    });
  };

  const createUser = async (event) => {
    event.preventDefault();
    const url = "/expense_discount/expense-list/";
    try {
      const res = await instance.post(url, {
        name: nomi,
        description: izox,
        quantity: miqdori,
        user: foydalanuvchi,
        expense_sub_category: subId,
        payment_type: expence,
      });
      console.log(res.data);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "info",
          title: res.data,
          showConfirmButton: false,
          timer: 5000,
        });
      }
      setTimeout(() => {
        window.location.reload(true);
      }, 6000);

      // if(res.status !== 200) return
      // Swal.fire({
      //   title: 'Muvofaqiyatli qo\'shildi',
      //   imageWidth: 400,
      //   imageHeight: 200,
      //   imageAlt: "Custom image",
      // });
      getUsersData();
    } catch (error) {
      console.log(error.response);
    }
    setNomi("");
    setIzox("");
    setMiqdori("");
    setCatergoryId("");
    setFoydalanuvchi("");
    getUsersData();
  };

  const getUserList = async () => {
    try {
      const res = await instance.get("/user/user-list/");
      setUserList(res);
      console.log(res, "user-list");
    } catch (error) {
      console.log(error);
    }
  };

  const onExpenseDelete = async (e) => {
    const url = "/expense_discount/expense-detail/";
    try {
      const res = await instance.delete(url + e);
    } catch (err) {
      console.log(err);
    }
    getUsersData();
  };

  const onEditData = (id) => {
    console.log(id, "id");
    usersdata.map((user) => {
      if (id == user.id) {
        console.log(user, "user", id, "id");
        setNomi(user?.name);
        setIzox(user?.description);
        setMiqdori(user?.quantity);
        // setKategoriya(user?.category);
        // setFoydalanuvchi(user?.user?.id);
        setLavozimi(user?.user?.type);
        setId(id);
        setUpdate(true);
        setBtn_type("Tahrirlash");
        setUserName(user?.user?.first_name + "  " + user?.user?.last_name);
      }
    });
  };

  const onEdit = (e) => {
    const url = `/expense_discount/expense-detail/${id}/`;
    e.preventDefault();
    try {
      const res = instance.patch(url, {
        name: nomi,
        description: izox,
        quantity: miqdori,
        expense_sub_category: categoryId,
        payment_type: expence,
      });
      console.log(res.data);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "info",
          title: res.data,
          showConfirmButton: false,
          timer: 5000,
        });
      }
      // setTimeout(() => {
      //   window.location.reload(true)
      // }, 6000);
    } catch (error) {
      console.log(error);
    }
    setNomi("");
    setIzox("");
    setMiqdori("");
    setCatergoryId("");
    setFoydalanuvchi("");
    setLavozimi("");
    setId("");
    setUpdate(false);
    setBtn_type("Saqlash");
    setUserName("");
    getUsersData();

    // const { nomi, izox, miqdori, kategoriya } = this.state;
  };
  const onDeleteAlert = async (e) => {
    confirmAlert({
      message: "O'chirish uchun tasdiqlang",
      buttons: [
        {
          label: "O'chirish",
          onClick: () => onExpenseDelete(e),
        },
        {
          label: "Qaytish",
          onClick: () => console.log(""),
        },
      ],
    });
    // getUsersData()
  };

  console.log(expence);
  const togleCard = () => {
    setOpen(!open);
  };
  console.log(open);
  console.log(setOpen);

  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    
  }, [expence]);


  useEffect(() => {
    getSub();

    console.log(categoryId);
  }, [categoryId]);

  console.log(subCotegoryList, "dfgjkl");

  useEffect(() => {
    getUsersData();
    getKassa();
    getUserList();
  }, []);

  useEffect(() => {
    if (selector.paymentList) {
      setUsersdata(selector?.paymentList?.data?.expenses);
    } else {
      console.log("hjhjdkhkadehladc");
    }
  }, [selector]);

  const [bolenn, setBolenn] = useState(true)
  const [bolenn2, setBolenn2] = useState(true)
  const [user, setUser] = useState('')
  const [kat1, setKat1] = useState([])
  const [tarih, setTarix] = useState([])
  const [parties, setParties] = useState({
    party: null,
    amount: null,
    type: expence,
    comment: null
  })

  const handleChange = (e) => {
    if(e.target.value === "naqt" ){
      setOpen(true)
    }else if(e.target.value === "sum"){
      setOpen(true)
    }
    else if(e.target.value === "dollar"){
      setOpen(true)
    }else{
      setOpen(false)
    }
    const { name, value } = e.target;
    setParties((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post(`/report/party_expanse/`, parties).then((res) => {
      if (res.status == 201) {
        Swal.fire({
          icon: 'success',
          title: 'Saqlandi',
        })
        instance.get(`/report/party_expanse/`).then((res) => {
          setTarix(res.data.results);
          setTotal(res.data.total)
        })
      }
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Xatolik !!!',
      })
    })
  }

  const handleEditch = (useri) => {
    setBolenn2(false)
    setUser(useri.id)
    setParties({
      party: useri.party,
      amount: useri.amount,
      commit: useri.commit
    })
  }
  const handleEdit = (e) => {
    e.preventDefault();
    setBolenn2(true)
    instance.put(`/report/party_expanse/${user}/`, parties).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: 'success',
          title: "O'zgartirildi",
        })
        instance.get(`/report/party_expanse/`).then((res) => {
          setTarix(res.data.results);
          setTotal(res.data.total)
        })
      }
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Xatolik !!!',
      })
    })
  }

  const handleDelete = (id) => {
    instance.delete(`/report/party_expanse/${id}/`).then((res) => {
      if (res.status == 204) {
        Swal.fire({
          icon: 'success',
          title: "O'chirildi",
        })
        instance.get(`/report/party_expanse/`).then((res) => {
          setTarix(res.data.results);
          setTotal(res.data.total)
        })
      }
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Xatolik !!!',
      })
    })
  }

  useEffect(() => {
    console.log(parties);
  }, [parties])


  useEffect(() => {
    instance.get(`/report/get_parties/`).then((res) => {
      setKat1(res.data);
    })
    instance.get(`/report/party_expanse/`).then((res) => {
      setTarix(res.data.results);
      setTotal(res.data.total)
    })
  }, [])


  return (
    <div>
      <div className="register-box">

        <div className="title d-flex justify-content-between pr-6">
          <h2 style={{ color: "white" }}> Xarajatlar ro'yxati </h2>
          <button className="text-white btn btn-success" onClick={() => setBolenn(!bolenn)}>
            {bolenn ? 'Yukka xarajat' : 'Doimiy xarajat'}
          </button>
        </div>

        <div className="content-wrapper">
          <div className="cash-and-table-wrapper">
            <StyleCash className="cash-wrapper">
              <div
                className="flex 	flex-wrap"
                style={{ justifyContent: "space-evenly" }}
              >
                <div className="kassa-card mr-2 	">
                  <div className="flex justify-evenly items-center">
                    <div className="cash-icon">
                      <i className="fas fa-cart-arrow-down"></i>
                    </div>
                    <div>
                      <h5 className="sum">Сум</h5>
                    </div>
                  </div>
                  <div>
                    <p className="sum-cash">
                      Жами&nbsp;<span>{kassa?.total_sum}</span>
                    </p>
                  </div>
                </div>
                <div className="kassa-card mr-2">
                  <div className="flex justify-evenly items-center">
                    <div className="cash-icon">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div>
                      <h5 className="sum">Доллар</h5>
                    </div>
                  </div>
                  <div>
                    <p className="sum-cash">
                      Жами&nbsp;<span>${kassa?.total_dollar}</span>
                    </p>
                  </div>
                </div>
                <div className="kassa-card mr-2">
                  <div className="flex justify-evenly items-center">
                    <div className="cash-icon">
                      <i className="fas fa-cart-arrow-down"></i>
                    </div>
                    <div>
                      <h5 className="sum">Пластик</h5>
                    </div>
                  </div>
                  <div>
                    <p className="sum-cash">
                      Жами&nbsp;<span>{kassa?.total_karta}</span>
                    </p>
                  </div>
                </div>
                <div className="kassa-card mr-2">
                  <div className="flex justify-evenly items-center">
                    <div className="cash-icon">
                      <i className="fas fa-university"></i>
                    </div>
                    <div>
                      <h5 className="sum">Трансфер</h5>
                    </div>
                  </div>
                  <div>
                    <p className="sum-cash">
                      Жами&nbsp;<span>{kassa?.total_transfer}</span>
                    </p>
                  </div>
                </div>
                <div className="kassa-card mr-2">
                  <div className="flex justify-evenly items-center">
                    <div className="cash-icon">
                      <i className="fas fa-cart-arrow-down"></i>
                    </div>
                    <div>
                      <h5 className="sum">Умумий сумма</h5>
                    </div>
                  </div>
                  <div>
                    <p className="sum-cash">
                      Жами &nbsp;<span>{kassa?.total_kassa}</span>
                    </p>
                  </div>
                </div>
              </div>
            </StyleCash>
            {
              bolenn ?
                <div className="register-table-box table-responsive mt-5">
                  <table className="table table-striped table-hover text-center  mb-0">
                    <thead>
                      <tr>
                        <td scope="col">T/R</td>
                        {/* <td scope="col">Nomi</td> */}
                        <td scope="col">Партия раками</td>
                        <td scope="col">Miqdori</td>
                        <td scope="col">To'lov turi</td>
                        <td scope="col">Izox</td>
                        <td scope="col">Tahrirlash</td>
                      </tr>
                    </thead>
                    {tarih?.map((user, index) => {
                      // this.roleDefine(user?.user?.role);
                      return (
                        <tbody key={user.id}>
                          <tr>
                            <td>{index + 1}</td>
                            {/* <td>{user.name}</td> */}
                            <td>{user?.party}</td>
                            <td>{user?.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                            <td>{user?.type ?? '-'}</td>
                            <td>{user?.comment ?? '-'}</td>
                            <td className="d-flex justify-content-center">
                              <i
                                className="fas fa-edit"
                                onClick={() => handleEditch(user)}
                              ></i>
                              <i
                                className="fas fa-trash"
                                onClick={() => handleDelete(user.id)}
                              ></i>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                  <h1 style={{fontSize: '35px'}} className="my-3 mr-2 float-right">Жами: {total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</h1>
                </div>
                :
                <div className="register-table-box table-responsive mt-5">
                  <table className="table table-striped table-hover text-center  mb-0">
                    <thead>
                      <tr>
                        <td scope="col">T/R</td>
                        {/* <td scope="col">Nomi</td> */}
                        <td scope="col">Kategoriya</td>
                        <td scope="col">Subkategoriya</td>
                        <td scope="col">Izox</td>
                        <td scope="col">Miqdori</td>
                        <td scope="col">Тулов тури</td>

                        <td scope="col">Foydalanuvchi</td>
                        {/* <td scope="col">Тасдиқланган</td> */}
                        <td scope="col">Tahrirlash</td>
                      </tr>
                    </thead>
                    {usersdata?.map((user, index) => {
                      // this.roleDefine(user?.user?.role);
                      return (
                        <tbody key={user.id}>
                          <tr>
                            <td>{index + 1}</td>
                            {/* <td>{user.name}</td> */}
                            <td>{user?.expense_sub_category?.category?.name}</td>
                            <td>{user?.expense_sub_category?.name}</td>
                            <td>{user.description}</td>
                            <td>{user.quantity}</td>
                            <td>{user?.payment_type}</td>
                            <td>
                              {user.user === null || undefined
                                ? "Ismi kiritilmagan"
                                : user.user.first_name +
                                " " +
                                user.user.last_name +
                                " " +
                                user?.user?.role}
                            </td>
                            {/* <td style={{ color: user.approved ? "green" : "red" }}>
                      {user.approved ? "Тасдиқланган" : "тасдиқланмаган"}
                    </td> */}
                            <td className="d-flex justify-content-center">
                              <i
                                className="fas fa-edit"
                                onClick={() => onEditData(user.id)}
                              ></i>
                              <i
                                className="fas fa-trash"
                                onClick={() => onDeleteAlert(user.id)}
                              ></i>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>

            }

          </div>
          <div className="register-form">
            <div className="title">
              <h2> Xarajatlar </h2>
            </div>

            {
              bolenn ?
                <>
                  <div
                    className="d-flex flex"
                    style={{ margin: "10px", justifyContent: "space-between" }}
                  >
                    <div className="pr-2">
                      <input
                        className="naqt"
                        type="radio"
                        id="Karta"
                        name="type"
                        value="karta"
                        onClick={(e) => handleChange(e)}
                      />
                      <label for="Karta">Karta orqali</label>
                    </div>

                    <div className="pr-2">
                      <input
                        className="naqt"
                        type="radio"
                        id="Naqt"
                        name="type"
                        value="naqt"
                        onClick={(e) => handleChange(e)}
                      />
                      <label for="Naqt">Naqt pul</label>
                    </div>

                    <div>
                      <input
                        className="naqt"
                        type="radio"
                        id="bank"
                        name="type"
                        value="kvitansiya"
                        onClick={(e) => handleChange(e)}
                      />
                      <label for="bank">Bank orqali</label>
                    </div>
                  </div>
                  {open && (
                    <div>
                      <div
                        className="d-flex drop-som"
                        style={{ margin: "10px", justifyContent: "space-between" }}
                      >
                        <div className="flex items-center	">
                          <input
                            className="naqt"
                            type="radio"
                            id="Dollar"
                            name="type"
                            value="dollar"
                            onClick={(e) => handleChange(e)}
                          />
                          <label for="Dollar">$ Dollar</label>
                        </div>
                        <div className="flex items-center	expence-som">
                          <input
                            className="naqt"
                            type="radio"
                            id="som"
                            name="type"
                            value="sum"
                            onClick={(e) => handleChange(e)}
                          />
                          <label for="som">So`m</label>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="input-form">
                    <select name="party" value={parties.party} onChange={(e) => handleChange(e)}>
                      <option value="" selected hidden>
                        Партия раками
                      </option>
                      {kat1?.map((item) => {
                        return <option value={item.id}>{item?.number}</option>;
                      })}
                    </select>
                    {/* <select onChange={(e) => setSubId(e.target.value)}>
                    <option value="" selected hidden>
                      Суб категория
                    </option>
                    {subCotegoryList?.map((item) => {
                      return <option value={item.id}>{item?.name}</option>;
                    })}
                  </select> */}
                    
                    <input
                      type="number"
                      name="amount"
                      placeholder="Miqdori"
                      value={parties.amount}
                      required
                      onChange={(e) => handleChange(e)}
                    />
                    <textarea
                    name="comment"
                    placeholder="Izox"
                    value={parties.comment}
                    onChange={(e) => handleChange(e)}
                  />
                    {/* <select onChange={(e) => setFoydalanuvchi(e.target.value)}>
                    <option value={foydalanuvchi}>{userName}</option>
                    {userList?.data?.map((user, index) => {
                      return (
                        <option value={user.id}>
                          {user?.first_name} {user?.last_name}
                        </option>
                      );
                    })}
                  </select> */}
                    <label className="notification"></label>
                    {bolenn2 == false ? (
                      <button className="btn btn-warning" onClick={(e) => handleEdit(e)}>
                        {" "}
                        Taxrirlash
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleSubmit(e)}
                      >
                        {btn_type}
                      </button>
                    )}
                  </div>
                </>
                :
                <>
                  <div
                    className="d-flex flex"
                    style={{ margin: "10px", justifyContent: "space-between" }}
                  >
                    <div className="pr-2">
                      <input
                        className="naqt"
                        type="radio"
                        id="Karta"
                        name="drone"
                        value="karta"
                        onClick={(e) => setExpence(e.target.value)}
                      />
                      <label for="Karta">Karta orqali</label>
                    </div>

                    <div className="pr-2">
                      <input
                        className="naqt"
                        type="radio"
                        id="Naqt"
                        name="drone"
                        value="naqt"
                        onClick={(e) => setExpence(e.target.value)}
                      />
                      <label for="Naqt">Naqt pul</label>
                    </div>

                    <div>
                      <input
                        className="naqt"
                        type="radio"
                        id="bank"
                        name="drone"
                        value="kvitansiya"
                        onClick={(e) => setExpence(e.target.value)}
                      />
                      <label for="bank">Bank orqali</label>
                    </div>
                  </div>
                  {open && (
                    <div>
                      <div
                        className="d-flex drop-som"
                        style={{ margin: "10px", justifyContent: "space-between" }}
                      >
                        <div className="flex items-center	">
                          <input
                            className="naqt"
                            type="radio"
                            id="Dollar"
                            name="drone"
                            value="dollar"
                            onClick={(e) => setExpence(e.target.value)}
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
                            onClick={(e) => setExpence(e.target.value)}
                          />
                          <label for="som">So`m</label>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="input-form">
                    <select onChange={(e) => setCatergoryId(e.target.value)}>
                      <option value="" selected hidden>
                        Категория
                      </option>
                      {categoryList?.map((item) => {
                        return <option value={item.id}>{item?.name}</option>;
                      })}
                    </select>
                    <select onChange={(e) => setSubId(e.target.value)}>
                      <option value="" selected hidden>
                        Суб категория
                      </option>
                      {subCotegoryList?.map((item) => {
                        return <option value={item.id}>{item?.name}</option>;
                      })}
                    </select>
                    <textarea
                      name="izox"
                      placeholder="Izox"
                      value={izox}
                      onChange={(e) => setIzox(e.target.value)}
                    />
                    <input
                      type="number"
                      name="miqdori"
                      placeholder="Miqdori"
                      value={miqdori}
                      required
                      onChange={(e) => setMiqdori(e.target.value)}
                    />
                    <select onChange={(e) => setFoydalanuvchi(e.target.value)}>
                      <option value={foydalanuvchi}>{userName}</option>
                      {userList?.data?.map((user, index) => {
                        return (
                          <option value={user.id}>
                            {user?.first_name} {user?.last_name}
                          </option>
                        );
                      })}
                    </select>
                    <label className="notification"></label>
                    {update ? (
                      <button className="btn btn-primary" onClick={(e) => onEdit(e)}>
                        {" "}
                        {btn_type}
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => createUser(e)}
                      >
                        {btn_type}
                      </button>
                    )}
                  </div>
                </>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
