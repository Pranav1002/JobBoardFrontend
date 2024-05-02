"use client"

import { api } from "@/data/api";

import { useEffect, useState } from "react";
import EducationFormModal from "./EducationModelForm";
import Wrapper from "@/layout/Wrapper";

const Education = () => {

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShow = () => {
    setIsModalOpen(!isModalOpen); // Open the modal when the button is clicked
  }

  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const getJobs = async () => {
    try {
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      const id = parsedInfo.jsId;   
      const apiUrl1 = api + "jobseeker/education/get/" +id;

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
      const id1 = parsedInfo.jsId;
      const apiUrl1 = api + "jobseeker/education/delete/edu/" + id1;

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

console.log("Data:",data)
 


  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
        <button className="add-info-btn" onClick={(e) => {handleShow()}}>
          <span className="icon flaticon-plus"></span> Add Education
        </button>
      </div>
      
      {isModalOpen && (
        <Wrapper>
          <EducationFormModal />
        </Wrapper>
      )}

      {data.map((education, index) => (
        <div className="resume-block" key={index}>
          <div className="inner">
            <span className="name">{education.course}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{education.course}</h3>
                <span>{education.organization}</span>
              </div>
              <div className="edit-box">
                <span className="year">{education.startYear} - {education.endYear}</span>
                <div className="edit-btns">
                  <button>
                    <span className="la la-pencil"></span>
                  </button>
                  <button onClick={(e) => {handleClick1(e,education.eduId)}}>
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

export default Education;
