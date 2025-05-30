import React, { Component } from "react";
import instance from '../../../../baseUrl'
import "./create-product.css";
import DataTable from "../tables/dataTable";

class CreateProduct extends Component {
  state = {
    productList: [],
    categoryList: [],
    providerList: [],
    name: "",
    unit: "",
    productImage:'',
    product_type: "",
    omborlar:[],
    warehouse:'',
    category: "",
    category_name: "",
    provider: "",
    provider_name: "",
    estimated_delivery_days: "",
    btn_type: "Қўшиш",
    updateTable: false,
    update: false,
    id: "",
    showForm:false
  };

  componentDidMount() {
    this.getCategoryList();
    this.getProviderList();
    this.getWareHouses()
  }
  handleInput = (e) => {
    const { name, value ,files} = e.target;
    this.setState({ [name]: value });
    if(name === 'productImage'){
      this.setState({productImage:files[0]})
    }
  };
  getCategoryList = async () => {
    const url = "/product/category-list/";
    await instance.get(url).then((response) => {
      this.setState({ categoryList: response.data });
    });
  };
  getProviderList = async () => {
    const url = "/provider/provider-list/";
    await instance.get(url).then((response) => {
      this.setState({ providerList: response.data.providers });
    });
  };
  onEdit = (id) => {
    const url = "/product/product-detail/";
    instance.get(url + id).then((response) => {
      console.log(response);
      this.setState({
        name: response.data.product.name,
        unit: response.data.product.unit,
        product_type: response.data.product.product_type,
        estimated_delivery_days: response.data.product.estimated_delivery_days,
        category: response.data.product.category.id,
        category_name: response.data.product.category.name,
        provider: response.data.product.provider.id,
        provider_name: response.data.product.provider.name,
        id: id,
        btn_type: "Сақлаш",
        update: true,
      });
    });
  };
   getWareHouses = async()=>{
         try {
           const res = await instance.get('/warehouse/warehouses/');
           console.log(res);
           this.setState({omborlar:res.data.results})
         } catch (error) {
           console.log(error);
         }
   }
  onUpdate = (e) => {
    e.preventDefault();
    const url = `/product/product-detail/${this.state.id}/`;
    const {
      name,
      unit,
      product_type,
      estimated_delivery_days,
      category,
      provider,
    } = this.state;
    instance.put(url, {
      name,
      unit,
      product_type,
      estimated_delivery_days,
      category,
      provider,
    });
    this.setState(
      {
        name: "",
        unit: "",
        product_type: "",
        category_name: "",
        provider_name: "",
        estimated_delivery_days: "",
        updateTable: true,
        creditial: "Ўзгартириш муваффақиятли бажарилди Кутинг!",
        btn_type: "Қўшиш",
        update: false,
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
  createProduct = async (e) => {
    e.preventDefault();
    console.log(this.state);
    const formData = new FormData();
    const url = "/product/product-list/";
    const {
      name,
      unit,
      product_type,
      category,
      provider,
      estimated_delivery_days,
      warehouse,
      productImage
    } = this.state;
    formData.append('name',name)
    formData.append('unit',unit)
    formData.append('product_type',product_type)
    formData.append('category',category)
    formData.append('provider',provider)
    formData.append('estimated_delivery_days',estimated_delivery_days)
    formData.append('warehouse',warehouse)
    formData.append('image',productImage);
     try {
       const res = await instance.post(url,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       }
       )
       console.log(res)
       if(res.status === 201){
         alert('Maxsulot qo\'shildi')
       }
     } catch (error) {
       console.log(error);
     }
    this.setState({ updateTable: true });
  };
  break = (childData) => {
    this.setState({ updateTable: childData });
  };
  
  render() {
    const { categoryList, providerList } = this.state;
    const headers = [
      "Т/Р",
      "Номи",
      "Категория",
      "Таминотчи",
      "Ўлчов тури",
      "Маҳсулот тури",
      "Етказиш муддати",
      "Таҳрирлаш",
    ];
    console.log(this.state);
    const name = "productList";
    return (
      <>
        <div className="adding-staff-box">
        {
          this.state.showForm ? <div className="form-box m-0 ">
            <div style={{display: "flex",justifyContent:"flex-end"}}>
            <button className="btn btn-danger" style={{width:"120px"}} onClick={() => this.setState({showForm:false})}>Yakunlash</button>
            </div>
         
          <label className="notification">{this.state.creditial}</label>
          <form
           className="mt-3"
            onSubmit={this.state.update ? this.onUpdate : this.createProduct}
          >
            <div className="row">
              <div className="col-md-4 col-lg-4">
                <span>Маҳсулот номи</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Номи"
                  value={this.state.name}
                  required
                  onChange={this.handleInput}
                />
                <span>Ўлчов тури</span>
                <select name="unit" onChange={this.handleInput}>
                  <option value={this.state.unit}>
                    {"Жорий ўлчов тури  " + this.state.unit}
                  </option>
                  <option value="litr">Литр</option>
                  <option value="kg">Кг</option>
                  <option value="ta">Дона</option>
                </select>
              </div>
              <div className="col-md-4 col-lg-4">
                <span>Маҳсулот тури</span>
                <select name="product_type" onChange={this.handleInput}>
                  <option value={this.state.product_type}>
                    {"Жорий Маҳсулот тури " + this.state.product_type ===
                    "limited"
                      ? "Чекланган"
                      : this.state.product_type}
                  </option>
                  <option value="limited">Чекланган</option>
                  <option value="unlimited">Чекланмаган</option>
                </select>
                <span>Етказиш муддати</span>
                <input
                  type="number"
                  name="estimated_delivery_days"
                  value={this.state.estimated_delivery_days}
                  required
                  onChange={this.handleInput}
                />
                
              </div>
              <div className="col-md-4 col-lg-4">
                <span>Маҳсулот категорияси</span>
                <select name="category" onChange={this.handleInput}>
                  <option value={this.state.category}>
                    {"Жорий категория " + this.state.category_name}
                  </option>
                  {categoryList === undefined
                    ? console.log("undefined")
                    : categoryList.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })}
                </select>
                <span>Таминотчи</span>
                <select name="provider" onChange={this.handleInput}>
                  <option value={this.state.provider}>
                    {"Жорий таминотчи  " + this.state.provider_name}
                  </option>
                  {providerList === undefined
                    ? console.log("undefined")
                    : providerList.map((provider) => {
                        return (
                          <option key={provider.id} value={provider.id}>
                            {provider.name}
                          </option>
                        );
                      })}
                </select>
                <span>Махсулот расми</span>
                <input
                  type="file"
                  name="productImage"
                  onChange={this.handleInput}
                />
                {/* <span>Омбор танлаш</span>
                <select name="warehouse" onChange={this.handleInput}>
                  <option value={this.state.omborlar}>
                    {"Жорий Омбор  " + this.state.provider_name}
                  </option>
                  {this.state.omborlar === undefined
                    ? console.log("undefined")
                    : this.state.omborlar.map((provider) => {
                        return (
                          <option key={provider.id} value={provider.id}>
                            {provider.name}
                          </option>
                        );
                      })}
                </select> */}
                <button className="btn btn-primary" type="submit">
                  {this.state.btn_type}
                </button>
              </div>
            </div>
          </form>
        </div>: <button className="btn btn-primary" style={{width:"200px"}} onClick={() => this.setState({showForm:true})}>Maxsulot qo'shish</button>
        }
          
        </div>
        <DataTable
          url={"/product/product-list/"}
          name={name}
          headers={headers}
          onEdit={this.onEdit}
          deleteUrl={"/product/product-detail/"}
          updateTable={this.state.updateTable}
          break={this.break}
        />
      </>
    );
  }
}

export default CreateProduct;
