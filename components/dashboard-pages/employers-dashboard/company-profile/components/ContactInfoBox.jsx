"use client"

import React, { useState } from "react";
import { Country, City } from "country-state-city";

const ContactInfoBox = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);

    const handleCountryChange = (event) => {
        const countryValue = event.target.value;
        setSelectedCountry(countryValue);

        console.error = () => {};
        console.warn = () => {};

        // Get cities based on the selected country
        const countryCities = City.getCitiesOfCountry(countryValue);
        setCities(countryCities);
    };

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
                    <select className="chosen-single form-select" required>
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
                    />
                </div>

                {/* Save Button */}
                <div className="form-group col-lg-12 col-md-12">
                    <button type="submit" className="theme-btn btn-style-one">
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactInfoBox;
