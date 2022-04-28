import "./css/LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

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
    api
      .post("/users/login", body)
      .then((res) => {
        console.log(res.data);
        setErr(false);
        navigate("/app");
      })
      .catch((err) => setErr(true));
  };

  return (
    <div className="logInContainer">
      <form className="logInForm">
        <label className="logInLabel" htmlFor="userEmail">
          Email
        </label>
        <input
          className="logInInput"
          id="email"
          onChange={handleChangeInput}
        ></input>
        <label className="logInLabel" htmlFor="userPassword">
          Password
        </label>
        <input
          className="logInInput"
          id="pw"
          onChange={handleChangeInput}
        ></input>
        {err && (
          <div className="errorMessage">
            Error: Invalid email and/or password
          </div>
        )}
        <button className="logInButton" onClick={handleSubmit}>
          Log in
        </button>
      </form>
      <div className="logInLine"></div>
      <button
        style={{ width: "200px" }}
        className="registerButton"
        onClick={props.onClickRegister}
      >
        Create New Account
      </button>
    </div>
  );
}

export default LoginForm;
