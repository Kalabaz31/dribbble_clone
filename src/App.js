import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Shots } from "./containers";
import { Navbar, Login, Logout, Register } from "./components";

import "./App.scss";

function App() {
  const [noScroll, setNoScroll] = useState(false);
  return (
    <div className={`App ${!noScroll ? "" : "noscroll"}`}>
      <Routes>
        <Route path="/shots">
          <Route path="/shots/:type">
            <Route
              path="/shots/:type/:category"
              element={
                <>
                  <Navbar setNoScroll={setNoScroll} />
                  <Shots pathName="/shots" />
                </>
              }
            />
            <Route
              path=""
              element={
                <>
                  <Navbar setNoScroll={setNoScroll} />
                  <Shots pathName="/shots" />
                </>
              }
            />
          </Route>
          <Route
            path=""
            element={
              <>
                <Navbar setNoScroll={setNoScroll} />
                <Shots pathName="/shots" />
              </>
            }
          />
        </Route>

        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/logout" element={<Logout/> } />
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar setNoScroll={setNoScroll} />
              <Shots pathName="/shots" />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
