import { useState } from "react";
import { Shots } from "./containers";
import { Filter, Navbar } from "./components";

import "./App.scss";

function App() {
  const [noScroll, setNoScroll] = useState(false);
  return (
    <div className={`App ${!noScroll ? "" : "noscroll"}`}>
        <Navbar setNoScroll={setNoScroll} />
        <Shots />
    </div>
  );
}

export default App;
