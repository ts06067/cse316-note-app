import "./css/LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const api = axios.create({ baseURL: "http://localhost:5000" });

  const handleChangeInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "pw":
        setPw(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { password: pw, email: email };
    api.post("/users/login", body, { withCredentials: true }).then((res) => {
      console.log(res.data);
      navigate("/app");
    });
  };

  const handleInfo = async (e) => {
    e.preventDefault();
    api.get("/users/info", { withCredentials: true }).then((res) => {
      const data = res.data;
      console.log("userId: " + data);
    });
  };

  return (
    <div className="container">
      <form className="form">
        <label htmlFor="userEmail">Email</label>
        <input id="email" onChange={handleChangeInput}></input>
        <label htmlFor="userPassword">Password</label>
        <input id="pw" onChange={handleChangeInput}></input>
        <button onClick={handleSubmit}>Log in</button>
        <button onClick={handleInfo}>UserID</button>
      </form>
      <button onClick={props.onClickRegister}>Create New Account</button>
    </div>
  );
}

export default LoginForm;
