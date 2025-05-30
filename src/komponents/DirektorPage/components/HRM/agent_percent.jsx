import axios from "axios";
import React, { useState, useEffect } from "react";
import instance from "../../../../baseUrl";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const AgentPercent = () => {
  const [agent, setAgent] = useState();
  const [agents, setAgents] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [percent, setPercent] = useState("");
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [dataPrice, setDataPrice] = useState([]);
  const [agent_name, setAgentName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [idPresent, setIdPresent] = useState();
  const getPercentList = async () => {
    try {
      const response = await axios.get(`https://vallisbackend.backoffice.uz/a1/salary/agent-salary-percent/`);
      setDataPrice(response.data.queryset);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const createAgentPercent = (event) => {
    try {
      const response = instance.post(`/salary/agent-salary-percent/`, {
        percent: percent,
        user: agent,
        profit_from: start, 
        profit_to: end
      });
      console.log(response);
      if(response.status === 201){
        setPercent("");
        setAgent("");
        setStart("");
        setEnd("");
        setUpdate(false);
        getPercentList();
      }
    } catch (error) {
      console.log(error);
    }
    setPercent("");
    setAgentName("");
    getPercentList();
  };


  useEffect(() => {
    
    getPercentList();
  }, []);


  const getAgentList = async () => {
    try {
      const response = await instance.get(`/user/agent-list/?limit=1000000`);
      if (response.status === 200) {
        setAgents(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editAgent = (id) => {
    setUpdate(true);
    setIdPresent(id);
    dataPrice?.map((item) => {
      if (id === item.id) {
        console.log(item,'fghjkl');
        setPercent(item?.percent);
        setStart(item?.profit_from);
        setEnd(item?.profit_to);
        setAgentName(item?.user.first_name+" "+item?.user.last_name);
        setAgentId(item?.user?.id);
      }
    });
  };
  const onEdit = async() => {
    setUpdate(false);
    console.log('1' ,start, end)
    try {
      const response = await instance.patch(
        `/salary/agent-salary-percent/${idPresent}/`,
        { percent: percent, user: agent ,profit_from: start, profit_to: end}
      );
      console.log('2' ,start, end)
      if(response.status === 200){
        setPercent("");
        setStart("");
        setEnd("");
        setAgentName("");
        getPercentList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAgentList();
  }, []);

  return (
    <div className="solary-box">
      <h4 className="mb-3">Агентга ойлик фоиз белгилаш</h4>
      <div className="input-form">
        <input
          type="text"
          name="percent"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          placeholder="дан"
        />
        <input
          type="text"
          name="percent"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          placeholder="гача"
        />
        <input
          type="text"
          name="percent"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="фоиз"
        />
        <select onChange={(e) => setAgent(e.target.value)} name="agent">
          <option value={agentId}>
            {"Жорий Агент "}
            {agentId ? `${agent_name}` : ""}
          </option>
          {agents?.map((list) => {
            return (
              <option key={list?.id} value={list?.id}>
                {list?.first_name + " " + list?.last_name}
              </option>
            );
          })}
        </select>
        {update ? (
          <button onClick={onEdit} className="btn btn-primary" type="submit">
            Қўшиш
          </button>
        ) : (
          <button
            onClick={createAgentPercent}
            className="btn btn-primary"
            type="submit"
          >
            Қўшиш
          </button>
        )}
      </div>
      <div className="solary-table table-responsive">
        <label className="notification">{}</label>
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td scope="col">Т/Р</td>
              <td scope="col">Агент</td>
              <td scope="col">Фоиз</td>
              <td scope="col">Дан</td>
              <td scope="col">Гача</td>
              <td scope="col">Таҳрирлаш</td>
            </tr>
          </thead>
          <tbody>
            {dataPrice?.map((data, index) => {
              return (
                <tr key={data?.id}>
                  <td>{index + 1}</td>
                  <td>{data?.user?.first_name} {data?.user?.last_name}</td>
                  <td>{data?.percent}</td>
                  <td>{data?.profit_from}</td>
                  <td>{data?.profit_to}</td>
                  
                  <td>
                    <i
                      className="fas fa-edit"
                      onClick={() => editAgent(data?.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentPercent;
