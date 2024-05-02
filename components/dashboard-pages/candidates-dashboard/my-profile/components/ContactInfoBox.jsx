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
        </form>
    );
};

export default ContactInfoBox;
