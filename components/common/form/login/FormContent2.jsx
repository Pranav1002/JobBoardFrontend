
'use client';

import Index from "@/components/dashboard-pages/candidates-dashboard/dashboard";
import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import React , { useState } from "react";
import { Navigate, Redirect, Route, Routes } from "react-router-dom";
import { api } from "@/data/api";
// import { Link } from "react-router-dom";
// import {useNavigate} from "react-router-dom";

const FormContent = () => {
const [username , setUsername] = useState('');
const [password,setPassword] = useState('');
const [link,setLink] = useState('');
const [rem,setRem] = useState(false);


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const apiUrl = api + 'auth/login'; 
    

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);
      if(rem){
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
      }
      localStorage.setItem('user', JSON.stringify(data));
    }
      if(data.user.authorities[0].roleId == '1' ){
        //console.log("job seeker ");
        window.location.href='candidates-dashboard/dashboard';
      } 
      else if(data.user.authorities[0].roleId == '2' ){
        //console.log("Employers");
        window.location.href='employers-dashboard/dashboard';
      }
    
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

  return (
    <div className="form-inner">
      <h3>Login to Superio</h3>

      {/* <!--Login Form--> */}
      <form method="post">
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username"  
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
        </div>
        {/* name */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" value={rem} onChange={(e) => setRem(e.target.checked)} />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            onClick={handleLogin}
          >
            Log In
            
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            // href="#"
            // className="call-modal signup"
            // data-bs-toggle="modal"
            // data-bs-target="#registerModal"
            href="/register"
          >
            Signup
          </Link>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
