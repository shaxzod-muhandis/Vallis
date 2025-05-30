import React from 'react'
import KeyBoard from '../KeyBoard';
import axios from './../../baseUrl'
import { BuyurtmaHeader, LoginInput, SubmitButton } from './styles'
import { setTasdiqlashArray, getTasdiqlashArray, getOneTasdiqlashMiqdori, clearTasdiqlashArray } from './../../globalState';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export default function Buyurtmalar2() {

    const [orderId, setOrderId] = React.useState("");
    const [orders, setOrders] = React.useState([]);
    console.log(orderId, "orderID")

    const [send , setSend] = React.useState(false)

    const handleClose = () =>{
        setSend(false)
    }
    console.log(
        getTasdiqlashArray()    
    );

    return (
        <div>
            <div className="row align-items-start" style={{width: "100%", pading: "0", margin: "0"}}>
                <div className="col-md-3">
                    <Agent getOrderId={(arg) => {setOrderId(arg)}}/>
                </div>
                
                <div className="col-md-6">
                    <BuyurtmaHeader>
                        <p>Tayyorlangan maxsulotlar</p>
                        <SubmitButton
                            onClick = {() => {
                                clearTasdiqlashArray();
                                setSend(true);
                                console.log(getTasdiqlashArray());
                                axios.put(`order/sell-order-detail/`,getTasdiqlashArray())
                                .then( response => {
                                    console.log(response.data);
                                    clearTasdiqlashArray();
                                    setSend(false)
                                })
                                .catch(error => {
                                    console.log({ errorMessage: error.toString() });
                                    console.error('There was an error!', error);
                                });
                                setSend(false)
                            }}
                        >
                            Tasdiqlash
                        </SubmitButton>
                    </BuyurtmaHeader>
                     <Agent/>
                    < vOrderList orders={orders} setOrderId={(arg) => setOrderId(arg)}/>
                    
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
                
                <div className="col-md-3">
                    <Client _id={orderId} setOrdered={setOrders}/>
                </div>

            </div>
        </div>
    )
}

const Agent = (props) => {

    const [agents, setAgents] = React.useState([]);
    
    const getAgent = () => {
        axios.get(`/order/get-agents/`)
        .then( response => {
            console.log(response.data);
            setAgents(response.data);
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
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
              <td>Surovlar</td>
            </tr>
          </thead>
          <tbody>
            {agents.map((elem, index) => {
              return (
                <AgentItem
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

const Client = (props) => {

    const [clients, setClients] = React.useState([]);
    
    const getClient = () => {
        axios.get(`/order/get-order/${props._id}`)
        .then( response => {
            console.log(response.data,"<-----");
            setClients(response.data);
        })
        .catch(error => {
            console.log({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    }

    React.useEffect(() => {
        getClient();
        console.log(props._id)   
    },[props._id])


    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover text-center  mb-0">
                <thead>
                    <tr>
                        <td>T/R</td>
                        <td>Mijoz</td>
                        <td>Surovlar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients.map((elem, index)=>{
                            return (
                                <ClientItem elem={elem} tr={index} setOrdered={props.setOrdered}/>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const ClientItem = (props) => {
    return(
        <tr
            style={{cursor: "pointer"}}
            onClick = {()=>{
                props.setOrdered(props.elem.sell_orders);
            }}
        >
            <td>{props.tr + 1}</td>
            <td>{props.elem.name}</td>
            <td>{props.elem.count}</td>
        </tr>
    )
}

const OrderList = (props) => {
    
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              <td>T/R</td>
              <td>Nomi</td>
              <td>Suralgan miqdori</td>
              <td>Berilgan miqdori</td>
              <td>Narxi</td>
            </tr>
          </thead>
          <tbody>
            {props.orders.map((elem, index) => {
              return (
                <OrderListItem
                  elem={elem}
                  tr={index}
                  getOrderId={(arg) => {
                    props.getOrderId(arg);
                  }}
                  setOrderId={(arg) => props.setOrderId(arg)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );

}
const warehouse = JSON.parse(sessionStorage.getItem('warehouse'))
console.log(warehouse);

const OrderListItem = (props) => {
    console.log(props);
    const [narx,setNarx] = React.useState(0);
    const [inputValue, setInputValue] = React.useState(0);
    const [keybord, setKeybord] = React.useState(0);
    React.useState(()=>{setInputValue(0);console.log("salom")},[props.elem]);
    return (
        <tr>
            <td>{props.tr + 1}</td>
            <td>{props.elem.product.name}</td>
            <td>{props.elem.product.name}</td>
            <td>
                <div style={{position: "relative"}}>
                    <LoginInput
                        onFocus={(event)=>{setKeybord(1)}}
                        value={inputValue}
                        onChange={() => props.setOrderId(props.elem.product_id)}
                    />
                    {
                        (keybord == 1)?
                        <KeyBoard
                            setInputQiymati={
                                (arg)=>{
                                    setNarx((+arg)*props.elem.price.price);
                                    setInputValue(arg);
                                    let elemId = props.elem.id;
                                    let productId = props.elem.product.id;
                                    let clientId = props.elem.client.id;
                                    let narx = props.elem.price.id;
                                    let quantity = props.elem.quantity;
                                    let _given_quantity = arg;
                                    // let discount = props.elem.discount;
                                    let product_discount = props.elem.product_discount;
                                    setTasdiqlashArray(elemId,productId,clientId,narx,quantity,_given_quantity, discount, product_discount);
                                }}
                            closeKeyboard={()=>{setKeybord(0)}}
                        />:
                        <></>
                    }
                </div>
            </td>
            <td>{narx}</td>
        </tr>
    )
}













// const KlinetZakaz = (props) => {
//     return(
//         <div className="table-responsive">
//             <table className="table table-striped table-hover text-center  mb-0">
//                 <thead>
//                     <tr>
//                         <td>Mijoz</td>
//                         <td>Maxsulot</td>
//                         <td>Hajmi(So'ralgan)</td>
//                         <td>Narxi</td>
//                         <td>Hajmi(Taklif)</td>
//                         <td>Umumiy narxi</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <KlinetZakazItem surovId={props.surovId} quantity={props.quantity}/>
//                 </tbody>
//             </table>
//         </div>
//     )
// }
//
// const KlinetZakazItem = (props) => {
//
//     const [surov, setSurov] = React.useState(props.surovId);
//     const [surovElem, setSurovElem] = React.useState(null);
//     const [valueInput, setValueInput] = React.useState(props.quantity);
//     const [valueInputDefault, setValueInputDefault] = React.useState("");
//
//     React.useEffect(() => {
//         console.log(props.quantity,"quantity props")
//         axios.put(`order/sell-order-detail/{id}/`)
//         .then( response => {
//             setSurovElem(response.data);
//             setSurov(setSurov(response.data.id));
//             // if(surovElem != null){
//             //     setValueInputDefault(getOneTasdiqlashMiqdori(surovElem.id));
//             //     setValueInput(getOneTasdiqlashMiqdori(surovElem.id));
//             // }else{
//             //     setValueInputDefault(0)
//             // }
//         })
//         .catch(error => {
//             console.error('There was an error!', error);
//         });
//     },[props.surovId]);
//
//     React.useEffect(() => {
//         if(surovElem != null){
//             setValueInputDefault(getOneTasdiqlashMiqdori(surovElem.id));
//             setValueInput(getOneTasdiqlashMiqdori(surovElem.id));
//         }
//     },[props.quantity])
//
//
//     if(surovElem == null){
//         return <></>
//     }else{
//         return (
//             <tr>
//                 <td>{surovElem.client.name}</td>
//                 <td>{surovElem.product.name}</td>
//                 <td>{surovElem.quantity}</td>
//                 <td>{surovElem.price.price}</td>
//                 <td>
//                     <LoginInput
//                         type="number"
//                         defaultValue={props.quantity}
//                         value={valueInput}
//                         onChange={(event) => {
//                             setValueInput(event.target.value);
//                             let elemId = surovElem.id;
//                             let productId = surovElem.product.id;
//                             let clientId = surovElem.client.id;
//                             let narx = surovElem.price.id;
//                             let quantity = surovElem.quantity;
//                             let _given_quantity = event.target.value;
//                             setTasdiqlashArray(elemId,productId,clientId,narx,quantity,_given_quantity);
//                         }}
//                     />
//                 </td>
//                 <td>{surovElem.price.price * valueInput}</td>
//             </tr>
//         )
//     }
//
// }