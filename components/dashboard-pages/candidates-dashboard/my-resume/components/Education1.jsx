"use client"

import { api } from "@/data/api";

import { useEffect, useState } from "react";
import EducationFormModal from "./EducationModelForm";
import Wrapper from "@/layout/Wrapper";

const Education = ({id}) => {

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
      const id1 = parsedInfo.jsId;   
      const apiUrl1 = api + "company/get/jsEducation/" + id;

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


console.log("Data:",data)
 


  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
      </div>
      

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
