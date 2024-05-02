
'use client'

import { api } from "@/data/api";
import { useState } from "react";

const LogoUpload = () => {
    const [logoImg, setLogoImg] = useState("");
    const [coverImg, setCoverImg] = useState("");
    

    let id = 0;
    let jw ='';

    const userString = localStorage.getItem('user');

    if (userString) {
        const user = JSON.parse(userString);
        id = user.user.userId;
        jw = user.jwt;

    } else {
        console.error("User data not found");
    }

    // Function to handle file upload
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        for (const entry of formData.entries()) {
            console.log(entry);
        }

        try {
            const apiUrl = api + `jobseeker/image/upload/${id}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jw}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.url)
                console.log("File uploaded successfully!");
            } else {
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    // Function to handle logo file upload
    const logoHandler = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        setLogoImg(file);
        handleFileUpload(file);
    };

    // Function to handle cover file upload
    const coverHandler = (e) => {
        const file = e.target.files[0];
        setCoverImg(file);
        handleFileUpload(file);
    };

    return (
        <>
            <div className="uploading-outer">
                {/* Logo Upload */}
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*"
                        id="upload"
                        required
                        onChange={logoHandler}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload"
                    >
                        {logoImg !== "" ? logoImg?.name : " Browse Logo"}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                {/* Cover Upload */}
                {/* Similar structure for cover image upload */}
                <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
                </div>
            </div>
        </>
    );
};

export default LogoUpload;
