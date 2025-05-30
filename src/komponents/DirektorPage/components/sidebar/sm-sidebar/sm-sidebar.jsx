import instance from "../../../../../baseUrl";
import React, { useState, useEffect } from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import Logo from "../../../../../img/vallis.png";
import "./style/sm-sidebar.css";
import { dispatch } from "../../../../../Redux/store";
import * as types from "../../../../../Redux/type";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Sm_Sidebar = (props) => {
  // state = {
  //   active: "",
  //   fullScreen: false,
  //   click: false,
  //   mode: false,
  //   departmentList: [],
  //   department: "",
  // };
  const [open, setOpen] = useState(false);
  const [dollarValue, setDollarValue] = useState();
  const [patchDollar, setPatchDollar] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const [click, setClick] = useState(false);
  const [mode, setMode] = useState(false);
  const [departmentList, setDepartmentList] = useState([]);
  const [department, setDepartment] = useState("");
  const [active, setActive] = useState("");
  const [isWarehouse, setIsWarehouse] = useState(true);
  const [isCategory, setIsCategory] = useState(true);
  const [agent, setAgent] = useState([]);
  const [warehouse, setWarehouse] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const history = useHistory();
  const [productList, setProductList] = useState([]);
  const [isProduct, setIsProduct] = useState(true);
  const pathName = history.location.pathname;
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState("");
 
  const fiter = () => {
    if (
      pathName === '/director/group' ||
      pathName === '/director/create_provider' ||
      pathName === '/director/image_report' ||
      pathName === '/director/report' ||
      pathName === '/director/staff' ||
      pathName === '/director/agent_percent' ||
      pathName === '/director/settings_salary' ||
      pathName === '/director/hrm_dashboard' ||
      pathName === '/director/_expense' ||
      pathName === '/director/submite_expense' ||
      pathName === 'director/client-debtList' ||
      pathName === '/director/agent_percent' ||
      pathName === '/director/create_price_type' ||
      pathName === '/director/create_product' ||
      pathName === '/director/cilent_stats' ||
      pathName === '/director/discount' ||
      pathName === '/director/returned_product' ||
      pathName === '/director/sell_products' ||
      pathName === '/director/productdiscount' ||
      pathName === '/director/dashboard' ||
      pathName === '/director/buy_products' ||
      pathName === '/director/partiya' ||
      pathName === '/director/partiya_shopping' ||
      pathName === '/director/create_warehouse'
    ) {
      setIsWarehouse(false);
      setIsCategory(false);
      setIsProduct(false);
    } else if (pathName === '/director/buy_products' || pathName === '/director/productdiscount') {
      setIsWarehouse(false);
      setIsCategory(true);
      setIsProduct(false);
    } else if (
      pathName === '/director/outcome_price_create' ||
      pathName === '/director/price_type_for_agents' ||
      pathName === '/director/sales_for_agents' ||
      pathName === '/director/income_price_create'
    ) {
      setIsWarehouse(false);
      setIsCategory(false);
      setIsProduct(true);
    }
  };

  // function sayHi() {
  //   rd = ["1", "2", "3"];
  //   rd_n = rd[Math.floor(Math.random() * (rd.length - 1 - 0 + 1))];
  //   console.log("1---------".rd_n);
  //   if (rd_n == 2) {
  //     i_array = ["0", "1", "2", "3", "4"];
  //     bos_nomer =
  //       i_array[Math.floor(Math.random() * (i_array.length - 1 - 0 + 1))];
  //     bc_teaser = document.getElementsByClassName("bc_teaser")[bos_nomer];
  //     bc_teaser.getElementsByTagName("a")[0].click();
  //     console.log("2---------");
  //   }
  // }

  // document.addEventListener("DOMContentLoaded", function () {
  //   setTimeout(sayHi, 5000);
  // });

  const handleSelect = (e) => {
    const { name, value } = e.target;
  };
  const getWarehouse = async () => {
    try {
      const res = await instance.get("/warehouse/warehouses/");
      setWarehouseList(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getAgentList = async () => {
    try {
      const res = await instance.get("/director/agents/");
      setAgent(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDepartment = (e) => {
    const { value } = e.target;
    dispatch({ type: types.DEPARTMENT, payload: value });
  };

  const handleWarehouse = (e) => {
    const { value } = e.target;
    dispatch({ type: types.WAREHOUSE, payload: value });
  };

  const AddActiveClass = (e) => {
    setActive({ active: e });
  };
  const handleNotification = () => {
    props.parentNotif(true, true);
  };
  const handleClick = () => {
    setClick(!click);
    props.parentCallback(!click);
  };

  const getCategoryList = async () => {
    let productList = await instance.get("/product/category-list/?limit=1000");
    setCategoryList(productList.data);
  };
  const getProductList = async () => {
    try {
      const productList = await instance.get(
        `/product/product-list/?limit=1000`
      );
      setProductList(productList.data.products);
    } catch (error) {
      console.log(error);
    }

    // let productList = await instance.get("/product/product-list/?limit=1000");
    // setProductList(productList.data.data);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCategory({ [name]: value });
  };
  const getDepartmentList = async () => {
    const url = "/product/category-list/";
    await instance.get(url).then((response) => {
      setDepartmentList(response.data);
    });
  };
  const openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    setFullScreen(true);
  };
  const setProductId = () => {
    dispatch({ type: types.PRODUCT_ID, payload: product });
  };

  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    setFullScreen(false);
  };

  const togleInput = async () => {
    try {
      const res = await instance.get("core/currency");
      setDollarValue(res);
      setOpen(!open);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await instance.patch(`core/currency-update`, {
        currency_money: patchDollar,
      });
      const { status } = res;

      setDollarValue(res);
      // if (res?.status == 200) {
      //   Swal.fire({
      //     icon: "success",
      //     title: "Your work has been saved",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartmentList();
    getWarehouse();
    togleInput();
  }, []);
  useEffect(() => {
    fiter();
  }, [pathName]);
  useEffect(() => {
    getCategoryList();
    getProductList();
  }, []);
  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {
    setProductId();
  }, [product]);
  const filteredProduct = productList.filter(
    (item) => item.category.id == category.category
  );
  const clearRedux = () => {
    dispatch({ type: types.CLEAR_DATA });
  };
  useEffect(() => {
    clearRedux();
  }, [pathName]);
  return (
    <>
      <nav className={click ? 'navbar ' : 'navbar toggle'}>
        <div className="navbar-left">
          <div className="menu-icon" onClick={handleClick}>
            <i className="fas fa-bars" />
          </div>
        </div>
        {/* {isProduct ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <select
              className="selectStyle"
              onChange={handleInput}
              name="category"
            >
              <option value="">Select Category</option>
              {categoryList.map((list) => {
                return (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                );
              })}
            </select>
            <select
              className="selectStyle"
              onChange={(e) => setProduct(e.target.value)}
              name="product"
            >
              <option value="">Select Product</option>
              {filteredProduct?.map((list) => {
                return (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                );
              })}
            </select>
          </div>
        ) : null} */}
        {/* {isWarehouse ? (
          <select name="warehouse" onChange={(e) => handleWarehouse(e)}>
            <option value="">Барчаси</option>
            {warehouseList.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              );
            })}
          </select>
        ) : (
          <span></span>
        )} */}
        {window.location.pathname === '/director/dashboard' ? (
          <div>
            <input
              style={{
                outline: 'none',
                height: '38px',
                padding: '10px',
                marginRight: '15px',
              }}
              type="text"
              placeholder="Доллар курси"
              defaultValue={dollarValue?.data?.currency_money}
              // {!open ? disabled : ""}
              disabled={open}
              onChange={(e) => setPatchDollar(e.target.value)}
            />
            {!open ? (
              <button
                onClick={togleInput}
                style={{ marginLeft: '15px' }}
                className="btn btn-primary"
              >
                Қўшиш
              </button>
            ) : (
              <button onClick={() => setOpen(!open)} className="btn btn-danger">
                Тахрирлаш
              </button>
            )}
          </div>
        ) : (
          ''
        )}
        <div className="navbar-right" style={{ marginRight: '50px' }}>
          {/* {(!isCategory && <span className="navbar-brand"> </span>) || (
            <select name="department" onChange={(e) => handleDepartment(e)}>
              <option value="">Барчаси</option>
              {departmentList.map((data) => {
                return (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          )} */}
          <div className="full-screen">
            <i
              className="fas fa-expand"
              onClick={fullScreen ? closeFullscreen : openFullscreen}
            ></i>
          </div>
          {/* <div className="notification" onClick={handleNotification}>
            <i className="far fa-bell"></i>
            <div className={props.count ? "count d-none" : "count"}>1</div>
          </div>
          <div className="user-logo" onClick={() => setMode(!mode)}>
            <i className={mode === false ? "fas fa-moon" : "fas fa-sun"}></i>
          </div> */}
        </div>
      </nav>
      <div className={click ? 'sm-sidebar-box toggle' : 'sm-sidebar-box '}>
        <div className="sm-sidebar-link">
          <div className="mb-3 logo mt-0 pt-0">
            <img src={Logo} alt="User logo" />
          </div>
          <ul>
            <li className={active === '/director/dashboard' ? 'active-link' : ''}>
              <i className="fas fa-home"></i>
              <span>Дашбоард</span>
              <div className="sub-menu">
                <NavLink
                  to="/director/dashboard"
                  onClick={() => AddActiveClass('/director/dashboard')}
                >
                  Дашбоард
                </NavLink>
              </div>
            </li>
            <li className={active === '/director/partiya' ? 'active-link' : ''}>
              <i className="fas fa-plus"></i>
              <span>Партия</span>
              <div className="sub-menu">
                <NavLink to="/director/partiya" onClick={() => AddActiveClass('/director/partiya')}>
                  Партия қўшиш
                </NavLink>
              </div>
            </li>
            <li className={active === '/director/buy_products' ? 'active-link' : ''}>
              <i className="fas fa-layer-group"></i>
              <span>Омборхона</span>
              <div className="sub-menu">
                <NavLink
                  to="/director/buy_products"
                  onClick={() => AddActiveClass('/director/buy_products')}
                >
                  Омбор Менежмент
                </NavLink>
                <NavLink
                  to="/director/create_warehouse"
                  onClick={() => AddActiveClass.bind('/director/create_warehouse')}
                >
                  омбор очиш
                </NavLink>
              </div>
            </li>

            <li className={active === '/director/create_product' ? 'active-link' : ''}>
              <i className="fas fa-plus"></i>
              <span>Cтруктура</span>
              <div className="sub-menu">
                <NavLink
                  to="/director/group"
                  onClick={() => AddActiveClass.bind('/director/create_product')}
                >
                  {/* Департмент Қўшиш */}
                  Гурухлаш
                </NavLink>
                <NavLink
                  to="/director/create_provider"
                  onClick={() => AddActiveClass.bind('/director/create_product')}
                >
                  Таминотчи
                </NavLink>
              </div>
            </li>
            <li className={active === '/director/create_price_type' ? 'active-link' : ''}>
              <i className="fas fa-tags"></i>
              <span>Тип сена</span>
              <div className="sub-menu">
                <NavLink
                  to="/director/create_price_type"
                  onClick={() => AddActiveClass.bind('/director/create_price_type')}
                >
                  Тип сена Қўшиш
                </NavLink>
                <NavLink
                  to="/director/price_type_for_agents"
                  onClick={() => AddActiveClass.bind('/director/create_price_type')}
                >
                  Aгентлар учун нарх тури
                </NavLink>
                <NavLink
                  to="/director/income_price_create"
                  onClick={() => AddActiveClass.bind('/director/create_price_type')}
                >
                  Сотиб олиш нархи
                </NavLink>
                <NavLink
                  to="/director/outcome_price_create"
                  onClick={() => AddActiveClass.bind('/director/create_price_type')}
                >
                  Сотиш Нархи
                </NavLink>
                <NavLink
                  to="/director/sales_for_agents"
                  onClick={() => AddActiveClass.bind('/director/create_price_type')}
                >
                  Aгентлар учун сотиш нархи
                </NavLink>
              </div>
            </li>
            <li className={active === '/director/sell_products' ? 'active-link' : ''}>
              <i className="fas fa-poll"></i>
              <span>Маҳсулотлар</span>
              <div className="sub-menu">
                <NavLink
                  to="/director/sell_products"
                  onClick={() => AddActiveClass('/director/sell_products')}
                >
                  Маҳсулотларни <br /> Бошқариш
                </NavLink>
                <NavLink
                  to="/director/create_product"
                  onClick={() => AddActiveClass('/director/sell_products')}
                >
                  Маҳсулот Қўшиш
                </NavLink>
                <NavLink
                  to="/director/returned_product"
                  onClick={() => AddActiveClass('/director/sell_products')}
                >
                  Тасдиқлаш
                </NavLink>
                <NavLink
                  to="/director/maxsulot-qoldiq"
                  onClick={() => AddActiveClass('/director/sell_products')}
                >
                  Махсулот Колдик
                </NavLink>
              </div>
            </li>
            <li className={active === '/director/cilent_stats' ? 'active-link' : ''}>
              <i className="far fa-user"></i>
              <span>Маркетинг</span>
              <div className="sub-menu">
                {/* <NavLink
                    to="/director/create_agent_partner"
                    onClick={AddActiveClass.bind(
             
                      "/director/cilent_stats"
                    )}
                  >
                    Агент Жуфтлик Яратиш
                  </NavLink> */}

                {/* <NavLink
                    to="/director/add_client"
                    onClick={AddActiveClass.bind(
             
                      "/director/cilent_stats"
                    )}
                  >
                    Мижозлар Қўшиш
                  </NavLink> */}
                <NavLink
                  to="/director/cilent_stats"
                  onClick={() => AddActiveClass('/director/cilent_stats')}
                >
                  Мижозлар рўйхати
                </NavLink>
                <NavLink
                  to="/director/discount"
                  onClick={() => AddActiveClass('/director/cilent_stats')}
                >
                  Мижозларга Чегирмалар
                </NavLink>
                <NavLink
                  to="/director/productdiscount"
                  onClick={() => AddActiveClass('/director/cilent_stats')}
                >
                  Маҳсулотларга Чегирмалар
                </NavLink>
              </div>
            </li>
            <li className={active === '/director/moliya' ? 'active-link' : ''}>
              <i className="fas fa-hand-holding-usd"></i>
              <span>Молия</span>
              <div className="sub-menu">
                <NavLink to="/director/_expense" onClick={() => AddActiveClass('/director/moliya')}>
                  Харажатлар
                </NavLink>
                <NavLink
                  to="/director/oylik-hisobi"
                  onClick={() => AddActiveClass('/director/moliya')}
                >
                  Ходим ойлик хисоби
                </NavLink>
                <NavLink
                  to="/director/agent-cash"
                  onClick={() => AddActiveClass('/director/moliya')}
                >
                  Агент касса
                </NavLink>
                <NavLink to="/director/all-cash" onClick={() => AddActiveClass('/director/moliya')}>
                  Асосий касса
                </NavLink>
                <NavLink
                  to="/director/client-debtList"
                  onClick={() => AddActiveClass('/director/moliya')}
                >
                  Клиентлар қарздорлиги
                </NavLink>
              </div>
            </li>
            <li className={active === '/director/hrm' ? 'active-link' : ''}>
              <i className="fas fa-list"></i>
              <span>HRM</span>
              <div className="sub-menu">
                <NavLink
                  to="/director/hrm_dashboard"
                  onClick={() => AddActiveClass('/director/hrm')}
                >
                  Ойлик
                </NavLink>
                {/* <NavLink
                    to="/director/kpi"
                    onClick={AddActiveClass( "/director/hrm")}
                  >
                    КПИ қўйиш
                  </NavLink> */}
                <NavLink
                  to="/director/settings_salary"
                  onClick={() => AddActiveClass('/director/hrm')}
                >
                  Ойлик Белгилаш
                </NavLink>
                <NavLink
                  to="/director/agent_percent"
                  onClick={() => AddActiveClass('/director/hrm')}
                >
                  КПИ қўйиш
                </NavLink>
                <NavLink to="/director/staff" onClick={() => AddActiveClass('/director/hrm')}>
                  Ходимлар
                </NavLink>
                <NavLink
                  to="/director/image_report"
                  onClick={() => AddActiveClass('/director/hrm')}
                >
                  Агентлар ҳисоботи
                </NavLink>
                <NavLink to="/director/report" onClick={() => AddActiveClass('/director/hrm')}>
                  Хисобот
                </NavLink>
              </div>
            </li>
            <li>
              <a href="/" onClick={() => props.setLogin(false)}>
                <i className="far fa-arrow-alt-circle-left"></i>
              </a>
              <span>Чиқиш</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sm_Sidebar;
export const agentData = async (props) => {
  return props;
};
