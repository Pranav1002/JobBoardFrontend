
"use client"

import Select from "react-select";
import { useEffect, useState } from "react";
import { api } from "@/data/api";

const ResumeDetails = () => {
 
  let jw='';

  const userString = localStorage.getItem('user');

  if (userString) {
      const user = JSON.parse(userString);
      jw = user.jwt;

  } else {
      console.error("User data not found");
  }

  const head = {
        name: '',
        address: "",
        emailAddress: "",
        phoneNumber: "",
        github: "",
        linkedin: "",
        website: ""
  }

  const edu = [
    {
      name: "",
      degree: "",
      majors: "",
      period: "",
      location: "",
      gpa: ""
    }
  ]

  const exp = [
    {
      company: "",
      jobrole: "",
      period: "",
      location: "",
      responsibilites: []

    }
  ]

  const skill = {
    ProgrammingLanguages: "",
    Frameworks: "",
    Databases: "",
    Tools: ""
  }

  const project = [
  {
    name: "",
    description: "",
    technology: ""
  }
]

  const [header,setHeader] = useState(head)
  const [education,setEducation] = useState(edu)
  const [experience,setExperience] = useState(exp)
  const [skills,setSkills] = useState(skill)
  const [projects,setProjects] = useState(project)
  
  const handleHeader = (e) => {
    
    setHeader({
        ...header,
        [e.target.name]: e.target.value,
    })
  }

  const handleEducation = (index, e) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
        ...updatedEducation[index],
        [e.target.name]: e.target.value,
    };
    setEducation(updatedEducation);
}

const handleExperience = (index, e) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
        ...updatedExperience[index],
        [e.target.name]: e.target.value,
    };
    setExperience(updatedExperience);
}

const handleSkills = (e) => {
    setSkills({
        ...skills,
        [e.target.name]: e.target.value,
    });
}

const handleProjects = (index, e) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
        ...updatedProjects[index],
        [e.target.name]: e.target.value,
    };
    setProjects(updatedProjects);
}


const handleClick = async (e) => {
  e.preventDefault();

  try {
      
      const apiUrl = api + 'jobseeker/resume';

      console.log(header);
      console.log(education);
      console.log(experience);
      console.log(skills);
      console.log(projects);
      
      
      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
          body: JSON.stringify({ header,education,experience, skills, projects }),
      });

      if (response.ok) {
        console.log(response.url)
          const data = await response.text();
          window.open(data, '_blank');
          // console.log('Data saved successfully:', data);
      } else {
          console.error('Data saving failed');
      }
      
  } catch (error) {
      console.error('Error:', error);
  }

}

  return (
    <form className="default-form">
  <div className="row">
    <h2>Header Information</h2>
    <br/><br/>
    <div className="form-group col-lg-6 col-md-12">
      <label>Full Name</label>
      <input type="text" name="name" placeholder="Pratik Prajapati"
        value={header.name}
        onChange={handleHeader}
        required />

      <label>Address</label>
      <input type="text" name="address" placeholder="123 Main St, Anytown, USA"
        value={header.address}
        onChange={handleHeader}
        required />

      <label>Email Address</label>
      <input type="text" name="emailAddress" placeholder="john.doe@example.com"
        value={header.emailAddress}
        onChange={handleHeader}
        required />

      <label>Phone Number</label>
      <input type="text" name="phoneNumber" placeholder="123-456-7890"
        value={header.phoneNumber}
        onChange={handleHeader}
        required />

      <label>GitHub Link</label>
      <input type="text" name="github" placeholder="https://github.com/pratik"
        value={header.github}
        onChange={handleHeader}
        required />

      <label>LinkedIn Link</label>
      <input type="text" name="linkedin" placeholder="https://www.linkedin.com/in/pratik"
        value={header.linkedin}
        onChange={handleHeader}
        required />

      <label>Your Website Link</label>
      <input type="text" name="website" placeholder="https://www.pratik.com"
        value={header.website}
        onChange={handleHeader}
        required />
    </div>
    <br/><br/>

    <h1>Education Information</h1>
    <br/><br/>
    {education.map((eduItem, index) => (
      <div key={index} className="form-group col-lg-6 col-md-12">
        <label>Name of University</label>
        <input type="text" name="name" placeholder="University of Example"
          value={eduItem.name}
          onChange={(e) => handleEducation(index, e)}
          required />

        <label>Degree</label>
        <input type="text" name="degree" placeholder="Bachelor of Science"
          value={eduItem.degree}
          onChange={(e) => handleEducation(index, e)}
          required />

        <label>Majors</label>
        <input type="text" name="majors" placeholder="Computer Science"
          value={eduItem.majors}
          onChange={(e) => handleEducation(index, e)}
          required />

        <label>Period</label>
        <input type="text" name="period" placeholder="2016 - 2020"
          value={eduItem.period}
          onChange={(e) => handleEducation(index, e)}
          required />

        <label>Location</label>
        <input type="text" name="location" placeholder="Anytown, USA"
          value={eduItem.location}
          onChange={(e) => handleEducation(index, e)}
          required />

        <label>GPA</label>
        <input type="text" name="gpa" placeholder="3.7"
          value={eduItem.gpa}
          onChange={(e) => handleEducation(index, e)}
          required />
      </div>
    ))}
    <br/><br/>
    
    <h1>Experience Information</h1>
    <br/><br/>
    {experience.map((expItem, index) => (
      <div key={index} className="form-group col-lg-6 col-md-12">
        <label>Company</label>
        <input type="text" name="company" placeholder="Tech Company XYZ"
          value={expItem.company}
          onChange={(e) => handleExperience(index, e)}
          required />

        <label>Job Role</label>
        <input type="text" name="jobrole" placeholder="Software Engineer"
          value={expItem.jobrole}
          onChange={(e) => handleExperience(index, e)}
          required />

        <label>Period of Service</label>
        <input type="text" name="period" placeholder="2020 - Present"
          value={expItem.period}
          onChange={(e) => handleExperience(index, e)}
          required />

        <label>Location</label>
        <input type="text" name="location" placeholder="Anytown, USA"
          value={expItem.location}
          onChange={(e) => handleExperience(index, e)}
          required />

        <label>Responsibilities</label>
<textarea
  name="responsibilities"
  placeholder="Enter responsibilities"
  value={expItem.responsibilities ? expItem.responsibilities.map((item, i) => `${item}${i !== expItem.responsibilities.length - 1 ? '\n' : ''}`) : ''}
  onChange={(e) => {
    const updatedResponsibilities = e.target.value.split("\n");
    handleExperience(index, { ...e, target: { ...e.target, name: "responsibilities", value: updatedResponsibilities } });
  }}
></textarea>



      </div>
    ))}
    <br/><br/>
    
    <h1>Skills</h1>
    <br/><br/>
    <div className="form-group col-lg-6 col-md-12">
      <label>Programming Languages</label>
      <input type="text" name="ProgrammingLanguages" placeholder="JavaScript, Python"
        value={skills.ProgrammingLanguages}
        onChange={handleSkills}
        required />

      <label>Frameworks</label>
      <input type="text" name="Frameworks" placeholder="Spring, React"
        value={skills.Frameworks}
        onChange={handleSkills}
        required />

      <label>Databases</label>
      <input type="text" name="Databases" placeholder="MySQL, MongoDB"
        value={skills.Databases}
        onChange={handleSkills}
        required />

      <label>Tools</label>
      <input type="text" name="Tools" placeholder="Git, Docker"
        value={skills.Tools}
        onChange={handleSkills}
        required />
      
    </div>
    <br/><br/>
    
    <h1>Project Details</h1>
    <br/><br/>
    {projects.map((projectItem, index) => (
      <div key={index} className="form-group col-lg-6 col-md-12">
        <label>Project Name</label>
        <input type="text" name="name" placeholder="Project X"
          value={projectItem.name}
          onChange={(e) => handleProjects(index, e)}
          required />
        

        <label>Description</label>
        <input type="text" name="description" placeholder="Built a full-stack e-commerce website using React for the frontend and Node.js with Express for the backend"
          value={projectItem.description}
          onChange={(e) => handleProjects(index, e)}
          required />

        <label>Technology Used</label>
        <input type="text" name="technology" placeholder="eact, Node.js, Express, MongoDB"
          value={projectItem.technology}
          onChange={(e) => handleProjects(index, e)}
          required />
      </div>
    ))}
    <br/><br/>
  </div>
  <div className="form-group col-lg-6 col-md-12">
      <label></label>
      <button className="theme-btn btn-style-one" onClick={handleClick}>
        Save
      </button>
    </div>
</form>

  );
};

export default ResumeDetails;
