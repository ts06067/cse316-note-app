import "./css/LoginForm.css";

import { useState } from "react";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Log in");
    console.log(email);
    console.log(pw);
  };

  return (
    <div className="container">
      <form className="form">
        <label htmlFor="userEmail">Email</label>
        <input id="email" onChange={handleChangeInput}></input>
        <label htmlFor="userPassword">Password</label>
        <input id="pw" onChange={handleChangeInput}></input>
        <button onClick={handleSubmit}>Log in</button>
      </form>
      <button onClick={props.onClickRegister}>Create New Account</button>
    </div>
  );
}

export default LoginForm;
