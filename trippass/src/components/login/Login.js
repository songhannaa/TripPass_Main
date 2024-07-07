import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../styles/signup.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="formTitle">로그인</div>

        <div className="formbox">
          <label>아이디</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)}
              required />
        </div>

        <div className="formbox">
          <label>비밀번호</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required />
        </div>
        <button type="submit">로그인</button>
        <div className="signup">
          <Link to="/signup">	회원가입</Link>  
        </div>
        <ul className='loginList'>
          <li>──────&nbsp;&nbsp;<span>간편 로그인</span> &nbsp;&nbsp;──────</li>
          <li className='googleLogin'>구글 계정으로 로그인</li>
          <li className='kakaoLogin'>카카오 계정으로 로그인</li>
        </ul>
      </form>
      
    </>
  );
};

export default Login;
