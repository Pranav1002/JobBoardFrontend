
"use client"

import Select from "react-select";
import { useEffect, useState } from "react";
import { api } from "@/data/api";

const FormInfoBox = () => {
  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Managemnet", label: "Managemnet" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];

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

  

const [isEditMode, setIsEditMode] = useState(true);


const info = {
    email: '',
    phoneNumber: '',
    name: '',
    title: '',
    currentSalary: '',
    expectedSalary: '',
    experience: '',
    age: '',
    education:'',
    language: '',
    categories: null,
    description: ''
}

const [information, setInformation] = useState(info);

const handleClick = async (e) => {
  e.preventDefault();

  try {
      
      const apiUrl = api + 'jobseeker/update/' + id;

      // console.log(jw);
      
      const name= information.name;
      const jobTitle = information.title;
      const currentSalary = information.currentSalary;
      const expectedSalary = information.expectedSalary;
      const experience = information.experience;
      const age = information.age;
      const educationLevel = information.education;
      const languages = information.language;
      const jobCategory = information.categories.value;
      const description = information.description;
      console.log(information);      

      const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
          body: JSON.stringify({ name,jobTitle, currentSalary, expectedSalary, experience, age, educationLevel,languages, jobCategory, description }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Data saved successfully:', data);
          
              if (typeof window !== 'undefined') {
                  localStorage.setItem('info', JSON.stringify(data));
              }
              localStorage.setItem('info', JSON.stringify(data));
          
          setIsEditMode(false); 

      } else {
          console.error('Data saving failed');
      }
      
  } catch (error) {
      console.error('Error:', error);
  }

}

const handleEditClick =  async (e) => {
  e.preventDefault();
  setIsEditMode(true); // Switch to edit mode
  try{
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      // const id = parsedInfo.jsId;
      const apiUrl1 = api+"jobseeker/get/" + id;
      
      const response = await fetch(apiUrl1, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
         
      });

      if (response.ok) {
          const data = await response.json();
          
          setInformation({
            name: data.name,
            title: data.jobTitle,
            currentSalary: data.currentSalary,
            expectedSalary: data.expectedSalary,
            experience: data.experience,
            age: data.age,
            education: data.educationLevel,
            language: data.languages,
            categories: data.jobCategory,
            description: data.description       
          
          });
          
          

      } else {
         console.log("Error fetching data:")
      }

  }
  catch(error){
      console.error('Error:', error);
  }
  
};

const handleChange = (e) => {
    
  setInformation({
      ...information,
      [e.target.name]: e.target.value,
  })
}

const handleChange2 = (selectedOption) => {
  setInformation({
    ...information,
    categories: selectedOption || null
  });
};

useEffect(() => {
  const getData = async () => {
      try{
        const user = JSON.parse(userString);
        const id = user.jsId;
          const apiUrl1 = api+"jobseeker/get/" + id;
          
          const response = await fetch(apiUrl1, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jw}`,
              },
             
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data);
              
              setInformation({
                name: data.name,
                title: data.jobTitle,
                currentSalary: data.currentSalary,
                expectedSalary: data.expectedSalary,
                experience: data.experience,
                age: data.age,
                education: data.educationLevel,
                language: data.languages,
                categories: data.jobCategory,
                description: data.description       
              
              });
              

          } else {
             console.log("Error fetching data:")
          }

      }
      
      catch(error){
          console.error('Error:', error);
      }
  }
  
  getData();
  setIsEditMode(false);
},[]);


  return (
    <form className="default-form">
      <div className="row">
        
        <div className="form-group col-lg-6 col-md-12">
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Jerome"
            value={information.name}
            onChange={handleChange}
            disabled={!isEditMode}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <input type="text" name="title" placeholder="UI Designer"
          value={information.title}
          onChange={handleChange}
          disabled={!isEditMode}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Phone</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="0 123 456 7890"
            value={information.phoneNumber}
            onChange={handleChange}
            disabled={!isEditMode}
            required
          />
        </div>
        

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Email address</label>
          <input
            type="text"
            name="email"
            placeholder="creativelayers"
            value={information.email}
            onChange={handleChange}
            disabled={!isEditMode}
            required
          />
        </div>

        

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Current Salary($)</label>
          <input
            type="number"
            name="currentSalary"
            placeholder="50"
            value={information.currentSalary}
            onChange={handleChange}
            disabled={!isEditMode}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-3 col-md-12">
          <label>Expected Salary($)</label>
          <input
            type="number"
            name="expectedSalary"
            placeholder="60"
            value={information.expectedSalary}
            onChange={handleChange}
            disabled={!isEditMode}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience</label>
          <input type="number" name="experience" placeholder="5"
          value={information.experience}
          onChange={handleChange}
          disabled={!isEditMode}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Age</label>
          <input type="number" defaultValue={20} min={18} name="age" placeholder="20"
          value={information.age}
          onChange={handleChange}
          disabled={!isEditMode}
          required />
  
          
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Education Levels</label>
          <input type="text" name="education" placeholder="Certificate"
          value={information.education}
          onChange={handleChange}
          disabled={!isEditMode}
          required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages</label>
          <input
            type="text"
            name="language"
            placeholder="English, Turkish"
            value={information.language}
            onChange={handleChange}
            disabled={!isEditMode}
            required
          />
        </div>

        {/* <!-- Search Select --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Categories </label>
          <Select
            defaultValue={[catOptions[1]]}
            options={catOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={information.categories}
            onChange={handleChange2}
            disabled={!isEditMode}
            required
          />
        </div>
        

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
          name="description"
          value={information.description}
          onChange={handleChange}
          disabled={!isEditMode}
          ></textarea>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
                    {isEditMode ? (
                        <button className="theme-btn btn-style-one" onClick={handleClick}>
                            Save
                        </button>
                    ) : (
                        <button className="btn btn-outline-primary btn-lg" onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
