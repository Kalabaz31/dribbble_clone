import React, { useState, useEffect } from "react";
import { yz_logo, register_art } from "../../assets";

import "./Register.scss";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../features/auth/authSlice";

const Register = () => {
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
      navigate("/")
    }

    dispatch(reset());
  }, [navigate, dispatch, message, isError, isSuccess, user]);

  const [formInput, setFormInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      _type: "user",
      userName: formInput.username,
      email: formInput.email,
      password: formInput.password,
    };

    dispatch(register(userData));
  };
  return (
    <div className="app__register">
      <div className="register-sidebar">
        <header>
          <img src={yz_logo} alt="" />
          <h1>Discover the world’s top Designers & Creatives.</h1>
        </header>
        <div className="siderbar-art">
          <div className="art-img">
            <img src={register_art} alt="" />
          </div>

          <h5>Art by Irina Valeeva</h5>
        </div>
      </div>

      <div className="register-content">
        <p className="sign-in">
          Already a member? <a href="/login"> Sign in</a>
        </p>
        <div className="sign-up">
          <h1>Sign Up to Dribbble</h1>

          <div className="form">
            <div className="form-input">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" onChange={onChangeForm} />
            </div>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={onChangeForm} />
            </div>
            <div className="form-input">
              <label htmlFor="password">
                Password <a href="#forgot">Forgot password?</a>
              </label>
              <input type="password" name="password" onChange={onChangeForm} />
            </div>

            <button type="submit" onClick={onSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
