"use client"

import { api } from "@/data/api";
import { useEffect, useState } from "react";
import ExperienceFormModal from "../ExperienceModelForm";
import Wrapper from "@/layout/Wrapper";

const Experiences = () => {

  const [data, setData] = useState([]);

  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShow = () => {
    setIsModalOpen(!isModalOpen); // Open the modal when the button is clicked
  }


  const getJobs = async () => {
    try {
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      const id = parsedInfo.jsId;   
      const apiUrl1 = api + "jobseeker/experience/get/" +id;

      const response = await fetch(apiUrl1, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
      });

      if (response.ok) {
          const responseData = await response.json();
          console.log(responseData)
          setData(responseData);
      } else {
          console.log("Error fetching data:");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getJobs();
  },[])

  const handleClick1 = async (e,id) => {
    // e.preventDefault();
    try {
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      const id1 = parsedInfo.companyId;
      const apiUrl1 = api + "jobseeker/experience/delete/exp/" + id;

      const response = await fetch(apiUrl1, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
      });

      if (response.ok) {
          const responseData = await response.json();
          
      } else {
          console.log("Error fetching data:");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Work Experience</h4>
        <button className="add-info-btn" onClick={handleShow}>
          <span className="icon flaticon-plus"></span> Add Experience
        </button>
      </div>

      {isModalOpen && (
        <Wrapper>
          <ExperienceFormModal/>

        </Wrapper>
      )}
      
      
      {data.map((education, index) => (
        <div className="resume-block" key={index}>
          <div className="inner">
            <span className="name">{education.jobRole}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{education.jobRole}</h3>
                <span>{education.organization}</span>
              </div>
              <div className="edit-box">
                <span className="year">{education.startYear} - {education.endYear}</span>
                <div className="edit-btns">
                  <button>
                    <span className="la la-pencil"></span>
                  </button>
                  <button onClick={(e) => {handleClick1(e,candidate.expId)}}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text">{education.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
