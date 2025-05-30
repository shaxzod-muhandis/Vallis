import React, { useuseEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style/kassir-sm-sidebar.css";
import * as actionTypes from "../../../../Redux/type";
import { dispatch } from "../../../../Redux/store";

const Sm_Sidebar = () => {
  const [active, setActive] = useState("");
  console.log(active);
  const AddActiveClass = (e) => {
    console.log(e);
    dispatch({ type: actionTypes.CLEAR_DATA });
    dispatch({ type: actionTypes.COUNT_LINK });
    setActive(e);
  };

  return (
    <>
      <div className="sm-sidebar-box kassir-sidebar">
        <div className="sm-sidebar-link">
          <ul>
            {/* <li className={active === "/cashier" ? "active-link" : ""}>
              <i className="fas fa-list-ul"></i>
              <span>Агент тўловлари </span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier"
                  onClick={() => AddActiveClass("/cashier")}
                >
                  Агент тўловлари
                </NavLink>
              </div>
            </li> */}
            <li className={active === '/cashier/cash-agent' ? 'active-link' : ''}>
              <i className="fas fa-money-bill-wave"></i>
              <span>Агент касса </span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/cash-agent"
                  onClick={() => AddActiveClass('/cashier/cash-agent')}
                >
                  Агент кассаи
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/sell_order_list' ? 'active-link' : ''}>
              <i className="fas fa-money-bill-wave"></i>
              <span>Тўловлар рўйхати </span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/sell_order_list"
                  onClick={() => AddActiveClass('/cashier/sell_order_list')}
                >
                  Тўловлар рўйхати
                </NavLink>
                <NavLink
                  exact
                  to="/cashier/accept_sell_order_list"
                  onClick={() => AddActiveClass('/cashier/accept_sell_order_list')}
                >
                  Тўловлар tasdiqlash
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/provider_list' ? 'active-link' : ''}>
              <i className="fas fa-list"></i>
              <span>Таминотчилар рўйхати </span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/provider_list"
                  onClick={() => AddActiveClass('/cashier/provider_list')}
                >
                  Таминотчилар рўйхати
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/buy_order_list' ? 'active-link' : ''}>
              <i className="fas fa-money-check-alt"></i>
              <span>Тўланганлар рўйхати </span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/buy_order_list"
                  onClick={() => AddActiveClass('/cashier/buy_order_list')}
                >
                  Тўланганлар рўйхати
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/add_clinet' ? 'active-link' : ''}>
              <i className="fas fa-user-plus"></i>
              <span>Харажатлар рўйхати </span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/add_clinet"
                  onClick={() => AddActiveClass('/cashier/add_clinet')}
                >
                  Харажатлар рўйхати
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/add_expence' ? 'active-link' : ''}>
              <i className="fas fa-cart-plus"></i>
              <span>Харажатлар қўшиш </span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/add_expence"
                  onClick={() => AddActiveClass('/cashier/add_expence')}
                >
                  Харажатлар қўшиш
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/add_salary' ? 'active-link' : ''}>
              <i className="fas fa-shopping-cart"></i>
              <span>Ойликлар қўшиш</span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/add_salary"
                  onClick={() => AddActiveClass('/cashier/add_salary')}
                >
                  Ойликлар қўшиш
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/client-debts' ? 'active-link' : ''}>
              <i className="fa-solid fa-credit-card"></i>
              <span>Мижозлар қарздорлиги</span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/client-debts"
                  onClick={() => AddActiveClass('/cashier/client-debts')}
                >
                  Мижозлар қарздорлиги
                </NavLink>
              </div>
            </li>
            <li className={active === '/cashier/client-debts' ? 'active-link' : ''}>
              <i className="fa-solid fa-credit-card"></i>
              <span>Мижозлар Туловларини тасдиклаш</span>
              <div className="sub-menu">
                <NavLink
                  exact
                  to="/cashier/mijoz-tolovtasdiqlash"
                  onClick={() => AddActiveClass('/cashier/mijoz-tolovtasdiqlash')}
                >
                  Мижозлар Туловларини тасдиклаш
                </NavLink>
                <NavLink
                  exact
                  to="/cashier/mijoz-tolov-tarixi"
                  onClick={() => AddActiveClass('/cashier/mijoz-tolov-tarixi')}
                >
                  Мижозлар Туловлари тарихи
                </NavLink>
              </div>
            </li>
            {/* <li 
                className={
                  active === "/cashier/add_dollars" ? "active-link" : ""
                }
              >
                <i className="fas fa-shopping-cart"></i>
                <span>Доллор қўшиш</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/cashier/add_dollars"
                    onClick={()=>AddActiveClass(this, "/cashier/add_dollars")}
                  >
                    Доллор қўшиш
                  </NavLink>
                </div>
              </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sm_Sidebar;
