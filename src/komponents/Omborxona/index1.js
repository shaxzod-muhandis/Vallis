import React from 'react'
import { observer } from "mobx-react";
import { globalState } from "./../../globalState";
import {
    ListUl,
    ItemLi,
    Message,
    MessageText,
    SearchOmborxona,
    SearchInput,
    RequestButton,
    SearchWrapper,
    ScrollWrapper
} from "./styles"
import axios from './../../baseUrl'
import { getToken } from './../../globalState'
import DataPicker from './../DataPicker'
import Title from '../Title'
import PaginationOutline from './../PaginationOutline'
import KeyBoard from './../KeyBoard';

const _Omborxona = () => {

    const [name, serName] = React.useState("");
    const [start_quantity, setStart_quantity] = React.useState("");
    const [end_quantity, setEnd_quantity] = React.useState("");
    const [prd, setPrd] = React.useState([]);


    // input values
    const [inputValue2, setInputValue2] = React.useState("");
    // input values

    //pagination uchun
    const [offset, setOffset] = React.useState(0);
    const [count, setCount] = React.useState(1);
    const limit = 5;

    let productsAll = []; 

    const getMaxsulotlar = () => {

    axios.get(`/warehouse/warehouse-list/?name=${name}&start_quantity=${start_quantity}&end_quantity=${end_quantity}&limit=${limit}&offset=${(offset-1)*limit}`,{
        // params: {
        //     // term: term
        //     term: globalState.search
        // }
    }, {
            // headers: {
            //     'Authorization': `token ${getToken()}`
            // }
        })
        .then((res) => {
            setCount(res.data.count);
            setPrd(res.data.products);
            setCount(Math.floor(res.data.count/limit) + 1);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    React.useEffect(()=>{
        getMaxsulotlar();
    },[offset]);
    let tartibRaqami = 0;
    console.log(start_quantity,end_quantity);
    return (
      <>
        <Title padding="" text="Omborxonadagi maxsulotlar ro'yxati" />
        <div style={{ width: '100%', textAlign: 'center' }}>
          <SearchOmborxona>
            <SearchWrapper>
              <SearchInput
                onChange={(event) => {
                  serName(event.target.value);
                }}
                placeholder="nomi"
              />
              <div style={{ position: 'relative' }}>
                <SearchInput
                  // onChange={
                  //     (event) => {
                  //         setStart_quantity(event.target.value)
                  //     }}
                  placeholder="..dan"
                  value={inputValue2}
                  onFocus={() => {
                    console.log('fokus event');
                  }}
                  // setInputQiymati={(arg)=>{setInputValue2(arg)}}
                />
                <KeyBoard
                  setInputQiymati={(arg) => {
                    setInputValue2(arg);
                    setStart_quantity(arg);
                  }}
                />
              </div>
              <SearchInput
                onChange={(event) => {
                  setEnd_quantity(event.target.value);
                }}
                placeholder="..gacha"
              />
              <RequestButton
                onClick={() => {
                  getMaxsulotlar();
                }}
              >
                Qidirish
              </RequestButton>
            </SearchWrapper>
          </SearchOmborxona>
          <div style={{ padding: '0 20px' }}>
            <div className="table-responsive">
              <table className="table table-striped table-hover text-center  mb-0">
                <thead>
                  <tr>
                    <td scope="col">T/R</td>
                    <td scope="col">Nomi</td>
                    <td scope="col">Miqdori</td>
                    <td scope="col">Narxi</td>
                    <td scope="col">Turi</td>
                    <td scope="col">Sana</td>
                    <td scope="col">Mas'ul</td>
                  </tr>
                </thead>
                <tbody>
                  {prd.map((item, i) => {
                    return (
                      <ItemOne
                        key={i}
                        {...item}
                        product={item}
                        defaultOpen={i === 0}
                        tartibRaqami={i + 1}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
}

const ItemOne = (props) => {
    alert('dfghjkl;')
    const name = props.product.name;
    console.log(name,'fvvfvbfffbfbfdf')
    const quantity = props.quantity;
    const tartibRaqami = props.tartibRaqami;
    const last_price = props.last_price;
    const category = props.product.product.category.name;
    const responsible_agent = props.product.product.provider.responsible_agent;
    const sana = props.updated_date;
    const warningStyle = {
        color: "red"
    }
    return (
      <tr>
        <td>{tartibRaqami}</td>
        <td>{name}</td>
        <td style={quantity <= 0 ? warningStyle : {}}>{quantity}</td>
        <td>{last_price}</td>
        <td>{category}</td>
        <td className="text-success">
          <DataPicker style={{ width: '100%' }} disabled="true" date={new Date(sana)} />
        </td>
        <td>{responsible_agent}</td>
      </tr>
    );
}

export default observer(_Omborxona);
