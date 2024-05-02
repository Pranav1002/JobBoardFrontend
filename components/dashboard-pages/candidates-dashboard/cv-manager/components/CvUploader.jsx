
'use client'

import { api } from "@/data/api";
import { useState } from "react";
import ResumeDetails from "./ResumeDetails";
import Wrapper from "@/layout/Wrapper";

// validation chaching
function checkFileTypes(files) {
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.includes(files[i].type)) {
            return false;
        }
    }
    return true;
}


const CvUploader = () => {
    const [getManager, setManager] = useState([]);
    const [getError, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShow = () => {
      setIsModalOpen(!isModalOpen);
    }
  

    const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const [url,setUrl] =useState('')

  const uploadResume = async (file) => {
        const info1 = localStorage.getItem('info');
        const parsedInfo = JSON.parse(info1);
        const id = parsedInfo.jsId;   
        const formData = new FormData();
        formData.append("resume", file);
        for (const entry of formData.entries()) {
            console.log(entry);
        }

        try {
            const apiUrl = api + `jobseeker/resume/upload/${id}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jw}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                // console.log(data.url)
                console.log("File uploaded successfully!");
                setUrl(data.url)
                console.log(url)
            } else {
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
  }


    const cvManagerHandler = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            console.log("Selected file:", file);
    
            if (checkFileTypes([file])) {
                uploadResume(file);
                setError("");
                setManager([file]); // Only storing the selected file, no need for concat
            } else {
                setError("Only accept (.doc, .docx, .pdf) file");
            }
        }
    };

    const showFile = (e) => {
        console.log(url)
        window.open(url, '_blank');
    }

    // delete image
    const deleteHandler = (name) => {
        const deleted = getManager?.filter((file) => file.name !== name);
        setManager(deleted);
    };


    return (
        <>
            {/* Start Upload resule */}
            <div className="uploading-resume">
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept=".doc,.docx,.xml,application/msword,application/pdf, image/*"
                        id="upload"
                        multiple
                        onChange={cvManagerHandler}
                    />
                    <label className="cv-uploadButton" htmlFor="upload">
                        <span className="title">Drop files here to upload</span>
                        <span className="text">
                            To upload file size is (Max 5Mb) and allowed file
                            types are (.doc, .docx, .pdf)
                        </span>
                        <span className="theme-btn btn-style-one">
                            Upload Resume
                        </span>
                        {getError !== "" ? (
                            <p className="ui-danger mb-0">{getError}</p>
                        ) : undefined}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
            </div>
            {/* End upload-resume */}

            {/* Start resume Preview  */}
            <div className="files-outer">
                {getManager?.map((file, i) => (
                    <div key={i} className="file-edit-box">
                        <span className="title">{file.name}</span>
                        <div className="edit-btns">
                        <button onClick={showFile} data-text="View Resume">
                                <span className="la la-eye"></span>
                            </button>
                            <button data-text="Delete Resume" onClick={() => deleteHandler(file.name)}>
                                <span className="la la-trash"></span>
                            </button>
                        </div>
                    </div>
                ))}

                {/* <div className="file-edit-box">
                    <span className="title">Sample CV</span>
                    <div className="edit-btns">
                        <button>
                            <span className="la la-pencil"></span>
                        </button>
                        <button>
                            <span className="la la-trash"></span>
                        </button>
                    </div>
                </div>

                <div className="file-edit-box">
                    <span className="title">Sample CV</span>
                    <div className="edit-btns">
                        <button>
                            <span className="la la-pencil"></span>
                        </button>
                        <button>
                            <span className="la la-trash"></span>
                        </button>
                    </div>
                </div>*/}
            </div>
            {/* End resume Preview  */}

            <div className="form-group col-lg-6 col-md-12">
                <button className="theme-btn btn-style-one" onClick={(e) => {handleShow()}}>
                    Create a Resume
                </button>
            </div>
            <br/><br/>
            {isModalOpen && (
                <Wrapper>
                    <ResumeDetails/>
                </Wrapper>
             )}
        </>
    );
};


export default CvUploader;
