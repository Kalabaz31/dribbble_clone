import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Footer, ShotDetails, Shots } from "./containers";
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
                  <Shots pathName="/shots" setNoScroll={setNoScroll} />
                  <Footer />
                </>
              }
            />
            <Route
              path=""
              element={
                <>
                  <Navbar setNoScroll={setNoScroll} />
                  <Shots pathName="/shots" setNoScroll={setNoScroll} />
                  <Footer />
                </>
              }
            />
          </Route>

          <Route
            path="/shots/:id&:title"
            element={
              <>
                <Navbar setNoScroll={setNoScroll} />
                <ShotDetails />
                <Footer />
              </>
            }
          />
          <Route
            path=""
            element={
              <>
                <Navbar setNoScroll={setNoScroll} />
                <Shots pathName="/shots"  setNoScroll={setNoScroll}/>
                <Footer />
              </>
            }
          />
        </Route>

        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar setNoScroll={setNoScroll} />
              <Shots pathName="/shots" />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
