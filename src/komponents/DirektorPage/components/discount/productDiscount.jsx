import instance from '../../../../baseUrl'
import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import Option from '../create_price/SelectOption';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import preLoader from "../../../../img/loading-5.gif";

class ProductDiscount extends Component {
  state = {
    discount: "",
    is_active: "",
    product: "",
    category:'',
    productList: [],
    discountList: [],
    btn_type: "Қўшиш",
    update: false,
    updateData: false,
    id: "",
    categoryList:[],
    allOption:{
      label: "Барчасини танлаш",
      value: "*"
    },
    optionSelected:null,
    postData:[]
  };
  componentDidMount() {
    this.getProductList();
    this.getDuscountList();
    this.getCategoryList()
  }
  componentDidUpdate() {
    if (this.state.updateData !== false) {
      this.getDuscountList();
    }
  }
  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  getProductList = async () => {
    let productList = await instance.get("/product/product-list/?limit=1000");
    this.setState({
      productList: productList.data.products,
    });
  };
   getCategoryList = async () => {
    let productList = await instance.get(`/product/category-list/?limit=1000&`);
    console.log(productList);
    this.setState({
      categoryList:productList.data
    })
  };
  

  getDuscountList = async (category) => {
    let discountList = await instance.get(
      `/expense_discount/product-discount/?limit=1000&category=${category?category:""}`
    );
    this.setState({
      discountList: discountList.data.results,
      updateData: false,
    });
  };
  handleDepartment =(e)=>{
    const {value} = e.target;
    this.setState({
      category:value
    })
    this.getDuscountList(value);
  }
  
  createDiscount = (event) => {
    event.preventDefault();
    const url = "/expense_discount/product-discount/";
    const check = document.getElementById("usd");
    let is_active = check.checked ? true : false;
    const { discount, postData } = this.state;
    instance.post(url, { discount,products:postData , is_active }).then((data) => {
      this.setState({ updateData: true });
    });
  };
  onDelete = (e) => {
    const url = `/expense_discount/product-discount-detail/`;
    instance.delete(url + e).then((response) => {
      if (response.data != null) {
        this.setState({
          discountList: this.state.discountList.filter((data) => data.id != e),
        });
      }
    });
  };
  onDeleteAlert = (e) => {
    confirmAlert({
      message: "Ўчириш учун тасдиқланг",
      buttons: [
        {
          label: "Ўчириш",
          onClick: () => this.onDelete(e),
        },
        {
          label: "Қайтиш",
          onClick: () => console.log(""),
        },
      ],
    });
  };
  onEdit = (id) => {
    const url = "/expense_discount/product-discount-detail/";
    instance.get(url + id).then((response) => {
      this.setState({
        product: response.data.product.name,
        discount: response.data.discount,
        is_active: response.data.is_active,
        btn_type: "Сақлаш",
        update: true,
        id: id,
      });
    });
  };
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/expense_discount/product-discount-detail/${this.state.id}/`;
    const { product, discount, is_active } = this.state;
    instance.put(url, { discount, product, is_active }).then(() => {
      this.setState(
        {
          btn_type: "Қўшиш",
          update: false,
          creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
          updateData: true,
        },
        () =>
          setTimeout(() => {
            this.setState({
              creditial: "",
              updateData: false,
            });
          }, 3000)
      );
    });
  };
  render() {
    let count = 0;
    const {productList,category} = this.state
    const filteredProduct = productList.filter(item=> item.category.id == category)
    console.log(filteredProduct);
    const newArr = filteredProduct.map(({name,id})=> ({label:name,id:id}))
    console.log(newArr)
    const addKey = newArr.map(item=> Object.assign(item,{value:item?.label}))
    console.log(addKey);
    return (
      <div className="solary-box">
        <div className="filter-box mb-4">
          <h4>Маҳсулотга чегирма белгилаш</h4>
          <select name="department" onChange={(e)=>this.handleDepartment(e)}>
              <option value="">Барчаси</option>
              {this.state.categoryList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
            </select>
        </div>
     
        <form
          className="input-form"
          onSubmit={this.state.update ? this.onUpdate : this.createDiscount}
        >
          <input
            type="number"
            name="discount"
            value={this.state.discount}
            onChange={this.handleInput}
            placeholder="Миқдори дона"
          />
          <span>
            <input id="usd" type="checkbox" />
            <label htmlFor="usd">Фаол</label>
          </span>
          <select onChange={this.handleInput} name="category">
            <option value={this.state.category}>
              {"Жорий Категория " + this.state.category}
            </option>
            {this.state.categoryList.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
          <ReactSelect
            options={[this.state.allOption, ...addKey]}
            isMulti
            placeholder="Жорий Маҳсулот"
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option
            }}
            className='react-select'
            
            onChange={(selected = []) => {
              if (
                selected !== null &&
                selected.length > 0 &&
                selected[selected.length - 1].value === this.state.allOption.value
              ) {
                
                return  this.setState({
                  optionSelected:addKey
                })
              }
              console.log(selected);
              this.setState({
                optionSelected:selected
              })
              const arr = selected.map(item=> item.id)
              console.log(arr);
              this.setState({postData:arr})
            }}
            allowSelectAll={true}
            value={this.state.optionSelected}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#707491',
                primary: '#36394c',
              },
            })}
        />

          {/* <select onChange={this.handleInput} name="product">
            <option value={this.state.product}>
              {"Жорий Маҳсулот " + this.state.product}
            </option>
            {filteredProduct.map((list) => {
              return (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select> */}
          <button className="btn btn-primary" type="submit">
            {this.state.btn_type}
          </button>
        </form>
        <div className="solary-table table-responsive">
          <label className="notification">{this.state.creditial}</label>
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/P</td>
                <td scope="col">Миқдори</td>
                <td scope="col">Маҳсулот</td>
                <td scope="col">сатегорй</td>
                <td scope="col">Холати</td>
                <td scope="col">Таҳрирлаш</td>
              </tr>
            </thead>
            <tbody>
              {this.state.discountList.map((data) => {
                count++;
                if (data.length === 0) {
                  return <img src={preLoader} alt="" />;
                } else {
                  return (
                    <tr key={data.id}>
                      <td>{count}</td>
                      <td>{data.discount}</td>
                      <td>{data.product.name}</td>
                      <td>{data.product.category.name}</td>
                      <td>{data.is_active ? "Фаол" : "Фаолемас"}</td>
                      <td>
                        <i
                          className="fas fa-edit"
                          onClick={this.onEdit.bind(this, data.id)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={this.onDeleteAlert.bind(this, data.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProductDiscount;
