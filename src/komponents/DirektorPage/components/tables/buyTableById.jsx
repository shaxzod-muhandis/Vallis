import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import instance from "../../../../baseUrl";
import { WAREHOUSE } from "../../../../Redux/type";
import "../../styles/table-style.css";

export default function BuyTableById() {
    const params = useParams();
    const [state,setState] = useState([])
    const getProvider = async () =>{
        try {
            const res = await instance.get(`/order/provider-info-detail/${params?.id}/`)
            setState(res.data)
        } catch (error) {
            
        }
    }
    const history = useHistory()
    useEffect(()=>{
        getProvider()
    },[])
  return (
      <>
        <h1 onClick={()=> history.replace('/director/buy_products')} style={{color:"#fff",cursor:"pointer"}}>  Orqaga</h1>
    <div className="table-responsive">
    <table className="table table-striped table-hover text-center  mb-0">
        <thead>
            <tr>
                <th>T/P</th>
                <th>Taminotchi</th>
                <th>Ombor</th>
                <th>Category</th>
                <th>Mahsulot</th>
                <th>Miqdori</th>
                <th>Kirim narxi</th>
                <th>Qiymati</th>
                <th>kirim kuni</th>
            </tr>
        </thead>
    
      <tbody>
           {state.map((item,index)=> {
               const {product,price,quantity, warehouse} = item
               
               return (
                   <tr>
                       <td>
                            {product.id}
                       </td>
                        <td>
                            {product.provider.name}
                        </td> 
                        <td>
                            {warehouse.name}
                        </td>
                        <td>
                            {product.category.name}
                        </td>
                        <td>
                            {product.name}
                        </td>
                        <td>
                            {quantity}
                        </td>
                        <td>
                            {price.price}
                        </td>
                        <td>
                            {quantity * price.price}
                        </td>
                        <td>
                            {product.created_date.slice(0,product.created_date.indexOf("T"))}
                        </td>
                                              
                   </tr>
               )
           })}
      </tbody>
      {/* <div className="total-price">
        <span>Жами қиймати:{state.reduce((a,b) => a. )} </span>
      </div> */}
    </table>
    </div>
    </>
  );
}
