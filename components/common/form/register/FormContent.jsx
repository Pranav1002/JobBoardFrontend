"use client"

import { api } from "@/data/api";
import { useState } from "react";

const FormContent2 = (props) => {
  const [username , setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [role, setRole] = useState(props.type == "js" ? ('JOB_SEEKER') :  ('COMPANY') );
  // console.log(role)
  // console.log(props.type)

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {

      const apiUrl = api+ 'auth/register';
      
      if(props.type.value == "js"){
        setRole('JOB_SEEKER');
        console.log(role);
      }
      else{
        setRole('COMPANY');
        console.log(role);
      }

  
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password,role }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Register successful:', data);
        window.location.href='/';
        
        
      } else {
        console.error('Register failed');
      }
    } catch (error) {
      console.error('Error during register:', error);
    }
  }

  return (
    <form method="post" action="add-parcel.html">
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      {/* name */}

      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button className="theme-btn btn-style-one" type="submit" onClick={handleRegister}>
          Register
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent2;
