import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LoginBtn from '../context/LoginBtn';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loggedInUser,setuserName}=useContext(UserContext);
  const {btnStatus,setButtonStatus}=useContext(LoginBtn);
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus("Logout");
    navigate('/');
    
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Sign-in</h1>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            required
            onChange={(e) => {
                setName(e.target.value)
                setuserName(e.target.value)
                }
                } 
          />
          <label>E-mail:</label>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            required
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label>Password:</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            required
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
