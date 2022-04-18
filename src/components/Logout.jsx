import React, { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  return <div>Logout</div>;
};

export default Logout;
