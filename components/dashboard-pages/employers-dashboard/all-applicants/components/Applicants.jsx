"use client"
import Link from "next/link";
import Image from "next/image";
import { api } from "@/data/api";
import { useEffect, useState } from "react";

const Applicants = () => {
  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    const id = user.user.userId;
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      const id = parsedInfo.companyId;
      const apiUrl1 = api + "company/get/applicants/" + id;

      const response = await fetch(apiUrl1, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
      });

      if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
      } else {
          console.log("Error fetching data:");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  

  const handleClick1 = () => {
    setShowToast(true)  

  }

  const handleReject = (e) => {
    e.preventDefault();
    setShowToast1(true);

  }
  
  const handleAccept = (e) => {
    e.preventDefault();
    setShowToast(true);
  }

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (e,id) => {
    e.preventDefault();
    window.location.href = `/candidates-single-v2/${id}`
  }


  return (
    <div>
      {data.map((candidate, index) => (
        console.log(candidate),
        <div key={index}>
          <div className="candidate-block-three col-lg-6 col-md-12 col-sm-12" key={candidate.jsId}>
            <div className="inner-box">
              <div className="content">
                <figure className="image">
                  {candidate.image ? (
                    <Image
                      width={90}
                      height={90}
                      src={candidate.image.filePath}
                      alt="Candidate Image"
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </figure>
                <h4 className="name">
                  <Link href={`/candidates-single-v2/${candidate.jsId}`}>
                    {candidate.name || "Unknown"}
                  </Link>
                </h4>
                <ul className="candidate-info">
                  <li className="designation">{candidate.jobCategory || "No Category"}</li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {candidate.country || "Unknown"}
                  </li>
                </ul>
              </div>
              <div className="option-box">
                <ul className="option-list">
                  <li>
                    <button data-text="View Aplication">
                      <span className="la la-eye" onClick={(e) => handleClick(e,candidate.jsId)}></span>
                    </button>
                  </li>
                  <li>
                    <button data-text="Approve Aplication" onClick={handleAccept}>
                      <span className="la la-check"></span>
                    </button>
                  </li>
                  <li>
                    <button data-text="Reject Aplication" onClick={handleReject}>
                      <span className="la la-times-circle"></span>
                    </button>
                  </li>
                  {/* <li>
                    <button data-text="Delete Aplication">
                      <span className="la la-trash"></span>
                    </button>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}

<div
  className={`toast position-fixed bottom-0 end-0 m-3 ${showToast ? 'show' : ''}`}
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
    Applicant Rejected.
  </div>
</div>

<div
  className={`toast position-fixed bottom-0 end-0 m-3 ${showToast ? 'show' : ''}`}
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
    Applicant Accepted.
  </div>
</div>

    </div>
  );
};

export default Applicants;
