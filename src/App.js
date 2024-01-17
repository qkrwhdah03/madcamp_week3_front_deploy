import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Project_detail from './Project_detail';
import Dashboard_detail from './Dashboard_detail';
import Noleader_Dash from './Noleader_Dash';

const App = () => {
  return (

    /// 바로 그화면으로 넘어가는 부분
    // <div className="App">
    //   <Noleader_Dash/>
    // </div>

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard_detail" element={<Dashboard_detail />} />
        <Route path="/Noleader_Dash" element={<Noleader_Dash />} />
      </Routes>
    </Router>
  );
};

export default App;