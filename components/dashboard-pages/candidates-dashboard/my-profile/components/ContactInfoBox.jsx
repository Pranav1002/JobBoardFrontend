"use client"

import React, { useState, useEffect } from "react";
import { Country, City } from "country-state-city";
import { api } from "@/data/api";

const ContactInfoBox = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [address, setAddress] = useState("");
    const [isEditMode, setIsEditMode] = useState(true);

    const [showToast,setShowToast] = useState(false)

    let jw = '';

    const userString = localStorage.getItem('user');

    

    if (userString) {
        const user = JSON.parse(userString);
        jw = user.jwt;

    } else {
        console.error("User data not found");
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

    const handleClick = async (e) => {
        e.preventDefault();

        try {

            const info1 = localStorage.getItem('info');
            const parsedInfo = JSON.parse(info1);
            const id = parsedInfo.jsId;
            const apiUrl = api + 'jobseeker/update/address/' + id;
            const country = selectedCountry;
            const city = selectedCity;
            // console.log(selectedCity);
            // console.log(city);
            // console.log(country);
            // console.log(address);
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jw}`,
                },
                body: JSON.stringify({ ...parsedInfo,country, city}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data saved successfully:', data);

                setIsEditMode(false);
                setShowToast(true);

            } else {
                console.error('Data saving failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEditClick = async (e) => {
        e.preventDefault();
        setIsEditMode(true); // Switch to edit mode
        try {
            const info1 = localStorage.getItem('info');
            const parsedInfo = JSON.parse(info1);
            const id = parsedInfo.jsId;
            const apiUrl1 = api + "jobseeker/get/address" + id;

            const response = await fetch(apiUrl1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jw}`,
                },

            });

            if (response.ok) {
                const data = await response.json();

                setSelectedCity(data.city);
                setSelectedCountry(data.country);
                // setAddress(data.address);

            } else {
                console.log("Error fetching data:")
            }

        }
        catch (error) {
            console.error('Error:', error);
        }

    };

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const info1 = localStorage.getItem('info');
                const parsedInfo = JSON.parse(info1);
                const id = parsedInfo.jsId;
                const apiUrl1 = api + "jobseeker/get/address/" + id;

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

                    setSelectedCity(data.city);
                    setSelectedCountry(data.country);
                    // setAddress(data.address);
                } else {
                    console.log("Error fetching data:");
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getData();
        setIsEditMode(false);
    }, [jw]);

    // If data is still loading, you can render a loading indicator
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <form className="default-form">
            <div className="row">
                {/* Country Selection */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Country</label>
                    <select
                        className="chosen-single form-select"
                        required
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        disabled={!isEditMode}
                        onBlur={(e) => e.preventDefault()}
                    >
                        {Country.getAllCountries().map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Selection */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>City</label>
                    <select className="chosen-single form-select" onBlur={(e) => e.preventDefault()} disabled={!isEditMode} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                        {cities.map((city) => (
                            <option key={city.name} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Complete Address Input */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>Complete Address</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
                        required
                        value={address}
                        disabled={!isEditMode}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Save Button */}
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

            <div
  className={`toast position-fixed bottom-0 end-0 m-3 ${ showToast ? 'show' : ''}`}
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  style={{ backgroundColor: '#d6e9f7' }} // Set background color to light blue
>
  <div className="toast-header" style={{ backgroundColor: '#d6e9f7' }}> {/* Set header background color to a lighter shade of blue */}
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
  </svg>

    <strong className="me-auto">Notification</strong>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="toast"
      aria-label="Close"
      onClick={() => setShowToast(false)}
    ></button>
  </div>
  <div className="toast-body">
    Data saved Successfully.
  </div>
</div>

        </form>
    );
};

export default ContactInfoBox;
