import React, { useState } from "react";
import {HashRouter, useHistory} from "react-router-dom"
import AgentByOmborchi from "../AgentByOmborchi";
import ProductBuy from "../ProductBuy";
import Header from "./../Header";
import QaytganMaxsulotlar from "./../QaytganMaxsulotlar";
import Omborxona from "./../Omborxona";
import QaytarilganMaxsulotlar from "../QaytarilganMaxsulotlar";
import Sidebar from "./../Sidebar";
import { OmborchiWrapper } from "./styles";
import Buyurtmalar from "./../Buyurtmalar";
import SotuvBulimi from "./../SotuvBulimi";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import KeyBoard from "./../KeyBoard";
import Carline from "../Carline/carline";
import History from "../Carline/History";
import OutHistory from "../Carline/OutHistory";
import ReturnedPr from "../Carline/ReturnedPr";

export default function Omborchi() {
  // return <KeyBoard/>

  const [openLeftMenu, setLeftMenu] = useState(true);
  const [selectItem, setSelectItem] = useState(4);
  let { path, url } = useRouteMatch();
  const history = useHistory()

  const openCloseLeftMenu = (arg) => {
    setLeftMenu(arg);
  };


  const token = sessionStorage.getItem("token");
    if (token === null) {
      history.push("/");
    }

  return (
    
    <HashRouter>
      <Switch>
        <Route exact path={`${path}`}>
        <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />

          <OmborchiWrapper>
            <Buyurtmalar />
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/omborxona`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <Omborxona /> 
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/productby`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <ProductBuy /> 
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/qaytgan-maxsulotlar`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <QaytganMaxsulotlar />
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/qaytarilgan-maxsulotlar`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <QaytarilganMaxsulotlar />
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/sotuv-bo'limi`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <SotuvBulimi /> 
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/carline`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <Carline /> 
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/history`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <History />
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/out-history`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <OutHistory />
          </OmborchiWrapper>
        </Route>
        <Route exact path={`${path}/returnedpr`} >
          <Header hamburgerga={openCloseLeftMenu} rolName="Omborxona" />
          <Sidebar
            getSelectItem={(arg) => {
              setSelectItem(arg);
            }}
          />
          <OmborchiWrapper style={{height: '100vh', background: 'rgb(34, 39, 54)', overflowY: 'scroll'}}>
          <ReturnedPr />
          </OmborchiWrapper>
        </Route>
      </Switch>
    </HashRouter>
  );
}
