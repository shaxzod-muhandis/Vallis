import React, {useState,useEffect} from "react"
import instance from "../../../../baseUrl"
import PageMap from "../../../DirektorPage/components/page-road-map/page-map";
import FilterByTime from "./filterByTime"
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import FilterByDepartment from "./filterByDepartment";
import { useSelector, useDispatch } from "react-redux";
const Expense   =()=> {

  const selector = useSelector((state) => state);
    const [nomi, setNomi] = useState("");
    const [izox, setIzox] = useState("");
    const [miqdori, setMiqdori] = useState("");
    const [foydalanuvchi, setFoydalanuvchi] = useState("");
    const [usersdata, setUsersdata] = useState([]);
    const [salarydata, setSalarydata] = useState([]);
    const [deleteItem, setDeleteItem] = useState([]);
    const [btn_type, setBtn_type] = useState("Tasdiqlash");
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState("");
    const [credential, setCredential] = useState("");
    const [start_date, setStart_date] = useState("");
    const getUserData = async (start_date) => {
        const url = "/expense_discount/expense-list/";
        try {
          const response = await instance.get(url, {  params: { start_date: start_date } });
          console.log(response.data.expenses, "response.data.expenses");
          setUsersdata(response?.data?.expenses);
        } catch (error) {
            console.log(error);
        }
          
        }
    const getSalaryData = async (start_date) => {
        const url = "/salary/salary-list/";
        try {
          const response = await instance.get(url, {  params: { start_date: start_date } });
          setSalarydata(response?.data);
          console.log('salarydata',response?.data)
        } catch (error) {
        }
    };

    const  onExpenseDelete = async (e) => {
      try {
        const response =await instance.delete('/expense_discount/expense-detail/', {  params: { id: e } });
      } catch (error) {
        console.log(error);
      }
    };
    const  onDeleteAlert = (e) => {
        confirmAlert({
            message: "O'chirish uchun tasdiqlang",
            button : [
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
    };
    const onSetDay = async (start_date) => {
        await getUserData(start_date);
        await getSalaryData(start_date);
    };
    const  onSetWeek = async (start_date) => {
        await getUserData(start_date);
        await getSalaryData(start_date);
    };
    const  onSetMonth = async (start_date) => {
        await getUserData(start_date);
        await getSalaryData(start_date);
    };
    const   onFilterDateSubmit = async (start_date) => {
        await getUserData(start_date);
        await getSalaryData(start_date);
    };

        useEffect(() => {
            getUserData(start_date);
            getSalaryData(start_date);
        }, []);
        useEffect(() => {
            getUserData(start_date);
            getSalaryData(start_date);
        }, [start_date]);
        useEffect(() => {
          if(selector.paymentList){
            console.log(selector?.paymentList?.data?.expenses,'salom')
            setUsersdata(selector?.paymentList?.data?.expenses)
          }else{
            console.log('hjhjdkhkadehladc')
          }
        }, [selector]);
        return (
            <>
              <div className="page-header">
                <PageMap page_name={"Xarajatlarni boshqarish"} />
                <FilterByTime
                  onFilterDateSubmit={onFilterDateSubmit}
                  onSetDay={onSetDay}
                  onSetWeek={onSetWeek}
                  onSetMonth={onSetMonth}
                />

              </div>
              {/* <div className="crm-page-header _expense">
                <div className="crm-box">
                  <div className="card-icon">
                    <i className="fas fa-cart-arrow-down"></i>
                  </div>
                  <div className="count">{"20" + " So'm"}</div>
                  <div className="card-title">Oylik Xarajatlar</div>
                </div>
                <div className="crm-box">
                  <div className="card-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="count">{"20" + " So'm"}</div>
                  <div className="card-title">Marketing Xarajatlari</div>
                </div>
                <div className="crm-box">
                  <div className="card-icon">
                    <i className="far fa-credit-card"></i>
                  </div>
                  <div className="count">{"20" + " So'm"}</div>
                  <div className="card-title">Boshqa Xarajatlar</div>
                </div>
              </div> */}
              <div className="register-box _expense">
                <div className="register-table-box table-responsive">
                  <table className="table table-striped table-hover text-center  mb-0">
                    <thead>
                      <tr>
                        <td scope="col">T/R</td>
                        <td scope="col">Nomi</td>
                        <td scope="col">Izox</td>
                        <td scope="col">Miqdori</td>
                        <td scope="col">Foydalanuvchi</td>
                        <td scope="col">Sana</td>
                        <td scope="col">O’chirish</td>
                      </tr>
                    </thead>
                    { usersdata?.map((user, index) => {
                          return (
                            <tbody key={user.id}>
                              <tr>
                                <td>{index}</td>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td>{user.quantity}</td>
                                <td>
                                  {user?.user === null
                                    ? "Ism kiritilmagan"
                                    : user?.user.first_name +
                                      " " +
                                      user?.user.last_name}
                                </td>
                                <td>{user?.created_date.slice(0, 10)}</td>
                                <td className="d-flex justify-content-center">
                                  <i
                                    className="fas fa-trash"
                                    onClick={()=>onDeleteAlert(user.id)}
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
    }


export default Expense;
