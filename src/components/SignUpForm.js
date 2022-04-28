import "./css/LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

  const handleChangeInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case "name":
        setName(value);
        break;
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

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/users/register", { name, email, password: pw }).then((res) => {
      console.log("Registered");
      navigate("/app");
    });
  };

  return (
    <div className="registerContainer">
      <div className="logInTitleWrapper">
        <div className="logInTitle">Sign Up</div>
        <button className="material-icons" onClick={props.onClickClose}>
          close
        </button>
      </div>
      <form className="logInForm">
        <label className="logInLabel" htmlFor="userName">
          Name
        </label>
        <input
          className="logInInput"
          id="name"
          onChange={handleChangeInput}
        ></input>
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
        <div className="registerLine"></div>
        <button
          style={{ width: "100px" }}
          className="registerButton"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
