import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import instance from '../../../../baseUrl'
import { PaginationContainer } from '../tables/PaginationStyle'

const MaxsulotQoldiq = () => {
    const [ommbor, setOmmbor] = useState([])
    const [category, setCategory] = useState([])
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [sear, setSear] = useState("")
    const [sear2, setSear2] = useState("")
    const [sear3, setSear3] = useState("")

    useEffect(() => {
        instance.get(`/report/warehouse-list/`).then((res)=>{
            setOmmbor(res.data.warehouse_objects);
        }).catch((err)=>{
        })
        instance.get(`/product/category-list/`).then((res)=>{
          setCategory(res.data);
        }).catch((err)=>{
        })

        instance.get(`/report/warehouse-product-all-list/?id=2`).then((res)=>{
            setData(res.data.products);
            setCount(res.count)
        }).catch((err)=>{

        })
    }, [])
    
    const Qidiruv =()=>{
      instance.get(`/report/warehouse-product-all-list/?id=2&search=${sear}`).then((res)=>{
        setData(res.data.products);
        setCount(res.count)
    }).catch((err)=>{

    })
    }

    useEffect(() => {
      instance.get(`/report/warehouse-product-all-list/?id=${sear2}`).then((res)=>{
        setData(res.data.products);
        setCount(res.count)
    }).catch((err)=>{

    })
    }, [sear2])

    useEffect(() => {
      instance.get(`/report/warehouse-product-all-list/?id=2&category=${sear3}`).then((res)=>{
        setData(res.data.products);
        setCount(res.count)
    }).catch((err)=>{

    })
    }, [sear3])
    

  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
        <select
            className="warehouseId2 mx-3"
            onChange={(e)=>setSear2(e.target.value)}
          >
            <option value="">Омбор</option>
            {ommbor?.map((item) => {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        <select
            className="warehouseId2 mx-3"
            onChange={(e)=>setSear3(e.target.value)}
          >
            <option value="">Катигорияси</option>
            {category?.map((item) => {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>

          <div className="d-flex">
          <input type="text" name='searchname' onChange={(e)=>setSear(e.target.value)} className="warehouseId2 pl-3 ml-3" placeholder='Кидириш'/>
          <button onClick={Qidiruv} className="btn btn-success">Кидирув</button>
          </div>
        </div>
        
        <div className="register-table-box table-responsive p-0">
        
        <table className="table table-striped table-hover text-center  m-0">
          <thead>
            <tr>
              <td scope="col">T/R</td>
              <td scope="col">Номи</td>
              <td scope="col">Микдори</td>
              <td scope="col">Келиш нархи</td>
              <td scope="col">Сотиш Нархи</td>
            </tr>
          </thead>
          {data?.map((item, index) => {
            
            return (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity} {item?.unit}</td>
                  <td>{item.incoming_price}</td>
                  <td>{item.last_price} $</td>
                  
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <PaginationContainer>
        <ReactPaginate
          breakLabel="..."
          nextLabel="&raquo;"
          onPageChange={""}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(count / 10)}
          previousLabel="&laquo;"
          renderOnZeroPageCount={null}
        />
      </PaginationContainer>
    </div>
  )
}

export default MaxsulotQoldiq