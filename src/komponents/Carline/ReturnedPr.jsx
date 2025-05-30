import React, { useEffect, useState } from 'react'
import instance from '../../baseUrl'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import './carline.css'
export default function ReturnedPr() {
    const [datas,setDatas] = useState([])
    const [page, setPage] = React.useState(0);
    const [loading,setLoading] = useState()
    const [agentHis,setAgentHis] = useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [select,setSelect] = useState('')
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const handleSelect = (e) =>{
      const {name,value} = e.target;
      setSelect({[name]:value})
      if(value !== 'agent') 
      return fetchData()
      return fetchAgentProducts()
    }
    const fetchAgentProducts = async() =>{
      try {
        const res = await instance.get('/order/to-agent-sell-order/')
        const data = res?.data?.results
        console.log(data);
        const final = data.filter(item => item.status !== 'delivered')
        console.log(final);
        setAgentHis(final)
      } catch (error) {
        console.log(error);
      }
    }
    console.log(agentHis);
    const fetchData = async() =>{
        setLoading(true)
        try {
            const res = await instance.get('/order/returned-product/?limit=1000');
            console.log(res);
            const {status,data} = res;
            if(status === 200){
                setDatas(data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    const columns = [{label:"Маҳсулот"},{label:"Мижоз"},{label:"Манзил"},{label:"Телефон рақам"},{label:"Агент"},{label:"Сотиш"},{label:"Қайтган Миқдор"},{label:"Ҳолати"},{label:"Тасдиқланган"},{label:'Тасдиқлаш'}]
    const columns2 = [{id:2,label:'Agent'},{id:3,label:'Mahsulot'},{id:5,label:'Qaytgan miqdor'},{label:'Тасдиқлаш'}]

    const confirmData = async(id) =>{
      console.log(id);
      try {
        const res = await instance.patch(`/order/approve-returned-product/${id}/`,{
          is_approved:'warehouseman'
        })
        if(res.status === 200){
          fetchData()
        }
      } catch (error) {
        console.log(error);
      }
    }
    const confirmAgent = async(id) =>{
      console.log(id);
      try {
        const res = await instance.patch(`/order/to-agent-sell-order/${id}/`,{
          approved:'true'
        })
        console.log(res);
        if(res.status === 200){
          fetchData()
        }
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
      fetchData()
    },[])
    
    return (
        <div>
            <div className="header">
            <h1 >Omborga qaytgan mahsulot </h1>
          <select name="select" onChange={handleSelect}>
            <option value="agent">
              Agentga
            </option>
            <option selected value="client">
              Клиент
            </option>
           
          </select>
          </div>
            <Table stickyHeader aria-label="sticky table">
          <TableHead>

            <TableRow>
            <TableCell>T/P</TableCell>
              { select.select === 'agent' ?
                columns2.map(item=>{
                  return (
                    <TableCell
                    key={item.id}
                  >
                    {item.label}
                  </TableCell>
                  )
                })
                :
              columns.map((column) => (
                <TableCell
                  key={column.label}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
            select.select === 'agent'
            ?
            loading === false ? 
            agentHis
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                  console.log(row);
                return (
                    <>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.agent.first_name}</TableCell>
                            <TableCell>{row.product.name}</TableCell>
                            <TableCell>{row.returned_quantity}</TableCell>
                            <TableCell>
                            {row.approved === false ? 
                              <i
                                className="far fa-check-circle"
                                onClick={()=>confirmAgent(row.id)}
                              ></i>
                              :
                              'Тасдиқланган'
                            }

                            </TableCell>
                    </TableRow>
                  </>
                );
              }) : 
              <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            :
            loading === false ? 
            datas.map((row,index) => {
                  console.log(row);
                return (
                    <>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell key={row.id} >
                               {row.sell_order?.product?.name}
                            </TableCell>
                            <TableCell key={row.id} >
                                {row.client.name}
                            </TableCell>
                            <TableCell key={row.id} >
                                {row.client.address}
                            </TableCell>
                            <TableCell key={row.id} >
                                {row.client.work_phone_number}
                            </TableCell>
                            <TableCell key={row.id} >
                                {row.agent.first_name} {row.agent.last_name}
                            </TableCell>
                            <TableCell key={row.id} >
                                {row.sell_order.quantity}
                            </TableCell>
                            <TableCell key={row.id} >
                                {row.returned_quantity}
                            </TableCell>
                            <TableCell key={row.id} >
                                {row.status === 'client_invalid' ? 'Мижоз қайтарган яроқсиз ' : 'Мижоз қайтарган яроқли'  }
                            </TableCell>
                            <TableCell key={row.id} >
                               {row.is_approved}
                            </TableCell>
                            <TableCell key={row.id} >
                              {row.is_approved === 'agent' ? 
                              <i
                                className="far fa-check-circle"
                                onClick={()=>confirmData(row.id)}
                              ></i>
                              :
                              'Тасдиқланган'
                            }
                            </TableCell>
                    </TableRow>
                  </>
                );
              }) : 
              <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
            }
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[5,10, 25, 100]}
            component="div"
            count={datas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
    )
}


