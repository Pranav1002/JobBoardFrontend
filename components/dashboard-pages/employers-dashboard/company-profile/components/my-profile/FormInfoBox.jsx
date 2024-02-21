
'use client'

import { api } from "@/data/api";
import { useState } from "react";
import Select from "react-select";

const FormInfoBox = () => {
  
    const info = {
        email: '',
        phoneNumber: '',
        name: '',
        website: '',
        establish: '',
       
        description: ''
    }
    let id = 0;

    const [information,setInformation] = useState(info);

    const [teamSize,setTeamSize] = useState('');

    const handleChange2 = event => {
        setTeamSize(event.target.value);
      };

    const handleChange = (e) => {
        const {name,value} = e.target;
        setInformation({
            ...information,
            [name]:value,
        })
    }

    

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(information);
        console.log(teamSize);
        
        
        try {
            const userString = localStorage.getItem('user');

        if (userString) {
            const user = JSON.parse(userString);
            id = user.user.userId;
            
        } else {
            console.error("User data not found");
        }
            const apiUrl = api + 'company/update/' + id; 
            
            console.log(apiUrl);
        
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ information,teamSize }),
            });
        
            if (response.ok) {
              const data = await response.json();
              console.log('Data saved successfully:', data);
              if(rem){
              if (typeof window !== 'undefined') {
                localStorage.setItem('info', JSON.stringify(data));
              }
              localStorage.setItem('info', JSON.stringify(data));
            }
              
            
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
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Company name </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Invisionn"
                        value={information.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Email address</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="ib-themes"
                        value={information.email}
                        onChange={handleChange}
                        required
                    />
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
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Website</label>
                    <input
                        type="text"
                        name="website"
                        placeholder="www.invision.com"
                        value={information.website}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Est. Since</label>
                    <input
                        type="text"
                        name="establish"
                        placeholder="06.04.2020"
                        value={information.establish}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Team Size</label>
                    <select className="chosen-single form-select" value={information.teamSize} onChange={handleChange2} required>
                        <option value="50-100">50 - 100</option>
                        <option value="100-150">100 - 150</option>
                        <option value="200-250">200 - 250</option>
                        <option value="300-350">300 - 350</option>
                        <option value="500-1000">500 - 1000</option>
                    </select>
                </div>

                {/* <!-- About Company --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>About Company</label>
                    <textarea name="description" value={information.description} onChange={handleChange} placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <button className="theme-btn btn-style-one" onClick={handleClick}>Save</button>
                </div>
            </div>
        </form>
    );
};

export default FormInfoBox;
