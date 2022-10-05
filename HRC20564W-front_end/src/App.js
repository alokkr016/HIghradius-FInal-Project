import React, { useState, useEffect } from "react";

import Header from "./components/header/Header";
import Grid_Panel from "./components/grid_panel/GridPanel";
import Footer from "./components/footer/Footer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Grid_Panel />
      <Footer />
    </div>
  );
}

export default App;
