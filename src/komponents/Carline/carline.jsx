import axios from '../../baseUrl';
import { Modal } from "bootstrap";
import React, { useEffect,useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "./carline.css";

const Carline =()=> {
  const [carLineList, setCarLineList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");
  const [start_cursor, setStart_cursor] = useState("");
  const [end_cursor, setEnd_cursor] = useState("");
  const [work_day, setWork_day] = useState("");
  const [user, setUser] = useState("");
  const [editId, setEditId] = useState("");
  const [userId,setUserId]=useState("");
  const [update, setUpdate] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const [btn_type, setBtn_type] = useState("Қўшиш");


  const getAgentList = async () => {
   try {
     const res = await axios.get("/user/user-list/");
      setAgentList(res.data);
   } catch (error) {
     console.log(error);
   }
  };
  const getCarList = async () => {
  try {
    const res = await axios.get("/user/car/");
    setCarLineList(res.data);
  } catch (error) {
    console.log(error);
  }
  };
  useEffect(() => {
    getCarList();
    getAgentList();
  }, []);
  const createCarLine = (event) => {
    event.preventDefault();
    const url = "/user/car/";
    try {
      axios.post(url, {
        model: model,
        number: number,
        start_cursor: start_cursor,
        end_cursor: end_cursor,
        work_day: work_day,
        user: userId
      });
    } catch (error) {
      console.log(error);
    }
    getCarList();
    setModel("");
    setNumber("");
    setStart_cursor("");
    setEnd_cursor("");
    setWork_day("");
    setUser("");
    setUserId("");

  };

  const onDelete = async (e) => {
    const url = `/user/car/`;
    try {
      const res = await axios.delete(url + e);
    }
    catch (err) {
      console.log(err);
    }
    getCarList();
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
  const onEdit = (id) => {
    setEditId(id)
    const url = "/user/car/";
    axios.get(url + id).then((response) => {
      console.log(response.data);
      setModel(response.data.model);
      setNumber(response.data.number);
      setStart_cursor(response.data.start_cursor);
      setEnd_cursor(response.data.end_cursor);
      setWork_day(response.data.work_day);
      setUser(response.data.user.first_name+"    "+response.data.user.last_name);
      setUserId(response.data.user.id);
      setEditId(response.data.id);
      setUpdate(true);
      setBtn_type("Таҳрирлаш");
    });
  };
  const onUpdate =async (e) => {
    e.preventDefault();
    const url = `/user/car/${editId}/`;
    try {
      const res=await axios.patch(url, {  model: model, number: number, start_cursor: start_cursor, end_cursor: end_cursor, work_day: work_day, user: userId });
    } catch (error) {
      console.log(error);
    }
    getCarList();
    setModel("");
    setNumber("");
    setStart_cursor("");
    setEnd_cursor("");
    setWork_day("");
    setUser("");
    setUserId('')
    setUpdate(false);
    setBtn_type("Қўшиш");
  };

    
    return (
      <div className="solary-box carline-box">
        <h4 className="mb-3">Transpor yonalishini yaratish</h4>
        <div
          className="input-form car-line-input"
          
        >
          <input
            type="text"
            name="model"
            placeholder="Mashina rusumi"
            value={model}
            onChange={e=>setModel(e.target.value)}
          />
          <input
            type="text"
            name="number"
            placeholder="Raqami"
            value={number}
            onChange={e=>setNumber(e.target.value)}
          />
          <input
            type="text"
            name="start_cursor"
            placeholder="Yonalish boshlanishi"
            value={start_cursor}
            onChange={e=>setStart_cursor(e.target.value)}
          />
          <input
            type="text"
            name="end_cursor"
            placeholder="Yonalish tamomlanishi"
            value={end_cursor}
            onChange={e=>setEnd_cursor(e.target.value)}
          />
          <input
            type="date"
            name="work_day"
            placeholder="work day"
            value={work_day}
            onChange={e=>setWork_day(e.target.value)}
          />
          <select name="user" onChange={e=>setUserId(e.target.value)}>
            <option value={userId}>{user}</option>
            {agentList.map((data) => {
              return (
                <option key={data?.id} value={data?.id}>
                  {data?.first_name + " " + data?.last_name}
                </option>
              );
            })}
          </select>
          {
            update ? <button className="btn btn-primary mr-0" onClick={onUpdate}>{btn_type}</button>: <button onClick={createCarLine} className="btn btn-primary mr-0" >
            {btn_type}
          </button>
          }
         
        </div>
        <div className="solary-table table-responsive">
          {/* <label className="notification">{creditial}</label> */}
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/P</td>
                <td scope="col">Model</td>
                <td scope="col">Number</td>
                <td scope="col">Start Cursor</td>
                <td scope="col">End Cursor</td>
                <td scope="col">Work Day</td>
                <td scope="col">Agent</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {carLineList.results === undefined ? (
                <div>Loading</div>
              ) : (
               carLineList.results.map((data,index) => {
                  return (
                    <tr key={data.id}>
                      <td>{index}</td>
                      <td>{data?.model}</td>
                      <td>{data?.number}</td>
                      <td>{data?.start_cursor}</td>
                      <td>{data?.end_cursor}</td>
                      <td>{data?.work_day}</td>
                      <td>
                        {data?.user?.first_name + " " + data?.user?.last_name}
                      </td>
                      <td>
                        <i
                          className="fas fa-edit"
                          onClick={()=>onEdit(data.id)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={()=>onDeleteAlert(data.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }


export default Carline;
