"use client"

import { api } from "@/data/api";
import { useState } from "react";

const LogoCoverUploader = () => {
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

    const [showToast,setShowToast] = useState(false)

    // Function to handle file upload
    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        for (const entry of formData.entries()) {
            console.log(entry);
        }

        try {
            const apiUrl = api+ `company/image/upload/${id}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jw}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log("File uploaded successfully!");
                setShowToast(true)
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
    Data Saved Successfully.
  </div>
</div>
        </>
    );
};

export default LogoCoverUploader;
