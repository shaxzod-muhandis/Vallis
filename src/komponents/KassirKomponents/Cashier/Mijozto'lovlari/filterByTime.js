import React, { useState, useEffect } from "react";
import { getDayData } from "../../../../Redux/action";
import instance from "../../../../baseUrl";
import { dispatch } from "../../../../Redux/store";
import * as actionTypes from "../../../../Redux/type";
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux'
const FilterByTime = (props) => {
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [period,setPeriod] = useState('')
  const [state, setState] = useState({
    month: false,
    today: false,
    week: false,
  });
  const selctor=useSelector(state=>state)
  const [searchText, setSearchText] = useState("");
  const p = useHistory();
  const [url, setUrl] = useState("/order/providers-with-debt/");
  const getUrl = () => {
    console.log(p?.location?.pathname)
    if ( "/cashier"===p?.location?.pathname ) {
      setUrl("/order/sell-order-payment/");
      console.log(url)
    } else if ( "/cashier/sell_order_list/"===p?.location?.pathname ) {
      console.log(url)
      setUrl("/order/sell-order-payment/");
      console.log(url)
    } else if ("/cashier/provider_list"===p?.location?.pathname  ) {
      setUrl("/order/providers-info/");
      console.log(url)
    } else if ( "/cashier/buy_order_list"=== p?.location?.pathname) {
      setUrl("/order/buy-order-payment/");
      console.log(url)
    } else if ( "/cashier/add_clinet"=== p?.location?.pathname) {
      setUrl("/expense_discount/expense-list/");
      console.log(url)
    }
    else if ( "/cashier/add_expence" ===p?.location?.pathname ) {
      setUrl("/expense_discount/expense-list/");
      console.log(url)
    }else if( '/cashier/add_salary' ===p?.location?.pathname){
      setUrl('/salary/salary-list/')
      console.log(url)
    }
  };
  useEffect(() => {
    getUrl();
  }, [selctor.countLink]);
  const onSetDay = async () => {
    try {
      const res = await instance.get(`${url}?limit=100000&period=day`);
      const {payments} = res.data;
      dispatch({ type: actionTypes.GET_Day_Data, payload:res });
    } catch (error) {

    }
  };
  const onSetWeek = async () => {
    try {
      const res = await instance.get(`${url}?limit=100000&period=week`);
      const {payments} = res.data;
      dispatch({ type: actionTypes.GET_Week_Data, payload:res });
    } catch (error) {

    }
  }
  const onSetMoth = async () => {
    try {
      const res = await instance.get(`${url}?limit=100000&period=month`);
      const {payments} = res.data;
      dispatch({ type: actionTypes.GET_Month_Data, payload:res });
    } catch (error) {

    }
  }
  
  const onSetDate = async () => { 
    try {
      const res = await instance.get(`${url}?limit=100000&date-from=${startDate}&date-to=${endDate}`);
      dispatch({ type: actionTypes.GET_Day_Data_By_Date, payload:res });
    } catch (error) {

    }
  }

    useEffect(()=>{
      if(startDate&&endDate){
        onSetDate()
      }else{
        console.log('salo')
      }
    },[endDate])
  return (
    <div className="filter-box">
      <select className="selectStyle" >
        <option value="">Барчаси</option>
        <option value="accepted">Тасдикланган</option>
        <option value="rejected">Рад етилган</option>
        <option value="waiting">Кутилмокда</option>
      </select>
      <input
        type="date"
        name="startDate"  
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        name="startDate"
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
};



export default FilterByTime;