
"use client"

import Select from "react-select";
import { useEffect, useState } from "react";
import { api } from "@/data/api";

const EducationFormModal = () => {

  let jw='';
  let id=0;

  const userString = localStorage.getItem('user');
    // console.log(userString);  
  if (userString) {
      const user = JSON.parse(userString);
      id = user.user.userId;
      jw = user.jwt;

  } else {
      console.error("User data not found");
  }

const info = {
    course: '',
    startYear: '',
    endYear: '',
    organization: '',
    description: ''
}

const [information, setInformation] = useState(info);

const handleClick = async (e) => {
  e.preventDefault();

  try {

    const info1 = localStorage.getItem('info');
    const parsedInfo = JSON.parse(info1);
    const id = parsedInfo.jsId;   
      
      const apiUrl = api + 'jobseeker/education/add/' + id;

      const course = information.course;
      const startYear = information.startYear;
      const endYear = information.endYear;
      const organization = information.organization;
      const description = information.description;

      const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
          body: JSON.stringify({ course, startYear, endYear, organization, description }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Data saved successfully:', data);
          window.href.location = '/candidates-dashboard/my-resume'

      } else {
          console.error('Data saving failed');
      }
      
  } catch (error) {
      console.error('Error:', error);
  }

}


const handleChange = (e) => {
    
  setInformation({
      ...information,
      [e.target.name]: e.target.value,
  })
}




  return (
    <form className="default-form">
      <div className="row">
        
        <div className="form-group col-lg-6 col-md-12">
          <label>Course Name</label>
          <input type="text" name="course" placeholder="BTech"
            value={information.course}
            onChange={handleChange}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Start Year</label>
          <input type="text" name="startYear" placeholder="2020"
          value={information.startYear}
          onChange={handleChange}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>End Year</label>
          <input type="text" name="endYear" placeholder="2024"
          value={information.endYear}
          onChange={handleChange}
          required />
        </div>
        

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            placeholder="University"
            value={information.organization}
            onChange={handleChange}
            required
          />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea placeholder="Description about Course"
          name="description"
          value={information.description}
          onChange={handleChange}
          ></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
        <button className="theme-btn btn-style-one" onClick={handleClick}>
                            Save
                        </button>
                </div>
      </div>
    </form>
  );
};

export default EducationFormModal;
