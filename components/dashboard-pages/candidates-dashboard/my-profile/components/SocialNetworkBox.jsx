"use client"

import { api } from "@/data/api";
import { useEffect, useState } from "react";

const SocialNetworkBox = () => {
  let jw ='';
  let id=0;

  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
    id=user.user.userId;

  } else {
    console.error("User data not found");
  }

  const social = {
    twitter: '',
    linkedIn: ''
  }
  const [twitter1, setTwitter] = useState('');
  const [linkedIn1, setLinkedIn] = useState('');
  const [isEditMode, setIsEditMode] = useState(true);
  const [jobSeekerSocialNetwork,setJobSeekerSocialNetwork] = useState(social);





  const handleClick = async (e) => {
    e.preventDefault();
    console.log(twitter1);
    try {
      const info1 = localStorage.getItem('info');
            const parsedInfo = JSON.parse(info1);
            
      const apiUrl = api + 'jobseeker/update/' + id;
      console.log(apiUrl);
      setJobSeekerSocialNetwork({
        twitter: twitter1,
        linkedIn: linkedIn1
      })
      

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jw}`,
        },
        
        body: JSON.stringify({ jobSeekerSocialNetwork }),
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log('Data saved successfully:', data);

        setIsEditMode(false);
      } else {
        console.error('Data saving failed');
      }
    }
    catch (error) {
      console.log('Error: ', error)
    }
  }

  const handleEditClick = async (e) => {
    e.preventDefault();
    setIsEditMode(true);
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
            // console.log(data);
            setTwitter(data.jobSeekerSocialNetwork.twitter);
            setLinkedIn(data.jobSeekerSocialNetwork.LinkedIn);

        } else {
           console.log("Error fetching data:")
        }

    }
    catch(error){
        console.error('Error:', error);
    }
  }

  useEffect(() => {
    const getData = async () => {
        try {
            const info1 = localStorage.getItem('info');
            const parsedInfo = JSON.parse(info1);
            // const id = parsedInfo.jsId;
            const apiUrl1 = api + "jobseeker/get/" + id;

            const response = await fetch(apiUrl1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jw}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data);

                setTwitter(data.jobSeekerSocialNetwork.twitter);
                setLinkedIn(data.jobSeekerSocialNetwork.linkedIn);
            } else {
                console.log("Error fetching data:");
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    getData();
    setIsEditMode(false);
}, [jw]);

  return (
    <form className="default-form">
      <div className="row">

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input type="text" value={twitter1} onChange={(e) => setTwitter(e.target.value)} disabled={!isEditMode} name="name" placeholder="" required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input type="text" name="name" value={linkedIn1} onChange={(e) => setLinkedIn(e.target.value)} disabled={!isEditMode} placeholder="" required />
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

export default SocialNetworkBox;
