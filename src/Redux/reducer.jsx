import {
  CLEAR_DATA,
  GET_Day_Data,
  GET_Day_Data_By_Date,
  SET_SEARCH,
  GET_Month_Data,
  GET_Week_Data,
  COUNT,
  COUNT_LINK,
  DEPARTMENT,
  WAREHOUSE,
  PRODUCT_ID
} from "./type";

const initialState = { count: 0, countLink: 0 };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_Day_Data:
      return { ...state, paymentList: action.payload };
    case GET_Month_Data:
      return { ...state, paymentList: action.payload };
    case GET_Week_Data:
      return { ...state, paymentList: action.payload };
    case GET_Day_Data_By_Date:
      return { ...state, paymentList: action.payload };
    case CLEAR_DATA:
      return { ...state, paymentList: {} };
    case SET_SEARCH:
      return { ...state, paymentList: action.payload };
    case COUNT:
      return { ...state, count: state.count + 1 };
    case COUNT_LINK:
      return { ...state, countLink: state.countLink + 1 };
    case DEPARTMENT:
      return { ...state, department: action.payload };
    case WAREHOUSE:
      return { ...state, warehouse: action.payload };
    case PRODUCT_ID:
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

export default reducer;
