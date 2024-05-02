"use client"
import { api } from "@/data/api";
import { useState } from "react";

const Form = () => {

  const [password,setPassword] = useState("");
  const [oldPass,setOldPass] = useState("");
  const [newPass,setNewPass] = useState("");
  const [confPass,setConfPass] = useState("");

  const userString = localStorage.getItem('user');
  let jw='';
  let user='';
  let id ='';
  let data='';        
          if (userString) {
             user = JSON.parse(userString);
              id = user.user.userId;
              jw = user.jwt;

          } else {
              console.error("User data not found");
          }
       
        let pass=user.user.password;

  const handleClick = async (e) => {
    e.preventDefault();

    if((newPass == confPass) && (oldPass == pass) ){
      setPassword(newPass);
    }

    try {
      
      const apiUrl1 = api + "company/update/" + id;
  
      const response = await fetch(apiUrl1, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
          body: JSON.stringify({ ...user.user,password }),
      });
  
      if (response.ok) {
          data = await response.json();
          console.log(data);
          alert("Password changed successfully");
  
        
      } else {
          console.log("Error fetching data:");
      }
  } catch (error) {
      console.error('Error:', error);
  }

  }

  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Old Password </label>
          <input type="password" name="name"
            value={oldPass}
            onChange={(e) => {setOldPass(e.target.value)}}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>New Password</label>
          <input type="password" name="name"
            value={newPass}
            onChange={(e) => {setNewPass(e.target.value)}}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Confirm Password</label>
          <input type="password" name="name"
            value={confPass}
            onChange={(e) => {setConfPass(e.target.value)}}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" onClick={handleClick} className="theme-btn btn-style-one">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
