import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBag from "./components/AddBag";
import SelectItems from "./components/SelectItems";
import BagManagement from "./components/BagManagement";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AddBag />} />
          <Route path="/select-items/:bagId" element={<SelectItems />} />
          <Route path="/bag-management/:bagId" element={<BagManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
