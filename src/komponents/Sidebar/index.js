import React, { useState } from "react";
import {
  LeftSideBar,
  LeftSideBarItem,
  LeftSideBarList,
  LeftSideBarImg,
  LeftSidebarPopover,
} from "./styles";
import "./sidebar.css";
import img1 from "./../../img/img1.svg";
import img2 from "./../../img/img2.svg";
import img3 from "./../../img/img3.svg";
import img4 from "./../../img/img4.svg";
import img5 from "./../../img/img5.svg";
import img6 from "./../../img/img6.svg";
import img7 from "./../../img/img7.svg";
import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
  const [selected, setSelected] = useState(2);
  return (
    <LeftSideBar>
      <LeftSideBarList>
        <NavLink to="/accountant">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(2);
              setSelected(2);
            }}
            className={selected == 2 ? 'active' : ''}
          >
            {/* <LeftSideBarImg src={img2} /> */}
            <i className="fa-solid fa-truck  "></i>
            <LeftSidebarPopover>Buyurtma tayyorlash</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/omborxona">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(4);
              setSelected(4);
            }}
            className={selected == 4 ? 'active' : ''}
          >
            {/* <LeftSideBarImg src={img4} /> */}
            <i className="fa-solid fa-warehouse"></i>
            <LeftSidebarPopover>Ombor</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/productby">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(5);
              setSelected(5);
            }}
            className={selected == 5 ? 'active' : ''}
          >
            {/* <LeftSideBarImg src={img5} /> */}
            <i className="fa-solid fa-box"></i>
            <LeftSidebarPopover>Mahsulot qabuli</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/qaytgan-maxsulotlar">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(6);
              setSelected(6);
            }}
            className={selected == 6 ? 'active' : ''}
          >
            {/* <LeftSideBarImg src={img6} /> */}
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            <LeftSidebarPopover>Yashiklar</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/sotuv-bo'limi">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(8);
              setSelected(8);
            }}
            className={selected == 8 ? 'active' : ''}
          >
            {/* <LeftSideBarImg src={img3} /> */}
            <i className="fa-solid fa-basket-shopping"></i>
            <LeftSidebarPopover>Sotuv bo'limi</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/carline">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(9);
              setSelected(9);
            }}
            className={selected == 9 ? 'active' : ''}
          >
            {/* <i className="fas fa-car"></i> */}
            <i className="fa-solid fa-car-rear"></i>
            <LeftSidebarPopover>Moshinalar yo'nalishi</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/history">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(10);
              setSelected(10);
            }}
            className={selected == 10 ? 'active' : ''}
          >
            <i className="fa fa-truck"></i>

            <LeftSidebarPopover>Ombordan chiqgan maxsulotlar tarixi</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/out-history">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(11);
              setSelected(11);
            }}
            className={selected == 11 ? 'active' : ''}
          >
            <i className="fas fa-history"></i>
            <LeftSidebarPopover>Omborga kirgan maxsulotlar tarixi</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
        <NavLink to="/accountant/returnedpr">
          <LeftSideBarItem
            onClick={() => {
              props.getSelectItem(12);
              setSelected(12);
            }}
            className={selected == 12 ? 'active' : ''}
          >
            <i className="fas fa-exchange-alt"></i>
            <LeftSidebarPopover>Omborga qaytgan maxsulotlar tarixi</LeftSidebarPopover>
          </LeftSideBarItem>
        </NavLink>
      </LeftSideBarList>
    </LeftSideBar>
  );
}
