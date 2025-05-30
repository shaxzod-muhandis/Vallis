import React, {useState} from 'react'
import axios from './../../baseUrl';
import "./buyurtmalar.css"
import ControlledAccordions from './../ControlledAccordions'
import { BuyurtmaHeader, LoginInput, SubmitButton } from './styles'
import { observer } from "mobx-react";
import { globalState, getTasdiqlashArray, clearTasdiqlashArray } from './../../globalState';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useHistory } from 'react-router-dom';

const _Buyurtmalar = () => {
    const history = useHistory()
    const [orderId, setOrderId] = React.useState(0);
    const [orders, setOrders] = React.useState([]);
    const [tasdiqlanganlar, setTasdiqlanganlar] = React.useState([]);
    React.useEffect(()=>{
        setTasdiqlanganlar(getTasdiqlashArray());
    },[]);
    let lol = [];
    for(let i = 0; i < tasdiqlanganlar?.length; i++){
        lol.push(tasdiqlanganlar[i].id)
    }
    const warehouse = JSON.parse(sessionStorage.getItem('warehouse'))

    const newConfirmed = tasdiqlanganlar.map(item => Object.assign(item,{warehouse:warehouse?.id}))

    const [send , setSend] = React.useState(false)

    const handleClose = () =>{
        setSend(false)
    }
    const sendFunc = ()=>{
        setSend(true)
        axios.put(`order/sell-order-detail/${tasdiqlanganlar[0].client}/`,newConfirmed)
        .then( response => {
            if(response.status == 200){
                window.location.reload();
                setSend(false)
            }
            clearTasdiqlashArray();
            setSend(true)
            setTimeout(() => {
                setSend(false)
            }, 2000);
        })
        .catch(error => {

            console.error('There was an error!', error);
            setSend(false)
        });
    }
    return (
        <div style={{height:'110vh',background:'#222736',overflowY:'scroll'}}>
            <BuyurtmaHeader>
                <p>Tayyorlangan maxsulotlar </p>
                <SubmitButton
                    onClick = {() => {
                        sendFunc()
                    }}
                >
                    Tasdiqlash
                </SubmitButton>
            </BuyurtmaHeader> 
            <div className="row align-items-start" style={{width: "100%", pading: "0", margin: "0"}}>
                
                <div className="col-md-3">
                    <Agent getOrderId={(arg) => {setOrderId(arg)}}/>
                </div>
                <div className="col-md-9">
                    <ControlledAccordions _id={orderId} setOrdered={setOrders} setTasdiqlanganlar={(arg)=>{setTasdiqlanganlar(arg)}}/>
                </div>
            </div>
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
    )
}

export default observer(_Buyurtmalar);

const Agent = (props) => {

    const [agents, setAgents] = React.useState([]);
    
    const getAgent = () => {
        axios.get(`/order/get-agents/`)
        .then( response => {

            setAgents(response.data);
        })
        .catch(error => {

            console.error('There was an error!', error);
        });
    }

    React.useEffect(() => {
        getAgent();    
    },[])

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td>T/R</td>
              <td>Agent</td>
              <td>So'rovlar</td>
            </tr>
          </thead>
          <tbody>
            {agents.map((elem, index) => {
              return (
                <AgentItem
                  key={index}
                  elem={elem}
                  tr={index}
                  getOrderId={(arg) => {
                    props.getOrderId(arg);
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

const AgentItem = (props) => {
    console.log()
    return(
        <tr
            style={{cursor: "pointer"}}
            onClick={(event)=>{
                props.getOrderId(props.elem.id);
            }}
        >
            <td>{props.tr + 1}</td>
            <td>{props.elem.name}</td>
            <td>{props.elem.count}</td>
        </tr>
    )
}
