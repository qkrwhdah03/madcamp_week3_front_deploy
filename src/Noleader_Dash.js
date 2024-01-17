import React from 'react';
import Profile from './Profile';
import Noleader_Detail from './Noleader_Detail';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Noleader_Dash.css'

const Noleader_Dash = () => {
  const location = useLocation();
  const { state } = location;
  const {userData, index} = state;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'}}>
      {/* 프로젝트 목록 */}
      <div className="NoleaderDetail">
        <Noleader_Detail userData ={userData} index = {index} />
      </div>
      
      {/* 프로필 영역 */}
      <div style={{ flex: '1', padding: '3vh',  paddingTop:'1.5vh', overflow: 'hidden', background:'#03C75A' }}>
        <Profile userData = {userData}  />
      </div>
    </div>
  );
};

export default Noleader_Dash;