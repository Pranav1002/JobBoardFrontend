
'use client'

import Map from "../../../Map";
import Select from "react-select";
import { Country, City } from "country-state-city";
import { api } from "@/data/api";
import { useState } from "react";

const PostBoxForm = () => {

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [industry, setIndustry] = useState("");
  const [qualification, setQualification] = useState("");
  const [deadline, setDeadline] = useState("");
  const [experience, setExperience] = useState(0);

    const [selectedCountry,setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [address, setAddress] = useState("");
    


    const userString = localStorage.getItem('user');
    let jw='';
            if (userString) {
                const user = JSON.parse(userString);
                const id = user.user.userId;
                jw = user.jwt;

            } else {
                console.error("User data not found");
            }
    
            const handleClick = async (e) => {
              e.preventDefault();
              
      
              try {
                const info1 = localStorage.getItem('info');
                const parsedInfo = JSON.parse(info1);
                const id = parsedInfo.companyId;
                  const apiUrl = api + 'company/post/job/' + id;
                  const country = selectedCountry;
                  const city = selectedCity;
                
      
                  const response = await fetch(apiUrl, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${jw}`,
                      },
                      body: JSON.stringify({ jobTitle,jobDescription,jobType,experience,salary,gender,industry,qualification,deadline,city,country }),
                  });
      
                  if (response.ok) {
                      
                    alert("Job saved successfully");
                  } else {
                      console.error('Data saving failed');
                  }
                  
              } catch (error) {
                  console.error('Error:', error);
              }
              
          }

         

    const handleCountryChange = (event) => {
      const countryValue = event.target.value;
      setSelectedCountry(countryValue);

      console.error = () => { };
      console.warn = () => { };

      // Get cities based on the selected country
      const countryCities = City.getCitiesOfCountry(countryValue);
      setCities(countryCities);
  };

  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input type="text" name="name" placeholder="Title"
          value={jobTitle}
          onChange={(e) => {setJobTitle(e.target.value)}}
          required
           />
        </div>

        {/* <!-- About Company --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
            value={jobDescription}
            onChange={(e) => {setJobDescription(e.target.value)}}
            required
           
          ></textarea>
        </div>

        

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select className="chosen-single form-select"
            required
            value={jobType}
            onChange={(e) => {setJobType(e.target.value)}}
            
            onBlur={(e) => e.preventDefault()}
          >
            <option>Select</option>
            <option>Freelancer</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Temporay</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Offered Salary</label>
          <input type="text" name="salary" placeholder="Title"
            value={salary}
            onChange={(e) => {setSalary(e.target.value)}}
            required
          
          />
        </div>

    
        <div className="form-group col-lg-6 col-md-12">
          <label>Experience(in years)</label>
          <input type="number" name="experience" placeholder="Title"
            value={experience}
            onChange={(e) => {setExperience(e.target.value)}}
            required
        
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Gender</label>
          <select className="chosen-single form-select"
            required
            value={gender}
            onChange={(e) => {setGender(e.target.value)}}
        
            onBlur={(e) => e.preventDefault()}
          >
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Any</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Industry</label>
          <select className="chosen-single form-select"
            required
            value={industry}
            onChange={(e) => {setIndustry(e.target.value)}}
          
            onBlur={(e) => e.preventDefault()}
          >
            <option>Select</option>
            <option>Banking</option>
            <option>Digital & Creative</option>
            <option>Retail</option>
            <option>Human Resources</option>
            <option>Management</option>
            <option>Accounting & Finance</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <input type="text" name="qualification" placeholder="Title"
            value={qualification}
            onChange={(e) => {setQualification(e.target.value)}}
            required
        
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Application Deadline Date</label>
          <input type="text" name="name" placeholder="06.04.2020" 
            value={deadline}
            onChange={(e) => {setDeadline(e.target.value)}}
            required
        
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
                        className="chosen-single form-select"
                        required
                        value={selectedCountry}
                        onChange={handleCountryChange}
                     
                        onBlur={(e) => e.preventDefault()}
                    >
                        {Country.getAllCountries().map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select className="chosen-single form-select" onBlur={(e) => e.preventDefault()}  value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                        {cities.map((city) => (
                            <option key={city.name} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
        </div>

      

        

       
        <div className="form-group col-lg-6 col-md-12">
                    
                        <button className="theme-btn btn-style-one" onClick={handleClick}>
                            Save
                        </button>
                  
                </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
