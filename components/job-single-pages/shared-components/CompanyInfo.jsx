"use client"

import { api } from "@/data/api";
import Social from "../social/Social";
import { useEffect, useState } from "react";

const CompanyInfo = ({id}) => {

  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const [jobData, setJobData] = useState({
    phoneNumber: "",
    email: "",
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
            const { phoneNumber, email } = responseData;
            setJobData({ phoneNumber, email });
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
  }, [jobData]); // Log jobData whenever it changes

  return (
    <ul className="company-info">
      <li>
        Primary industry: <span>Software</span>
      </li>
      <li>
        Company size: <span>501-1,000</span>
      </li>
      <li>
        Founded in: <span>2011</span>
      </li>
      <li>
        Phone: <span>{jobData.phoneNumber}</span>
      </li>
      <li>
        Email: <span>{jobData.email}</span>
      </li>
      <li>
        Location: <span>Australia</span>
      </li>
      <li>
        Social media:
        <Social />
      </li>
    </ul>
  );
};

export default CompanyInfo;
