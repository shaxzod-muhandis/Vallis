import React, { useState, useEffect } from "react";
import instance from "../../../../baseUrl";

const SettingSalary = () => {
  // const [state, setState] = useState({
  //   salaryList: [],
  //   user: "",
  //   user_name: "",
  //   salary: "",
  //   btn_type: "Тасдиқлаш",
  //   updateTable: false,
  //   id: "",
  //   creditial: "",
  // });
  const [salary, setSalary] = useState();
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [userEditId, setUserEditId] = useState();
  const [count, setCount] = useState(0);
  const [salaryList, setSalaryList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [user_name,setUserName]=useState("")
const [id, setId] = useState(0);
  const getSalaryList = async () => {
    try {
      const res = await instance.get("/salary/salary-list/");
      setSalaryList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const res = await instance.get("/user/user-list/");
      const { results } = res.data;

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalaryId = async (id) => {
    setUpdate(true);
    salaryList?.map((user) => {
      if (id === user.id) {
        console.log(user);
        setUserName(user.user.first_name+"   "+user.user.last_name);
        setSalary(user?.salary);
        setId(id);
      }
      console.log(user,'dfghjkl;');
    });
    
  };

  const onEdit = async () => {
    try {
      const res = await instance.patch(`salary/salary/${id}/`, {
        salary: salary,
        user: user,
      });
      console.log(
        res
      );
      console.log(salary,user)
    } catch (error) {
      console.log(error);
    }
    setUpdate(false);
    getSalaryList();
  };

 
  const postSalary = async (e) => {
    try {
      const res = await instance.post(`/salary/salary-list/`, {
        salary: salary,
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
    getSalaryList();
  };
  useEffect(() => {
    getSalaryList();
    getUsers();
  }, []);


  return (
    <div className="solary-box">
      <h4 className="mb-3">Ойлик Белгилаш</h4>
      <div className="input-form">
        <select name="user" onChange={(e) => setUser(e.target.value)}>
        {update ?  <option value={userEditId?.user?.id}>{user_name}</option>: <option >Кимга...</option>}
          {users?.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user?.first_name + " " + user.last_name}
              </option>
            );
          })}
        </select>
        <input
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        {update ? (
          <button onClick={onEdit} className="btn btn-primary">
            Тасдиқлаш
          </button>
         ) : (
           <button onClick={postSalary} className="btn btn-primary">
             Тасдиқлаш
           </button>
         )}
         </div>
      <div className="solary-table table-responsive">
        <label className="notification">{}</label>
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td scope="col">T/P</td>
              <td scope="col">Ҳодим</td>
              <td scope="col">Ойлик Маош</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          <tbody>
            {salaryList.map((data, i) => {
              if (data === undefined) {
                return undefined;
              } else {
                return (
                  <tr key={data.id}>
                    <td>{i + 1}</td>
                    <td>
                      {data.user === null
                        ? "Бириктирилмаган"
                        : data.user.first_name + " " + data.user.last_name}
                    </td>
                    <td>{data.salary}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={(e) => getSalaryId(data.id)}
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

export default SettingSalary;
