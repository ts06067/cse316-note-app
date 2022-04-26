import "./css/LoginForm.css";

import { useState } from "react";

function SignUpForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

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
    console.log("Sign up");
    console.log(name);
    console.log(email);
    console.log(pw);
  };

  return (
    <div className="popUpContainer">
      <h1>Sign Up</h1>
      <button onClick={props.onClickClose}>X</button>
      <form className="form">
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
