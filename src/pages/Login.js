import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

import "../components/css/ProfilePage.css";
import "./css/Login.css";

import { useState } from "react";

function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="loginPage">
      <div className="container">
        <h1>Notes</h1>
        <h3>Organize all your thoughts in one place.</h3>
        <LoginForm onClickRegister={handleShowSignUp}></LoginForm>
      </div>
      {showSignUp && (
        <div className="background">
          <SignUpForm
            show={showSignUp}
            onClickClose={handleShowSignUp}
          ></SignUpForm>
        </div>
      )}
    </div>
  );
}

export default Login;
