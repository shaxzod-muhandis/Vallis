import React, { useEffect } from "react";
import { LoginInput, SubmitButton, HeaderSubmitInfo } from "./styles";
import axios from "./../../baseUrl";
import { observer } from "mobx-react";
import "sweetalert2";
import ReactSelectMulti from "./../ReactSelectMulti";
import KeyBoard from "./../KeyBoard";
import {
  setSotibOlishArray,
  getSotibOlish,
  clearSotibOlishArray,
} from "./../../globalState";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Swal from "sweetalert2";

export default observer(function ProductBuyList(props) {
  const [products, setProducts] = React.useState([]);
  const [catigoryIds, setCatigoryIds] = React.useState([]);
  const [catigory, setCatigory] = React.useState([]);
  const [filterProducts, setFilterProducts] = React.useState([]);

  const getBuyProducts = () => {
    axios
      .get(`product/product-list/?limit=10000`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getBuyCatigory = () => {
    axios
      .get(`product/category-list/`)
      .then((res) => {
        const ctg = res.data.map((elem) => {
          return {
            label: elem.name,
            value: elem.id,
          };
        });
        setCatigory(ctg);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFilterProducts = () => {
    let productsFilter = [];
    products.forEach((element) => {
      catigoryIds.forEach((elem) => {
        console.log(elem.value);
        if (elem.value == element.category.id) {
          productsFilter.push(element);
        }
      });
    });
    setFilterProducts(productsFilter);
    console.log(productsFilter);
  };
  // console.log(products);
  React.useEffect(() => {
    getBuyProducts();
    getBuyCatigory();
    getFilterProducts();
  }, [catigoryIds]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div style={{ padding: "0 20px" }}>
            <ReactSelectMulti
              options={catigory}
              func={(arg) => {
                setCatigoryIds(arg);
              }}
              placeholder="Katigoriyalani tanlang"
            />
          </div>
        </div>
        <div className="col-6">
              <select name="" id="" className="form-control">
                <option>Партия</option>
              </select>
        </div>
      </div>

      <SotinOlishniTasdiqlash />

      <div style={{ padding: "0 20px", position: "relative" }}>
        <div className="table-responsive" style={{ height: "100vh" }}>
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td>T/R</td>
                <td>Yetkazib beruvchi</td>
                <td>Maxsulot</td>
                <td>Hajmi</td>
              </tr>
            </thead>
            <tbody>
              {filterProducts.map((elem, item) => {
                return (
                  <ProductBuyItemNew
                    key={elem.id}
                    tr={item + 1}
                    product={elem}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

const ProductBuyItemNew = (props) => {
  const [inputValue, setInputValue] = React.useState("");
  const [keybord, setKeybord] = React.useState(0);
  console.log(inputValue, "inpout");



  return (
    <>
      <tr>
        <td>{props.tr}</td>
        <td>{props.product.provider.name}</td>
        <td>{props.product.name}</td>
        <td>
          <div style={{ position: "relative" }}>
            <LoginInput
              value={inputValue}
              // onChange={(e) => {setInputValue(e.target.value); }}
              onFocus={() => {
                setKeybord(1);
              }}
            />
            {keybord == 1 ? (
              <KeyBoard
                setInputQiymati={(arg) => {
                  setInputValue(arg);
                  setSotibOlishArray(props.product.id, arg);
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
      </tr>
    </>
  );
};

const SotinOlishniTasdiqlash = observer(() => {
  const [send, setSend] = React.useState(false);
  const warehouseId = JSON.parse(sessionStorage.getItem("warehouse"));
  const handleClose = () => {
    setSend(false);
  };



  console.log(getSotibOlish())
  console.log(warehouseId)

  return (
    <div style={{ padding: "0 20px", marginTop: "20px" }}>
      <HeaderSubmitInfo>
        <p style={{ color: "#fff" }}>
          Jami {getSotibOlish().length} ta maxsulot
        </p>
        <SubmitButton
          onClick={() => {
            console.log("press");
            setSend(true);
            axios
              .post(
                `order/buy-order-list/`,
                getSotibOlish().map((item) =>
                  Object.assign(item, { warehouse: warehouseId.id })
                )
              )
              .then((response) => {
                console.log(response.data);
                if (response.data.price) {
                  Swal.fire({
                    text: response.data.price,
                    icon: "warning",
                  });
                  // alert(response.data.price);
                } else {
                  alert("Mahsulot qabul qilindi");
                }
                setSend(true);
                setTimeout(() => {
                  setSend(false);
                }, 2000);
              })

              .catch((error) => {
                console.log({ errorMessage: error.toString() });
                console.error("There was an error!", error);
                alert("Mahsulot qabul qilinmadi");
                setSend(false);
              });
            clearSotibOlishArray();
          }}
        >
          Qabul qilish
        </SubmitButton>
      </HeaderSubmitInfo>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal_progress"
        open={send}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={send}>
          <div>
            <CircularProgress />
          </div>
        </Fade>
      </Modal>
    </div>
  );
});
