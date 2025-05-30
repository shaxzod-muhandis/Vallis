import React from "react"; //kassir
import { BrowserRouter, Switch, Route, useRouteMatch, HashRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import NewClients from "./Cashier/Clients/AddClient/NewClients";
// import AddProvider from "../AddProvider/AddProvider";
// import ClientsList from "./Cashier/Clients/ClientsList";
import SellOrderPayment from "./Cashier/Clients/SellOrderPayment";
import AgentPullari from "./Cashier/AgentPullari/AgentPullari.jsx";
import ProvidersList from "./Cashier/Providers/ProvidersList";
import SellOrderPaymentList from "./Cashier/Clients/SellOrderPaymentList";
import BuyOrderPaymentList from "./Cashier/Providers/BuyOrderPaymentList";
import DollarWarehouse from "./Cashier/Moliyaviy_Resurslar/dollarWarehouse";
import Sm_Sidebar from "./sidebar/sm-sidebar/sm-sidebar";
import Expense from "./Cashier/Moliyaviy_Resurslar/expense";
import Salary from "./Cashier/Moliyaviy_Resurslar/salary";
import Header from "../Header";
import TotalStatic from "./Cashier/DepartmentBudget/index";

import "./Cashier/main.css";
import "../DirektorPage/styles/table-style.css";
import ClientDebts from "../DirektorPage/components/Debts/ClientDebts";
import CashRoute from "./Cashier/CashSection/CashRoute";
import BuyOrderPaymentId from "./Cashier/Providers/BuyOrderPaymentId";
import AcceptSellOrderPaymentList from "./Cashier/Clients/AcceptSellOrderPaymentList";
import MijozTolovTasdiqlash from "./Cashier/Mijozto'lovlari/MijozTolovTasdiqlash";
import MijozTolovTarixi from "./Cashier/Mijozto'lovlari/MijozTolovTarixi";

function CashierPage() {
  let { path, url } = useRouteMatch();
  const history = useHistory()

  const token = sessionStorage.getItem("token");
    if (token === null) {
      history.push("/");
    }

  return (
    <>
      <React.StrictMode>
        <HashRouter>
          <Sm_Sidebar url={url} />
          <div
            className="main-content-box"
            style={{
              padding: "90px",
              paddingLeft: "11px",
              paddingRight: "11px",
            }}
          >
            <Switch>
              <Route exact path={`/cashier/`}>
                <Header search={true} rolName="Kassir" /> <SellOrderPayment />
              </Route>
              <Route path={`/cashier/provider_list`}>
                <Header search={true} rolName="Kassir" /> <ProvidersList />
              </Route>
              <Route path={`/cashier/cash-agent`}>
                <Header search={false} rolName="Kassir" /> <AgentPullari />
              </Route>
              <Route path={`/cashier/provider-order/:id`}>
                <Header search={true} rolName="Kassir" /> <BuyOrderPaymentId />
              </Route>
              <Route path={`/cashier/add_clinet`}>
                <Header search={true} rolName="Kassir" />
                <TotalStatic />
              </Route>
              {/* <Route path={`/cashier/add_provider`}> 
                  <Header search={true} rolName="Kassir"/> <AddProvider/> 
                  tinglashni ishlamasa yoki ishlaringiz haqida yommon gapirsa
              </Route> */}
              {/* <Route path={`/cashier/new_clients`}> 
                  <Header search={true} rolName="Kassir"/> <NewClients/>
              </Route> */}
              <Route path={`/cashier/sell_order_list`}>
                <Header search={true} rolName="Kassir" />{" "}
                <SellOrderPaymentList />
              </Route>
              <Route path={`/cashier/accept_sell_order_list`}>
                <Header search={true} rolName="Kassir" />{" "}
                <AcceptSellOrderPaymentList />
              </Route>
              <Route path={`/cashier/buy_order_list`}>
                <Header search={true} rolName="Kassir" />{" "}
                <BuyOrderPaymentList />
              </Route>
              <Route path={`/cashier/add_expence`}>
                <Header search={true} rolName="Kassir" /> <Expense />
              </Route>
              <Route path={`/cashier/add_salary`}>
                <Header search={true} rolName="Kassir" /> <Salary />
              </Route>
              <Route path={`/cashier/mijoz-tolovtasdiqlash`}>
                <Header search={true} rolName="Kassir" /> <MijozTolovTasdiqlash />
              </Route>
              <Route path={`/cashier/mijoz-tolov-tarixi`}>
                <Header search={true} rolName="Kassir" /> <MijozTolovTarixi />
              </Route>
              <Route path={`/cashier/client-debts`}>
                <Header search={true} rolName="Kassir" /> <ClientDebts />
              </Route>
              <Route path={`/cashier/client-kassa`}>
                <Header search={true} rolName="Kassir" /> <CashRoute />
              </Route>
              {/* <Route path={`/cashier/add_dollars`}> 
                  <Header search={true} rolName="Kassir"/> <DollarWarehouse/>
              </Route> */}
            </Switch>
          </div>
        </HashRouter>
      </React.StrictMode>
    </>
  );
}

export default CashierPage;
