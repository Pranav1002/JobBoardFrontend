
"use client"
import { api } from "@/data/api";
import { useEffect, useState } from "react";


const FormInfoBox = () => {

    const [isEditMode, setIsEditMode] = useState(true);

    const info = {
        email: '',
        phoneNumber: '',
        name: '',
        website: '',
        establish: '',

        description: ''
    }
    let id = 0;
    let jw ='';

    const [information, setInformation] = useState(info);

    const [teamSize, setTeamSize] = useState('');

    const handleChange2 = event => {
        setTeamSize(event.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInformation({
            ...information,
            [name]: value,
        })
    }

    const userString = localStorage.getItem('user');

            if (userString) {
                const user = JSON.parse(userString);
                id = user.user.userId;
                jw = user.jwt;

            } else {
                console.error("User data not found");
            }

    const handleClick = async (e) => {
        e.preventDefault();
        // console.log(information);
        // console.log(teamSize);


        try {
            
            const apiUrl = api + 'company/update/' + id;

            // console.log(apiUrl);

            const email = information.email;
            const phoneNumber = information.phoneNumber;
            const name= information.name;
            const website = information.website;
            const establish = information.establish;
            const description = information.description;          

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jw}`,
                },
                body: JSON.stringify({ email,phoneNumber,name,website,establish,description, teamSize }),
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
            const id = parsedInfo.companyId;
            const apiUrl1 = api+"company/get/" + id;
            
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
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    name: data.name,
                    website: data.website,
                    establish: data.establish,
                    description: data.description
                
                });
                setTeamSize(data.teamSize)
                

            } else {
               console.log("Error fetching data:")
            }

        }
        catch(error){
            console.error('Error:', error);
        }
        
    };

    

    useEffect(() => {
        const getData = async () => {
            try{
                const info1 = localStorage.getItem('info');
                const parsedInfo = JSON.parse(info1);
                const id = parsedInfo.companyId;
                const apiUrl1 = api+"company/get/" + id;
                
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
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        name: data.name,
                        website: data.website,
                        establish: data.establish,
                        description: data.description
                    
                    });
                    setTeamSize(data.teamSize)
                    
    
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
                        disabled={!isEditMode}
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
                        disabled={!isEditMode}
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
                        disabled={!isEditMode}
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
                        disabled={!isEditMode}
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
                        disabled={!isEditMode}
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Team Size</label>
                    <select className="chosen-single form-select" disabled={!isEditMode} value={information.teamSize} onChange={handleChange2} required>
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
                    <textarea name="description" disabled={!isEditMode} value={information.description} onChange={handleChange} placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
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
