import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "../Components/Navbar"
import Table from "../Components/Table"


const Routers = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Table />} />
      </Routes>
    </>
  );
};

export default Routers;
