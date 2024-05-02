"use client"

import { api } from "@/data/api";
import Link from "next/link";
import { useState } from "react";

const ApplyJobModalContent = ({id,jwt}) => {

  const user1 = localStorage.getItem('user');
  const user = JSON.parse(user1);
  const jw=user.jwt;

  const [showToast,setShowToast] = useState(false)
  const id1 = id;
  console.log(id);
  const handleApply = async (e) => {
    e.preventDefault();
    const info1 = localStorage.getItem('info');
    const parsedInfo = JSON.parse(info1);
    const id1 = parsedInfo.jsId;
    setShowToast(true);
    
    try {
      const apiUrl = api + `jobseeker/${id1}/apply/job/${id}`;
      
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${jw}`,
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log("Applied for job successfully");
          
      } else {
          throw new Error('Applied Failed');
      }
  } catch (error) {
      console.error("Error applying:", error);
  }
  }

  return (
    <form className="default-form job-apply-form">
      <div className="row">
        

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="input-group checkboxes square">
            <input type="checkbox" name="remember-me" id="rememberMe" />
            <label htmlFor="rememberMe" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <span data-bs-dismiss="modal">
                <Link href="/terms">
                  Terms and Conditions and Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one w-100"
            type="submit"
            name="submit-form"
            onClick={handleApply}
          >
            Apply Job
          </button>
        </div>
        {/* End .col */}
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
    Successfully Applied for Job.
  </div>
</div>
    </form>
  );
};

export default ApplyJobModalContent;
