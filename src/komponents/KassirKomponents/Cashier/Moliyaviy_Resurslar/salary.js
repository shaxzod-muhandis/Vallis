//  page 8
import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import Swal from "sweetalert2";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSelector } from "react-redux";
import instance from "../../../../baseUrl";

const Expense = (props) => {
  const [state, setState] = useState({
    nomi: "",
    izox: "",
    foydalanuvchi: "",
    kategoriyasi: "",
    btn_type: "Тасдиқлаш ",
    update: false,
    id: "",
    creditial: "",
  });
  const [userData, setUserData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);
  const [lavozimi, setLavozimi] = useState("");
  const [miqdori, setMiqdori] = useState("");
  const [comment, setComment] = useState("");
  const [foydalanuvchi, setFoydalanuvchi] = useState("");
  const [open, setOpen] = useState();
  const [userListId, setUserListId] = useState("");
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [expence, setExpence] = useState();
  const [editId, setEditId] = useState("");
  const selector = useSelector((state) => state);
  const count=selector.count
  console.log(userData.response);

  console.log(expence);
  const handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  const getUsersData = async () => {
    try {
      const res = await instance.get("/salary/salary-list/");
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async(event) => {
    event.preventDefault();
    const url = "/salary/salary-list/";
    try {
      const res = await instance.post(url, { salary: miqdori, user: foydalanuvchi,payment_type:expence , comment: comment});
      console.log(res.status);
      if(res.status === 200 || res.status === 201){
        Swal.fire({
          icon: 'info',
          title: res.data,
          showConfirmButton: false,
          timer: 5000
        })
      }
        
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 5000
      })
    }

    setMiqdori("");
    setComment("");
    setFoydalanuvchi("");
    getUserList();
    getUsersData()
  };



  const getUserList = async () => {
    try {
      const res = await instance.get("/user/user-list/");
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsersData();
    getUserList();
  }, []);
  const togleCard = () => {
    setOpen(!open);
  };
  useEffect(() => {
    expence==='naqt'?setOpen(true):setOpen(false)
  },[expence])
  const onExpenseDelete =async (e) => {
    const url = "/salary/salary/";
    try {
      const res =await instance.delete(url + e);
    } catch (err) {
      console.log(err);
    }
    getUsersData();
  };

  const onEdit = (id) => {
    setUser({});
    setMiqdori("");
    setComment("");
    getUsersData();
    setEditId(id);
    setUpdate(true);
    const url = "/salary/salary-detail/";
    userData.map((user) => {
      if (id == user.id) {
        setUser(user.user);
        setMiqdori(user.salary);
        setComment(user.comment);
        setFoydalanuvchi(user?.user?.id);
      }
    });
    getUsersData()
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    const url = `/salary/salary-update/${editId}/`;
    try {
      const res = await instance.patch(url, {
        salary: miqdori,
        user: foydalanuvchi,
        payment_type:expence,
        comment: comment
      });
      if(res.status === 200 || res.status === 201){
        Swal.fire({
          icon: 'info',
          title: res.data,
          showConfirmButton: false,
          timer: 5000
        })
      }
      setTimeout(() => {
        window.location.reload(true)
      }, 6000);
    } catch (error) {
      console.log(error);
    }
    setUpdate(false);
    setUser({});
    setMiqdori("");
    getUsersData();
  };
  const onDeleteAlert = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг ",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => onExpenseDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  useEffect(()=>{
    if(count>=2){
      setUserData(selector?.paymentList?.data)
    }
  },[count])
  
 

  return (
    <div className="register-box">
        <h3 className="ml-3">Oyliklar</h3>
      <div className="content-wrapper">
      <div className="cash-and-table-wrapper">
        <div className="register-table-box table-responsive mt-5">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">Т/Р</td>
                <td scope="col">Фойдаланувчи</td>
                <td scope="col">Миқдори</td>
                <td scope="col">Ҳаражат куни</td>
                <td scope="col">Тулов тури</td>
                <td scope="col">Харажат соати</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {userData?.map((user, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {user?.user === null
                        ? "Ism kiritilmagan"
                        : user?.user?.first_name +
                          " " +
                          user?.user?.last_name +
                          " " +
                          lavozimi}
                    </td>
                    <td>{user?.salary}</td>
                    <td>{user?.created_date?.slice(0, 10)}</td>
                    <td>
                      {user?.payment_type}
                    </td>
                    <td>{user?.created_date?.slice(11, 19)}</td>
                    <td className="d-flex justify-content-center">
                      <i
                        className="fas fa-edit"
                        onClick={(e) => onEdit(user.id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        onClick={(e) => onDeleteAlert(user.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="register-form">
        <div className="title mb-5">
          <h2>Oyliklar</h2>
        </div>
        <div className="d-flex flex" style={{margin:'10px',justifyContent:'space-between'}}>
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
              <div className="d-flex drop-som" style={{margin:'10px',justifyContent:'space-between'}}>
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
          <select
            name="nomi"
            onChange={(e) => setFoydalanuvchi(e.target.value)}
          >
            <option value={user?.id}>
              {user?.first_name
                ? user?.first_name
                : "" + "  " + user?.last_name
                ? user?.last_name
                : ""}
            </option>
            ;
            {userList.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.first_name + " " + user.last_name + " " + lavozimi}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            name="miqdori"
            placeholder="Миқдори"
            value={miqdori}
            required
            onChange={(e) => setMiqdori(e.target.value)}
          />
          <textarea
            name="izox"
            placeholder="Izox"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <label className="notification">{}</label>
          {update ? (
            <button onClick={onUpdate} className="btn btn-primary">
              Тасдиқлаш
            </button>
          ) : (
            <button onClick={createUser} className="btn btn-primary">
              Сақлаш
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Expense;
