import React, { useState, useEffect } from "react";
import { yz_logo, login_art } from "../../assets";

import "./Login.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess || user) {
      console.log("user")
      navigate("/")
    }

    dispatch(reset());
  }, [navigate, dispatch, message, isError, isSuccess, user]);

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: formInput.username,
      password: formInput.password,
    };

    dispatch(login(userData));
  };
  return (
    <div className="app__login">
      <div className="login-sidebar">
        <header>
          <img src={yz_logo} alt="" />
          <h1>Discover the world’s top Designers & Creatives.</h1>
        </header>
        <div className="siderbar-art">
          <div className="art-img">
            <img src={login_art} alt="" />
          </div>

          <h5>Art by Irina Valeeva</h5>
        </div>
      </div>

      <div className="login-content">
        <p className="sign-up">
          Not a member? <a href="/register"> Sign up now</a>
        </p>
        <div className="sign-in">
          <h1>Sign in to Dribbble</h1>

          <div className="form">
            <div className="form-input">
              <label htmlFor="username">Username or Email Address</label>
              <input type="text" name="username" onChange={onChangeForm} />
            </div>
            <div className="form-input">
              <label htmlFor="password">
                Password <a href="#forgot">Forgot password?</a>
              </label>
              <input type="password" name="password" onChange={onChangeForm} />
            </div>

            <button type="submit" onClick={onSubmit}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
