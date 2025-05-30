import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "./../../baseUrl";
import KeyBoard from "./../KeyBoard";
import { LoginInput } from "./styles";
import dateFormat, { masks } from "dateformat";
import {
  setTasdiqlashArray,
  getTasdiqlashArray,
  getOneTasdiqlashMiqdori,
  clearTasdiqlashArray,
} from "./../../globalState";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingTop: 30,
  },
  accordion: {
    backgrounfColor: "#000",
    color: "red",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "33.33%"
  },
  secondaryHeading2: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.dark,
    flexBasis: "33.33%"
  },
  dflax: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },
}));

export default function ControlledAccordions(props) {
  const [clients, setClients] = React.useState([]);

  const getClient = () => {
    axios
      .get(`/order/get-order/${props._id}`)
      .then((response) => {

        setClients(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  React.useEffect(() => {
    getClient();

  }, [props._id]);

  const classes = useStyles();



  return (
    <div className={classes.root}>
      {clients.map((elem, index) => {

        return (
          <AccordionItem
            setTasdiqlanganlar={(arg) => {
              props.setTasdiqlanganlar(arg);
            }}
            surovlar={elem.sell_orders}
            name={elem.name}
            soni={elem.count}
            sana={elem.sell_orders}
            key={elem.id}
          />
        );
      })}
    </div>
  );
}

const AccordionItem = (props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // const now = new Date(props.sana);
  // const sanai = dateFormat(now, "isoDateTime").slice(0, 10)


  return (
    <Accordion
      expanded={expanded === "panel" + props.key}
      onChange={handleChange("panel" + props.key)}
    >
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>{props.name}</Typography>
        <Typography className={classes.secondaryHeading}>
          So'rovlar soni {props.soni} ta
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ padding: "0 5px 5px 5px" }}>
        <OrderList
          setTasdiqlanganlar={props.setTasdiqlanganlar}
          orders={props.surovlar}
          getOrderId={(arg) => {
            props.getOrderId(arg);
          }}
        />
      </AccordionDetails>
    </Accordion>
  );
};

const OrderList = (props) => {
  const classes = useStyles();
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover text-center  mb-0">
        <thead>
          <tr>
            <td>T/R</td>
            <td>Nomi</td>
            <td>Buyurtma miqdori</td>
            <td>Buyurtma vaqti</td>
            <td>Berilgan miqdori</td>
            
            <td>Izoh</td>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((elem, index) => {

            return (
              <OrderListItem
                key={index}
                setTasdiqlanganlar={props.setTasdiqlanganlar}
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
};

const OrderListItem = (props) => {
  const classes = useStyles();

  const [narx, setNarx] = React.useState(props.elem.price.price);
  const [inputValue, setInputValue] = React.useState(0);

  const [keybord, setKeybord] = React.useState(false);

  React.useState(() => {
    setInputValue(0);

  }, [props.elem]);
  return (
    <tr>
      <td>{props.tr + 1}</td>
      <td>{props.elem.product.name}</td>
      <td>{props.elem.quantity}</td>
      <td>{props.elem.created_date.slice(0, 10)} {props.elem.created_date.slice(11, 16)}</td>
      <td>
        <div className={classes.dflax}>
          <input
            onFocus={(event) => {
              setKeybord(!keybord);
            }}
            value={inputValue}
          />
          {keybord == true ? (
            <KeyBoard
              setInputQiymati={(arg) => {
                setNarx(+arg * props.elem.price.price);
                setInputValue(arg);
                let elemId = props.elem.id;
                let productId = props.elem.product.id;
                let clientId = props.elem.client.id;
                let narx = props.elem.price.id;
                let quantity = props.elem.quantity;
                let discount = props.elem.discount;
                let product_discount = props.elem.product_discount;
                let _given_quantity = arg;
                setTasdiqlashArray(
                  elemId,
                  productId,
                  clientId,
                  narx,
                  quantity,
                  _given_quantity,
                  discount,
                  product_discount,
                );
                props.setTasdiqlanganlar(getTasdiqlashArray());
              }}
              closeKeyboard={() => {
                setKeybord(false);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </td>
      <td>{props.elem.comment}</td>
    </tr>
  );
};
