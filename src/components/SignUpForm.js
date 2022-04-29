import "./css/LoginForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [errMRegister, setErrMRegister] = useState("");
  const [errMName, setErrMName] = useState("");
  const [errMEmail, setErrMEmail] = useState("");
  const [errMPw, setErrMPw] = useState("");

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
    const validateEmail = (email) => {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    };

    e.preventDefault();

    setErrMName("");
    setErrMEmail("");
    setErrMPw("");

    api
      .post("/users/register", { name, email, password: pw })
      .then((res) => {
        console.log("Registered");
        navigate("/app");
      })
      .catch((err) => {
        const status = err.response.status;

        //validate on client side
        if (name.length === 0) {
          setErrMName("Name is required");
        }
        if (email.length === 0) {
          setErrMEmail("Email is required");
        } else if (!validateEmail(email)) {
          setErrMEmail("Not a valid email");
        }
        if (pw.length === 0) {
          setErrMPw("Password is required");
        } else if (pw.length < 6) {
          setErrMPw("Password must be at least 6 characters long");
        }

        if (status === 501) {
          //MongoServerError
          setErrMRegister(
            "Unable to create an account. Maybe the email is already being used."
          );
        }
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
        {errMName !== "" && <div className="errorMessage">{errMName}</div>}
        <label className="logInLabel" htmlFor="userEmail">
          Email
        </label>
        <input
          className="logInInput"
          id="email"
          onChange={handleChangeInput}
        ></input>
        {errMEmail !== "" && <div className="errorMessage">{errMEmail}</div>}
        <label className="logInLabel" htmlFor="userPassword">
          Password
        </label>
        <input
          type={"password"}
          className="logInInput"
          id="pw"
          onChange={handleChangeInput}
        ></input>
        {errMPw !== "" && <div className="errorMessage">{errMPw}</div>}
        {errMRegister !== "" && (
          <div className="errorMessage">{errMRegister}</div>
        )}
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
