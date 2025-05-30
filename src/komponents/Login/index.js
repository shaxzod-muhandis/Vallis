import React, { useEffect, useState } from "react";
import "./login-style.css";
import Logo from "../../img/vallis.png";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import hide from "../../img/hide.png";
import instance from "./../../baseUrl";
import { setUser } from "./../../globalState";


function Login() {
  const history = useHistory();
  const [type,setType] = useState(false)
  const [state, setState] = useState({
    username: "",
    password: "",
    data: [],
    error: false,
  });
  const signIn = async (e) => {
    e.preventDefault();
    const { username, password } = state;
    try {
      const res = await instance.post("/user/login/", { username, password });
      console.log(res);
      const { data, status } = res;
        const { role, department } = data.user;
        const { token, warehouse } = data;
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("warehouse", JSON.stringify(warehouse));
        if (role === "director") {
          history.push("/director");
        } else if (role === "CEO") {
          history.push("/ceo");
        } else if (role === "accountant") {
          history.push("/accountant");
        } else if (role === "cashier") {
          history.push("/cashier");
        } else if (role === "agent") {
          history.push("/agent");
        } else if (role === "hr") {
          history.push("/hr");
        } else if (role === "commodity_accountant") {
          history.push("/control_buy_products");
        } else if (role === "supervisor" && department.id !== undefined) {
          history.push("/supervisor");
        } else if (role === "sverka") {
          history.push("/sverka");
        } else {
          alert("Departament mavjud emas!");
        }
      setState(prev => ({ ...prev,data: res.data }));
      setUser(res);
    } catch (error) {
      setState(prev => ({...prev,error: true }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  return (
    <div className="account-page">
      <div className="container">
        <div className="card">
          <div className="card-header p-4">
            <h5>Vallisga Xush kelibsiz !</h5>
            <p>Xizmatlaridan foydalanish uchun tizimga kiring.</p>
            <NavLink to="/" className="logo">
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>
          <div className="card-body p-4">
            <form onSubmit={signIn}>
              <div className="mt-5">
                <label className="error">
                  {state.error ? "Qaytadan urinib ko'ring!" : ""}
                </label>
                <label htmlFor="phone">Telefon raqam</label>
                <input
                  id="phone"
                  type="text"
                  name="username"
                  placeholder="Telefon raqam"
                  className="form-control"
                  required
                  onChange={handleInputChange}
                />
                <div style={{ position: "relative" }}>
                  <label htmlFor="password">Parol</label>
                  <input
                    id="password"
                    type={type ?"text"  : "password"}
                    placeholder="Parol"
                    className="form-control"
                    name="password"
                    required
                    onChange={handleInputChange}
                  />
                  <img
                  onClick={()=>setType(!type)}
                    style={{
                      height: "16px",
                      position: "absolute",
                      right: "10px",
                      top: "44px",
                    }}
                    src={hide}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
