import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { setPlus, globalState } from "./../../globalState";
import { dispatch } from "../../Redux/store";
// import { globalState } from './../../globalState'
import {
  TopHeader,
  TopHeaderText,
  SearchKomponents,
  TopHeaderTel,
  MenuBar,
  LeftSideBarHeader,
  SearchButton,
  LeftSideBarImg,
  SearchHeader,
  TopHeaderAdd,
  SearchButtonIconc,
  Scret,
  SearchMeadia,
  SearchButtonIconcClose,
} from "./styles";
import logo from "./../../img/vallis.png";
import * as types from "../../Redux/type";
import instance from "../../baseUrl";
const _Header = (props) => {
  const history = useHistory();
  const [plusLocal, setPlusLocal] = useState(true);
  const [searchLocal, setSearchLocal] = useState(false);
  const [searchText, setSearchText] = useState("/order/sell-order-payment/");
  const p = useHistory();
  const [url, setUrl] = useState("/order/sell-order-payment/");
  const getUrl = () => {
    console.log(p?.location?.pathname);
    if (p?.location?.pathname == "/cashier") {
      setUrl("/order/sell-order-payment/");
      console.log(url);
    } else if (p?.location?.pathname == "/cashier/sell_order_list/") {
      setUrl("/order/sell-order-payment/");
      console.log(url);
    } else if (p?.location?.pathname == "/cashier/provider_list") {
      setUrl("/order/providers-with-debt/");
      console.log(url);
    } else if (p?.location?.pathname == "/cashier/buy_order_list") {
      setUrl("/order/buy-order-payment/");
      console.log(url);
    } else if (p?.location?.pathname == "/cashier/add_clinet") {
      setUrl("/expense_discount/expense-list/");
      console.log(url);
    } else if (p?.location?.pathname == "/cashier/add_expence") {
      setUrl("/expense_discount/expense-list/");
      console.log(url);
    } else if (p?.location?.pathname == "/cashier/client-debts") {
      setUrl("/order/clients-with-debt/");
      console.log(url);
    } else if (p?.location?.pathname == "/cashier/add_salary") {
      setUrl("/salary/salary-list/");
      console.log(url);
    }
  };

  useEffect(() => {
    getUrl();
  }, [p?.location?.pathname]);

  const setSearch = async () => {
    try {
      const res = await instance.get(`${url}?name=${searchText}`);
      // console.log(res?.data,'payments')
      dispatch({ type: types.SET_SEARCH, payload: res });
      dispatch({ type: types.COUNT });
      setSearchText("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSearch();
  }, []);
  return (
    <TopHeader>
      <LeftSideBarHeader>
        <LeftSideBarImg src={logo} />
      </LeftSideBarHeader>
      <TopHeaderText>{props.rolName}</TopHeaderText>
      {props.search == true ? (
        <div>
          <SearchMeadia style={searchLocal ? { display: 'block' } : {}}>
            <SearchKomponents>
              <SearchHeader
                className="header-search"
                placeholder="Izlash"
                onChange={(event) => setSearchText(event.target.value)}
              />
              <SearchButton
                onClick={() => {
                  setSearch();
                }}
              />
            </SearchKomponents>
          </SearchMeadia>
        </div>
      ) : (
        <></>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContenet: 'center',
        }}
      >
        {/* <Scret
          onClick={()=>{
            setSearchLocal(!searchLocal);
          }}>
          {
            searchLocal?
            <SearchButtonIconcClose>
              <i className="fas fa-times"></i>
            </SearchButtonIconcClose>:
            <SearchButtonIconc
              
            />
          }
             */}

        {/* </Scret> */}
        {props.plus == true ? (
          <TopHeaderAdd
            onClick={() => {
              setPlus(!globalState.plus);
              setPlusLocal(!plusLocal);
            }}
            style={{ marginRight: '20px' }}
          >
            {globalState.plus ? <i className="fas fa-minus"></i> : <i className="fas fa-plus"></i>}
          </TopHeaderAdd>
        ) : (
          <></>
        )}
        <TopHeaderTel href="/" onClick={() => localStorage.clear()}>
          <i className="fas fa-sign-out-alt"></i>
        </TopHeaderTel>
      </div>
    </TopHeader>
  );
};

export default observer(_Header);
