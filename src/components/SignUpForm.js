//import "./css/LoginForm.css";

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
    <div className="popUpContainer">
      <h1>Sign Up</h1>
      <button onClick={props.onClickClose}>X</button>
      <form className="logInForm">
        <label htmlFor="userName">Name</label>
        <input id="name" onChange={handleChangeInput}></input>
        <label htmlFor="userEmail">Email</label>
        <input id="email" onChange={handleChangeInput}></input>
        <label htmlFor="userPassword">Password</label>
        <input id="pw" onChange={handleChangeInput}></input>
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
