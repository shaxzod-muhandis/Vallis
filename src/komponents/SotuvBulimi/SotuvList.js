import React, { useEffect, useState } from "react";
import { LoginInput, HeaderSubmitInfo, SubmitButton } from "./styles";
import axios from "./../../baseUrl";
import ReactSelectMulti from "./../ReactSelectMulti";
import KeyBoard from "./../KeyBoard";
import ReactSelect from "./../ReactSelect";
import {
  setBuyArray,
  getBuyArray,
  clearBuyArray,
  oneQuantity,
  globalState,
  getSumBuyArray,
  setClientForBuyProduct,
} from "../../globalState";
import { observer } from "mobx-react";
import QulvolaSelect from "../QulvolaSelect";
import instance from "./../../baseUrl";
import { TablePagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
function _SotuvList(props) {
  const [products, setProducts] = React.useState([]);
  const [catigoryIds, setCatigoryIds] = React.useState([]);
  const [catigory, setCatigory] = React.useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [clients, setClients] = React.useState([]);
  const [clientProducts, setClientProducts] = useState([]);
  const [clientsOld, setClientsOld] = useState([]);
  const [clientsId, setClientsId] = React.useState(0);
  const [agents, setAgents] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [type, setType] = useState("");
  const [agentId, setAgentId] = useState("");
  const [warehousePrd, setWarehousePrd] = useState([]);
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')
  const [count, setCount] = useState(0)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchName, setSearchName] = React.useState('');

  const getNewClints = () => {
    axios
      .get(`client/client-list/`, {
        params: {
          term: globalState.clientSearchText,
        },
      })
      .then((res) => {

        const ctg = res.data.clients.map((elem) => {
          return {
            label: elem.name,
            value: elem.id,
          };
        });
        setClients(ctg);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getBuyProducts = () => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get(`/warehouse/products/?limit=100000`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setProducts(res.data.results);

      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getAgents = async () => {
    try {
      const res = await instance.get("/user/agent-list/");
      const { status, data } = res;
      if (status == 200) {
        const agents = data.map((item) => {
          return {
            label: item.first_name,
            value: item.id,
          };
        });
        setAgents(agents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadio = (e) => {
    const { name, value } = e.target;
    setType({ [name]: value });
  };

  const getFilterProducts = async (arg) => {
    try {
      const res = await instance.get(
        `/product/outcome-price-list/?client=${clientsId[0]?.value}&warehouse=${warehouseObj?.id}&category=${arg}&limit=1000`
      );
      console.log(res.data);
      if (res.status == 200) {
        const { results } = res.data;
        setClientProducts(results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterrProducts = async (arg) => {
    try {
      const res = await instance.get(
        `/product/outcome-price-list/?agent=${clientsId[0]?.value}&category=${arg}&limit=1000`
      );

      if (res.status == 200) {
        const { results } = res.data;
        setClientProducts(results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await instance.get(`/warehouse/warehouse-list/?limit=${rowsPerPage}`);
      const { products } = res.data;
      setWarehousePrd(products);
      setNext(res.data.next)
      setPrev(res.data.previous)
      setCount(res.data.count)
    } catch (error) {
      console.log(error);
    }
  };
const [categ, setCateg] = useState([])
const [nameCate, setNameCate] = useState('')
  const Cate = ()=>{
    instance.get(`/product/category-list/`).then((res)=>{
      setCateg(res.data);
    })
  }

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    const res = await instance.get(`/warehouse/warehouse-list/?limit=${rowsPerPage}&offset=${newPage * rowsPerPage}`);
    const { products } = res.data;
    setWarehousePrd(products);
  };

  const handleChangeSearch = async (event, newPage) => {
    setPage(newPage);
    const res = await instance.get(`/warehouse/warehouse-list/?limit=10000&search=${searchName}`);
    const { products } = res.data;
    setWarehousePrd(products);
    console.log(res);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event);
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handlechange = (e) => {
    setSearchName(e.target.value);
    console.log(searchName);
  }
  useEffect(() => {
    handleChangeSearch()
  }, [searchName])

  useEffect(() => {
    getCategory()
  }, [rowsPerPage])

  useEffect(() => {
    Cate()
  }, [])
  useEffect(() => {
    instance.get(`/warehouse/warehouse-list/?limit=${rowsPerPage}&search=${searchName}&category=${nameCate}`).then((res)=>{
      setWarehousePrd(res.data.products);
      setCount(res.data.count)
    })
    
  }, [nameCate])

  useEffect(() => {
    getBuyProducts();
    // getClients();
    getCategory();
    getAgents();
  }, [catigoryIds, clientsId, globalState.buyArray.length]);
  const warehouseObj = JSON.parse(sessionStorage.getItem("warehouse"));

  return (
    <>
      <div className="radioContainer">
        <div>
          <input
            onChange={handleRadio}
            type="radio"
            id="contactChoice1"
            name="sale"
            value="agent"
          />
          <label for="contactChoice1">Agent uchun </label>
        </div>
        <div>
          <input
            onChange={handleRadio}
            type="radio"
            id="contactChoice2"
            name="sale"
            value="customer"
          />
          <label for="contactChoice2">Klient Uchun</label>
        </div>
      </div>
      {type.sale === 'agent' ? (
        <>
          <div className="row">
            <div className="col">
              <div style={{ padding: '0 20px', marginBottom: '15px' }}>
                <ReactSelectMulti
                  options={agents}
                  func={async (arg) => {
                    const id = arg[0]?.value;
                    setAgentId(id);
                  }}
                  placeholder="Agent tanlang"
                />
              </div>
            </div>

            <div className="col">
              <div style={{ padding: '0 20px', marginBottom: '15px' }}>
                <div className="input-group mb-3">
                  <div className="input-group-prepend cursor-pointer">
                    <span className="input-group-text" id="inputGroup-sizing-default">
                      <SearchIcon />
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => handlechange(e)}
                    className="form-control"
                    aria-label="Default"
                    placeholder="Izlash..."
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <select
                onChange={(e) => setNameCate(e.target.value)}
                name="search"
                id=""
                className="form-control"
              >
                <option>Category</option>
                {categ?.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex">
            <div className="col">
              <div style={{ padding: '0 20px', marginBottom: '15px' }}>
                <ReactSelectMulti
                  options={agents}
                  func={async (arg) => {
                    const id = arg[0]?.value;
                    if (!id) return;
                    try {
                      const res = await instance.get(`/client/client-list/?agent=${id}&limit=1000`);
                      const { status, data } = res;
                      if (status === 200) {
                        const { clients } = data;

                        const clientList = clients.map((item) => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        });
                        setClients(clientList);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  placeholder="Agent tanlang"
                />
              </div>
            </div>
            <div className="col">
              <div style={{ padding: '0 20px', marginBottom: '15px' }}>
                <ReactSelectMulti
                  options={clients}
                  func={async (arg) => {
                    const id = arg[0]?.value;
                    try {
                      const res = await instance.get(`/client/client-detail/${id}`);

                      const { status, data } = res;
                      if (status === 200) {
                        const { categories } = data;
                        const categoryList = categories.map((item) => {
                          return {
                            label: item.category,
                            value: item.category_id,
                          };
                        });
                        setCategoryList(categoryList);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    setClientsId(arg);
                  }}
                  placeholder="Klient tanlang"
                />
              </div>
            </div>
            <div className="col">
              <div style={{ padding: '0 20px' }}>
                {/* <div style={{ padding: "0 20px", marginBottom: "15px" }}>
                  <ReactSelectMulti
                    options={categoryList}
                    func={async (arg) => {

                      const id = arg[0]?.value;
                      try {
                        const res = await instance.get(`/client/client-detail/${id}`);
                        const { status, data } = res;

                        if (status === 200) {
                          const { categories } = data;
                          const categoryList = categories.map((item) => {
                            return {
                              label: item.category,
                              value: item.category_id,
                            };
                          });
                          setCategoryList(categoryList);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                      setClientsId(arg);
                    }}
                    placeholder="Klient tanlang"
                  />
                </div> */}
                <QulvolaSelect
                  options={categoryList}
                  placeholder="Kategoriyani tanlang"
                  funcValue={(arg) => {
                    setCatigoryIds(arg);
                    getFilterProducts(arg);
                    setClientForBuyProduct(arg);
                  }}
                  searchInputUchun={() => {
                    getNewClints();
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {type.sale === 'agent' ? (
        <BaySotuvListSubmit agent={true} />
      ) : (
        <BaySotuvListSubmit clientId={clientsId} />
      )}

      <div style={{ padding: '0 20px', position: 'relative' }}>
        {/* <EnhancedTable  warehousePrd={warehousePrd}/> */}
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td>T/R</td>
                <td>Maxsulot</td>
                <td>Hajmi</td>
                {type.sale === 'agent' ? <td>Miqdori</td> : <td>Narxi</td>}
              </tr>
            </thead>
            <tbody>
              {type.sale === 'agent'
                ? warehousePrd.map((elem, item) => {
                    return (
                      <>
                        <ProductBuyItemNew
                          key={elem.id}
                          tr={item + 1}
                          product={elem}
                          agent={true}
                          agentId={agentId}
                        />
                      </>
                    );
                  })
                : clientProducts.map((elem, item) => {
                    return (
                      <ProductBuyItemNew
                        key={elem.id}
                        tr={item + 1}
                        product={elem}

                        // clientId={clientsId}
                      />
                    );
                  })}
            </tbody>
          </table>
          {type.sale === 'agent' ? (
            <div className="w-100 d-flex justify-content-end">
              <TablePagination
                rowsPerPageOptions={[20, 40, 60]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
export default observer(_SotuvList);

const ProductBuyItemNew = observer((props) => {
  const [narx, setNarx] = React.useState(0);
  const [keybord, setKeybord] = useState(0);
  const [keybord1, setKeybord1] = useState(0);
  const [narxId, setNarxId] = React.useState(0);
  const [oneNarx, serOneNarx] = React.useState(0);
  const [inputValue, setInputValue] = React.useState(0);


  // const getNarx = () => {
  //   axios
  //     .get(
  //       `product/category-product/${props.product.category.id}/${props.clientId}/`
  //     )
  //     .then((res) => {
  //       setNarx(res.data[0].price);
  //       setNarxId(res.data[0].price_id);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const getQiymat = () => {
    setInputValue(oneQuantity(props.product.id));
  };

  // React.useEffect(() => {
  //   getNarx();
  //   getQiymat();
  // }, [globalState.buyArray.length]);

  return (
    <>
      {props.agent === true ? (
        <>
          <tr>
            <td >{props.tr}</td>
            <td>{props.product?.name}</td>
            <td>
              <div>
                <LoginInput
                  onFocus={() => {
                    setKeybord(1);
                  }}
                  value={inputValue}
                />
                {keybord == 1 ? (
                  <KeyBoard
                    setInputQiymati={(arg) => {
                      setInputValue(arg);
                      serOneNarx(+props.product.price * +arg);
                      setBuyArray(props.product?.id, props.agentId, narxId, arg);
                    }}
                    closeKeyboard={() => {
                      setKeybord(0);
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </td>
            <td>{props.product?.quantity}</td>
          </tr>

        </>
      ) : (
        <tr>
          <td>{props.tr}</td>
          <td>{props.product.product.name}</td>
          <td>
            <div className="calc">
              <LoginInput
                onFocus={() => {
                  setKeybord(1);
                }}
                value={inputValue}

              />
              {keybord == 1 ? (
                <KeyBoard
                  closeKeyboard={() => {
                    setKeybord(0);
                  }}
                  setInputQiymati={(arg) => {
                    setInputValue(arg);
                    serOneNarx(+props.product.price * +arg);
                    setBuyArray(
                      props?.product?.product?.id,
                      props.clientId,
                      props.product?.id,
                      arg
                    );
                  }}
                />
              ) : (
                <></>
              )}
            </div>
          </td>
          <td>{+oneNarx}</td>
        </tr>
      )}
    </>
  );
});
const warehouseObj = JSON.parse(sessionStorage.getItem("warehouse"));
const BaySotuvListSubmit = observer((props) => {
  const [maxsulot, setMaxsulot] = React.useState(getBuyArray());
  const price = sessionStorage.getItem("price");
  const agent = props.agent;

  React.useEffect(() => {

    setMaxsulot(getBuyArray());
  }, [globalState.buyArray.length]);
  return (
    <div style={{ padding: "0 20px", marginTop: "20px" }}>
      <HeaderSubmitInfo>
        <p style={{ color: "#fff" }}>
          Jami {maxsulot.soni} ta maxsulot {maxsulot.summa} ga sotilmoqda
        </p>
        {agent ? (
          <SubmitButton
            onClick={() => {
              let tekshirishga = getSumBuyArray();

              const data = tekshirishga.map((item) => {
                delete item.price;
                return item;
              });

              const newArr = data.map((item) =>
                Object.assign(item, { warehouse: warehouseObj?.id })
              );
              const finalData = newArr.map((item) => {
                return {
                  agent: item.client,
                  product: item.product,
                  quantity: item.quantity,
                  status: item.status,
                  warehouse: item.warehouse,
                };
              });
              let tbool = true;
              for (let i = 0; i < tekshirishga.length; i++) {
                if (+tekshirishga.price <= 0) {
                  tbool = false;

                }
              }
              if (tbool) {
                // const warehouseObj = JSON.parse(
                //   sessionStorage.getItem("warehouse")
                // );
                axios
                  .post(`/order/to-agent-sell-order/`, finalData)
                  .then((response) => {
                    alert("malumotlar tugri kiritildi");
                  })
                  .catch((error) => {

                    console.error("There was an error!", error);
                    alert("malumotlar tugri kiritilmagan");
                  });
              } else {
                alert("malumotlar tugri kiritilmagan");
              }

              clearBuyArray();
            }}
          >
            Tasdiqlash
          </SubmitButton>
        ) : (
          <SubmitButton
            onClick={() => {
              let tekshirishga = getSumBuyArray();
              const data = tekshirishga;
              const newData = data.map((item) => {
                delete item.status;
                return item;
              });
              const newArr = newData.map((item) =>
                Object.assign(item, {
                  warehouse: warehouseObj?.id,
                  client: props.clientId[0].value,
                  price: +item.price,
                  discount: 0,
                  status: "ordered",
                })
              );

              let tbool = true;
              for (let i = 0; i < tekshirishga.length; i++) {
                if (+tekshirishga.price <= 0) {
                  tbool = false;

                }
              }
              if (tbool) {
                // const warehouseObj = JSON.parse(
                //   sessionStorage.getItem("warehouse")
                // );
                axios
                  .post(`/order/sell-order-list/`, newArr)
                  .then((response) => {
                    alert("malumotlar tugri kiritildi");
                  })
                  .catch((error) => {

                    console.error("There was an error!", error);
                    alert("malumotlar tugri kiritilmagan");
                  });
              } else {
                alert("malumotlar tugri kiritilmagan");
              }

              clearBuyArray();
            }}
          >
            Sotilsin
          </SubmitButton>
        )}
      </HeaderSubmitInfo>
    </div>
  );
});
