import React, { useState } from 'react';
import axios from 'axios';

const AddProjectPopup = ({ onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [participants, setParticipants] = useState([]);
  const [states, setStates] = useState([]);
  const [description, setDescription] = useState('');

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
    setStates([...states, false]);
  };

  const handleRemoveParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    const updatedstates = states.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
    setStates(updatedstates);
  };

  const handleInputChange = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = value.slice(0,30); // 아이디는 30자 이내임
    const updatedstates = [...states];
    updatedstates[index] = false; 
    setParticipants(updatedParticipants);
    setStates(updatedstates);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.slice(0, 50)); // Limit to 100 characters
  };

  const handleAddProject = () => {
    //
    // Perform validation or additional checks if needed
    const areAllTrue = states.every((state) => state);
    if(areAllTrue){
      onAddProject({
        projectName,
        description,
        participants
      });

      // Clear the input fields
      setProjectName('');
      setParticipants([]);
      setDescription('');
      // Close the popup
      onClose();
    } else{
      alert("모든 참여자를 확인해야 합니다.");
    }
  };

  const handleCheckUser = async(index) => {
    const response = await axios.get("http://172.10.7.46:80/user", {params: { 'user_id' : participants[index]}});
    if(response.data === "True"){
      const updateStates = [...states];
      updateStates[index] = true; 
      setStates(updateStates); 
    } else {
      alert("해당 아이디를 가진 유저가 존재하지 않습니다.");
    }
  }

  return (
    <div style={popupStyle}>
      <h2 style={{paddingBottom: '15px', marginBottom: '16px', borderBottom: '2px solid #333' }}>새 프로젝트</h2>
      
      <div style={inputContainerStyle}>
        <label style={labelStyle}>프로젝트 이름</label>
        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value.slice(0,15))} style={inputStyle} />
      </div>

      <div style={inputContainerStyle}>
        <label style={labelStyle}>참여자</label>
        {participants.map((participant, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
            <input type="text" value={participant} onChange={(e) => handleInputChange(index, e.target.value)} style={inputStyle} />
            <button onClick={() => handleCheckUser(index)}  style={{
        ...buttonStyle, background: states[index] ? '#D9D9D9':'#4CAF50'}}>확인</button>
            <button onClick={() => handleRemoveParticipant(index)} style={buttonStyle}>-</button>
          </div>
        ))}
        <button onClick={handleAddParticipant} style={buttonStyle}>+</button>
      </div>

      <div style={inputContainerStyle}>
        <label style={labelStyle}> 프로젝트 설명 (최대 50자) </label>
        <textarea value={description} onChange={handleDescriptionChange} style={textareaStyle} />
      </div>

      <div style={{ marginTop: '16px' }}>
        <button onClick={handleAddProject} style={actionButtonStyle}>Add Project</button>
        <button onClick={onClose} style={{ ...actionButtonStyle, background: '#ccc', border: '#ccc', color:"#333" }}>Cancel</button>
      </div>
    </div>
  );
};

// Styles
const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  background: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  zIndex: 999,
  width: '450px', // 조절된 가로 길이
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // 추가
  justifyContent: 'center', // 추가
};

const labelStyle = {
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'left',
  width: '100%',
};

const textareaStyle = {
  width: '90%',
  padding: '8px',
  fontSize: '14px',
  resize: 'none',
  border: '1px solid #DDD',
}

const inputContainerStyle = {
  width: '330px',
  marginBottom: '16px',
  alignItems: 'center',
};

const inputStyle = {
  background : "#FFF",
  width: '100%',
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #DDD',
};

const buttonStyle = {
  marginLeft: '8px',
  padding: '8px',
  fontSize: '12px',
  cursor: 'pointer',
  color: '#fff',
  background :'#4CAF50',
  border: '0px solid #4CAF50'
};

const actionButtonStyle = {
  padding: '10px',
  fontSize: '15px',
  background: '#4CAF50',
  marginLeft : '20px',
  color: '#fff',
  cursor: 'pointer',
  border: '1px solid #4CAF50',
};

export default AddProjectPopup;