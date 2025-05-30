import React, { useEffect, useState } from 'react'
import instance from '../../../../baseUrl'
import FilterByTime from './filterByTime'

const MijozTolovTarixi = () => {
  const [data, setData] = useState([])
  const [data2, setData2] = useState({})
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    instance.get(`/core/agent-income-clients/?from_bot=True`).then((res) => {
      setData(res.data.results);
      setData2(res.data.totals);
    })
  }, [])
  const handleChange=(e)=>{
    instance.get(`/core/agent-income-clients/?from_bot=True&&status=${e}`).then((res) => {
      setData(res.data.results);
      setData2(res.data.totals);
    })
  }
  const onSetstartDate = (e) => {

    setStartDate(e);
  };
  const onSetendDate = (e) => {

    setEndDate(e);
  };
  useEffect(() => {
    instance.get(`/core/agent-income-clients/?start_date=${startDate}&end_date=${endDate}`).then((res) => {
      if (res.status == 200) {
        setData(res.data.results);
        setData2(res.data.totals);
      }
    })
  }, [endDate])
  console.log(data2);
  return (
    <div>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <div className="filter-box">
            <select className="selectStyle" onChange={(e) => handleChange(e.target.value)}>
              <option value="">Барчаси</option>
              <option value="accepted">Тасдикланган</option>
              <option value="rejected">Рад етилган</option>
              <option value="waiting">Кутилмокда</option>
            </select>
            <input
              type="date"
              name="startDate"
              onChange={(e) => onSetstartDate(e.target.value)}
            />
            <input
              type="date"
              name="endDate"
              onChange={(e) => onSetendDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ width: "100%", overflow: "scroll" }}>
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col"> №</td>

                <td scope="col">Агент </td>
                <td scope="col">Мижоз </td>
                <td scope="col"> Сана</td>
                <td scope="col">Сумма  </td>
                <td scope="col">Тўлов тури</td>
                <td scope="col">Статус </td>
                <td scope="col">Изоҳ </td>

              </tr>
            </thead>
            <tbody>
              {data?.map((iteam, index) => {

                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{iteam?.client?.sale_agent?.first_name} {iteam?.client?.sale_agent?.last_name}</td>
                    <td>{iteam?.client?.name}</td>
                    <td>
                      {iteam?.created_date.slice(0, 10)}{" "}
                    </td>
                    <td>{iteam?.payment?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</td>
                    <td>{iteam?.payment_type}</td>
                    <td>{iteam?.status == 'waiting' ? 'Кутилмокда' : iteam?.status == 'accepted' ? 'Тасдикланган' : 'Рад етилган '}</td>
                    <td>{iteam?.comment}</td>

                  </tr>
                )

              })}
            </tbody>
            
          </table>
          <table className="table table-striped table-hover text-center  mb-0 mt-5">
          <thead >
              <tr>
                <td scope="col"> </td>
                <td scope="col"> </td>
                <td scope="col"> </td>
                <td scope="col"> </td>
                <td scope="col">Банк</td>
                <td scope="col"> Карта</td>
                <td scope="col">Доллор </td>
                <td scope="col">Сум </td>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td scope="col"> </td>
                <td scope="col"> </td>
                <td scope="col"> </td>
                <td scope="col"> </td>
                <td scope="col">{data2.bank?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} cум</td>
                <td scope="col"> {data2.karta?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} cум</td>
                <td scope="col">{data2.dollar?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $</td>
                <td scope="col">{data2.sum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} cум</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MijozTolovTarixi