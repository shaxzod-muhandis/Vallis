import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useParams,
  HashRouter,
} from "react-router-dom";
import DirektorPage from "./komponents/DirektorPage/DirektorPage";
import CEO from "./komponents/CEO/CEO";
import styled from "styled-components";
import Omborchi from "./komponents/Omborchi";
import CashierPage from "./komponents/KassirKomponents";
import "./komponents/DirektorPage/styles/salary-style.css";
import "./komponents/DirektorPage/styles/table-style.css";
import "./komponents/DirektorPage/styles/expense.css";
import "./komponents/DirektorPage/styles/chart.css";
import Login from "./komponents/Login";
import "./App.css";
import HR from "./komponents/HR/hr";
import ControlBuyProduct from "./komponents/ControlIncomeProduct/new_role";
import Supervisor from "./komponents/Supervisor/supervisor";
import Sverka from "./komponents/Sverka/sverka";
import GlobalProtectedRoute from "./GlobalProtectedRoute";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";
import { Provider } from "react-redux";
import store from "./Redux/store";
function TheLayout() {
  return null;
}
const StyledApp = styled.div`
.select__indicator .select__dropdown-indicator .css-tlfecz-indicatorContainer"{
  color:black !important;
}
  color: ${(props) => props.theme.fontColor};
`;

export default function App() {
  const [theme, setTheme] = useState("dark");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };


  return (
    <Provider store={store}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <HashRouter>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/director" component={DirektorPage} />
              <Route
                path="/control_buy_products"
                component={ControlBuyProduct}
              />
              <Route path="/hr" component={HR} />
              <Route path="/supervisor" component={Supervisor} />
              <Route path="/ceo" component={CEO} />
              <Route path="/accountant" component={Omborchi} />
              <Route path="/cashier" component={CashierPage} />
              <Route path="/sverka" component={Sverka} />
              <GlobalProtectedRoute
                path="/"
                name="Home"
                component={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </HashRouter>
        </StyledApp>
      </ThemeProvider>
    </Provider>
  );
}
