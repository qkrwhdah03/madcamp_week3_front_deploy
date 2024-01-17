import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddProjectPopup from './AddProjectPopup';
import axios from 'axios';

const Projects = ({ userData, onProjectCreated }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddProject = async ({ projectName, description, participants }) => {
    participants.push(userData.user_id);

    const response = await axios.post("http://172.10.7.46:80/create_project", {
      'name': projectName,
      'leader':userData.user_id,
      'description': description,
      'team': participants
    });

    if (response.data === 'True') {
      alert("프로젝트 생성 완료");
      onProjectCreated();
    } else {
      alert("프로젝트 생성에 실패했습니다.");
    }
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const handleLogout = () => {
    navigate('../Login', { replace: true });
    alert("로그아웃 완료되었습니다.");
  };

  const handleDeleteProject = async (index) => {
    if (index !== null) {
      const projectId = userData.project[index].project_id;

      if (!window.confirm("삭제하시겠습니까?")) {
        return;
      }

      const response = await axios.post(`http://172.10.7.46:80/delete_project`, {
        'project_id': projectId,
      });

      if (response.data === 'True') {
        alert("프로젝트 삭제 완료");
        onProjectCreated();
        console.log("실행되었다"+userData.project);
      } else {
        alert("프로젝트 삭제에 실패했습니다.");
      }
    }
  };

  const handlepassusername=(index)=> {
    if (userData.user_id === userData.project[index].project_leader){
      navigate('../Dashboard_detail', {replace: false, state:{userData: userData, index: index}, callback: onProjectCreated} );
    }
    else {
      navigate('../Noleader_Dash', {replace: false, state:{userData: userData, index: index}});
    }
  }



  return (
    <div >
      <div style={{ background: 'white', padding: '8px', textAlign: 'center',border: 'px solid #888',borderRadius: '10px',marginBottom:"50px" }}>
        <h1 style={{ fontSize: '2em', marginBottom: '16px',textOrientation: 'mixed'}}>{userData.user_name}의 프로젝트</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={togglePopup} style={{borderRadius:'5px',border: '0px solid #fff', background: '#03C75A',color:'white',padding: '0.5em', fontSize: '1em',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>프로젝트 추가하기</button>
          {isPopupOpen && (<AddProjectPopup onClose={togglePopup} onAddProject={handleAddProject} />)}
          <button style={{ borderRadius:'5px' ,border: '0px solid #fff',background: '#03C75A',color:'white',padding: '0.5em', fontSize: '1em',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }} onClick={handleLogout}>로그아웃</button>
        </div>
      </div>

      <div style= {{margin:'auto', padding:'20px'}}>
      {userData.project && userData.project.length > 0 ? (
        <ul style={{padding: 0, listStyleType: 'none', display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', listStyleType: 'none', }}>
          {userData.project.map((project, index) => (
            <li key={index} style={{ marginTop: '15px', borderRadius: '8px', backgroundImage: 'url("./memo.png")', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', background: '#03C75A',  position: 'relative', border: '1px solid #ddd', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{padding: '8px 8px', position: 'absolute', top: '5px', right: '5px', cursor: 'pointer', padding: '5px', background: '#03C75A', borderRadius: '0%',color:'white' }} onClick={() => handleDeleteProject(index)}>
              x
              </div>
              {/* 클릭 시 프로젝트 세부 정보 페이지로 이동 */}
              <div onClick={()=>handlepassusername(index)} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ background: '#03C75A', padding: '8px', borderTopLeftRadius: '8px',borderTopRightRadius: '8px', marginBottom: '8px',marginTop: '-16px' }}>
                  <p style={{ fontWeight: 'bold',color:'white',fontSize:'20px' }}> {project.project_name} </p>
                </div>
                <div style={{ background: 'white', padding: '8px',borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',color:'black' }}>
                  <p> 설명: {project.project_description}</p>
                  <p> 팀장: {project.project_leader}</p>
                  <p> 멤버: {project.team.join(', ')}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No project available.</p>
      )}
    </div>
    </div>
  );
};

export default Projects;