"use client"

import { api } from "@/data/api";
import { useEffect, useState } from "react";

const JobOverView = ({id}) => {

  console.log("Id",id)

  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const [jobData, setJobData] = useState({
    deadline: "",
    country: "",
    jobTitle: "",
    salary: ""
  });

  useEffect(() => {

    const getData = async () => {
      try {
        const info1 = localStorage.getItem('info');
        const parsedInfo = JSON.parse(info1);
        // const id = parsedInfo.companyId;
        const user = JSON.parse(userString);
        let apiUrl1 = ''
        if(user.user.authorities[0].roleId === 2)
        {
          apiUrl1 = api + "jobseeker/job/" + id;
        }else{
         apiUrl1 = api + "company/job/" + id;
        }
  
        const response = await fetch(apiUrl1, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jw}`,
            },
        });
  
        if (response.ok) {
            const responseData = await response.json();
            const {jobTitle, country, salary, deadline} = responseData;
            setJobData({jobTitle,country,salary,deadline});
        } else {
            console.log("Error fetching data:");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    getData();
  },[]);

  useEffect(() => {
    // console.log(jobData);
  }, [jobData]);

  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>{jobData.deadline}</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{jobData.country}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{jobData.jobTitle}</span>
        </li>
        <li>
          <i className="icon icon-clock"></i>
          <h5>Hours:</h5>
          <span>50h / week</span>
        </li>
        <li>
          <i className="icon icon-rate"></i>
          <h5>Rate:</h5>
          <span>$15 - $25 / hour</span>
        </li>
        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>{jobData.salary}</span>
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;
