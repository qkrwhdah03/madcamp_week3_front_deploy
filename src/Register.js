import './Register.css';
import {HmacSHA256} from 'crypto-js';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(){
    const [username, setUsername] = useState('');
    const [belong, setBelong] = useState('');
    const [user_id, setUser_id] = useState('');
    const [password, setPassword] = useState('');
    const [check_password, setCheckPassword] = useState('');
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [isPasswordSame, setIsPasswordSame] = useState(true);
    const navigate = useNavigate();
    
    const setUsernameText = (e) => {
        setUsername(e.target.value.slice(0,10));
    }

    const setBelongText = (e) => {
        setBelong(e.target.value.slice(0,25));
    }

    const setId = (e) => {
    setUser_id(e.target.value.slice(0,15));
    setIsDuplicated(false); // 입력이 변경되면 중복 상태 초기화
    };

    const checkPassword1 = (e) => {
        const newPassword = e.target.value.slice(0,30);
        setPassword(newPassword);
        if(newPassword === check_password){
            setIsPasswordSame(true);
        } else{
            setIsPasswordSame(false);
        }
    }
    
    const checkPassword2 = (e) => {
        const newPassword = e.target.value;
        setCheckPassword(newPassword);
        if(password === newPassword){
            setIsPasswordSame(true);
        } else{
            setIsPasswordSame(false);
        }
    }

    const handleDuplicate = async() => {
        if(user_id === ""){
            alert("아이디를 입력해주세요.");
            return;
        } else if(user_id.length > 15){
            alert("아이디 길이는 15자이하로 설정해주세요.");
            return;
        }
        try{
            const response = await axios.get("http://172.10.7.46:80/duplicate", 
            {params: { 
                'user_id' : user_id,
                }
            });
            if (response.data === "True"){
                // 중복 확인 성공 
                setIsDuplicated(true);
            }
            else{
                setIsDuplicated(false);
                alert("이미 존재하는 아이디입니다.");
            } 
        }
        catch (error){
            console.error("Error in handlerDuplicate : ", error);
        } 
    }

    const submitRegister = async() =>{
        if(username.length <=0 || username.length > 10){
            alert("이름은 1자에서 10자이하만 가능합니다.");
            return;
        } else if(belong.length <= 0 || belong.length > 25){
            alert("소속은 1자이상 25자이하만 가능합니다.");
            return;
        }
        else if(!isPasswordSame){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        } else if(password.length <= 5 || password.length > 30){
            alert("비밀번호는 6자리 이상 30자리 이하로 설정해주세요.");
            return;
        } else if(!isDuplicated){
            alert("아이디가 중복확인을 해주세요.");
            return;
        }
        try{
            const key = "jongmohyeonseo";
            const hash_password = HmacSHA256(password,key).toString();
            const hash_password_check = HmacSHA256(check_password, key).toString();
            const response = await axios.post("http://172.10.7.46:80/register", 
            {
                'user_id' : user_id,
                'password' : hash_password,
                'password_check' : hash_password_check,
                'name' : username,
                'belong' : belong,
            });
            if (response.data === "True") {
                alert("새 계정이 등록되었습니다.");
                navigate("../Login",{replace: false});
            } else{
                alert("계정 등록에 실패했습니다.");
            }
        } 
        catch(error){
            console.error("Error in submitRegister : ", error);
        }
    }

    const registerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: "white",
        overflow: 'hidden',
      };
    
      const upperHalfStyle = {
        background: '#03C75A',
        width: '100%',
        padding: '15px',
        textAlign: 'center',
      };
    
      const lowerHalfStyle = {
        background: 'white',
        width: '100%',
        padding: '36px',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: "0px"
       
      };
    
      const busboyStyle = {
        fontSize: '55px',
        fontWeight: 'bold',
        color: 'white',
        marginTop: '20px',
        padding: '10px'
      };
    
      const motoStyle = {
        fontSize: '20px',
        color: 'white',
        paddingTop: '10px',
        paddingBottom: '25px',
      };
    
    return (
        <div style={registerStyle}>
            <div style={upperHalfStyle}>
                <div style={busboyStyle}>BUSBOY</div>
                <div style={motoStyle}><em>"Start your group work faster than anyone else"</em></div>
            </div>
            <div style={lowerHalfStyle}>
            <div className='Register' style={{background: "white", borderRadius: '4px',marginTop: '5px',padding: '15px', border: '1px solid #000' }}>
                <h2>회원가입</h2>
                <div className="name_input_class">
                    <label htmlFor="register_name_input">이름</label>
                    <input type="text" id="register_name_input" onChange={setUsernameText} />
                    <div className='blank'></div>
                </div>
                <div className="belong_input_class">
                    <label htmlFor="register_belong_input">소속</label>
                    <input type="text" id="register_belong_input" onChange={setBelongText} />
                    <div className='blank'></div>
                </div>
                <div className="id_input_class">
                    <label htmlFor="register_id_input">아이디</label>
                    <input type="text" id="register_id_input" onChange={setId}/>
                    <button type="submit" onClick={handleDuplicate} disabled={isDuplicated}
                    style={{background : isDuplicated ? '#535353':'#03C75A', fontWeight: 'bold', color:'white'}}>중복확인</button>

                </div>
                <div className="password_input_class">
                    <label htmlFor="register_password_input">비밀번호</label>
                    <input type="password" id="register_password_input" onChange={checkPassword1}/>
                    <div className='blank'></div>
                </div>
                <div className="register_password_re_input">
                    <label htmlFor="text1">비밀번호 확인</label>
                    <input type="password" id="register_password_re_input" onChange={checkPassword2} />
                    <div className='blank'></div>
                </div>

            <button style={{fontWeight: 'bold',}} className="submit_register" type="submit" onClick={submitRegister} color='white'>제출</button>
        </div>
        </div>
        </div>
    );
}
export default Register; 