"use client"
import { api } from "@/data/api";
import { useState } from "react";

const Form = () => {

  const [password,setPassword] = useState("");
  const [oldPass,setOldPass] = useState("");
  const [newPass,setNewPass] = useState("");
  const [confPass,setConfPass] = useState("");

  const [showToast,setShowToast] = useState(false)

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
      
      const apiUrl1 = api + "jobseeker/change-password/" + id;
  
      const response = await fetch(apiUrl1, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
          body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass, confirmPassword: confPass}),
      });
  
      if (response.ok) {
          data = await response.json();
          console.log(data);
          setShowToast(true)
  
        
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

      <div
  className={`toast position-fixed bottom-0 end-0 m-3 ${ showToast ? 'show' : ''}`}
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  style={{ backgroundColor: '#d6e9f7' }} // Set background color to light blue
>
  <div className="toast-header" style={{ backgroundColor: '#d6e9f7' }}> {/* Set header background color to a lighter shade of blue */}
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
  </svg>

    <strong className="me-auto">Notification</strong>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="toast"
      aria-label="Close"
      onClick={() => setShowToast(false)}
    ></button>
  </div>
  <div className="toast-body">
    Password Updated Successfully.
  </div>
</div>

    </form>
  );
};

export default Form;
