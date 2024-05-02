"use client"

import { api } from "@/data/api";
import { useEffect, useState } from "react";


const JobDetailsDescriptions = ({id}) => {

  
  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const [jobDescription,setJobDescription] = useState("")

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
        // console.log(apiUrl1)
        const response = await fetch(apiUrl1, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jw}`,
            },
        });
  
        if (response.ok) {
            const responseData = await response.json();
            // console.log("Res",responseData);
            const {jobDescription} = responseData;
            setJobDescription(jobDescription)
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
    console.log(jobDescription);
  }, [jobDescription]);

  return (
    <div className="job-detail">
      <h4>Job Description</h4>
      <p>
        {jobDescription}
      </p>
      <h4>Key Responsibilities</h4>
      <ul className="list-style-three">
        <li>
          Be involved in every step of the product design cycle from discovery
          to developer handoff and user acceptance testing.
        </li>
        <li>
          Work with BAs, product managers and tech teams to lead the Product
          Design
        </li>
        <li>
          Maintain quality of the design process and ensure that when designs
          are translated into code they accurately reflect the design
          specifications.
        </li>
        <li>Accurately estimate design tickets during planning sessions.</li>
        <li>
          Contribute to sketching sessions involving non-designersCreate,
          iterate and maintain UI deliverables including sketch files, style
          guides, high fidelity prototypes, micro interaction specifications and
          pattern libraries.
        </li>
        <li>
          Ensure design choices are data led by identifying assumptions to test
          each sprint, and work with the analysts in your team to plan moderated
          usability test sessions.
        </li>
        <li>
          Design pixel perfect responsive UI’s and understand that adopting
          common interface patterns is better for UX than reinventing the wheel
        </li>
        <li>
          Present your work to the wider business at Show & Tell sessions.
        </li>
      </ul>
      <h4>Skill & Experience</h4>
      <ul className="list-style-three">
        <li>
          You have at least 3 years’ experience working as a Product Designer.
        </li>
        <li>You have experience using Sketch and InVision or Framer X</li>
        <li>
          You have some previous experience working in an agile environment –
          Think two-week sprints.
        </li>
        <li>You are familiar using Jira and Confluence in your workflow</li>
      </ul>
    </div>
  );
};

export default JobDetailsDescriptions;
