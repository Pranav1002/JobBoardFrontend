"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "@/data/api";


const JobListingsTable = () => {
  const [data, setData] = useState([]);
  

  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const getJobs = async () => {
    try {
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      const id = parsedInfo.companyId;
      const apiUrl1 = api + "company/get/jobs/" + id;

      const response = await fetch(apiUrl1, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
      });

      if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
      } else {
          console.log("Error fetching data:");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getJobs();
  },[])

  const handleClick = (e,id) => {
    e.preventDefault();
    window.location.href = `/job-single-v1/${id}`;

  }
  
  const handleClick1 = async (e,id) => {
    // e.preventDefault();
    try {
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      const id1 = parsedInfo.companyId;
      const apiUrl1 = api + "company/delete/job/" + id + "/" + id1;

      const response = await fetch(apiUrl1, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jw}`,
          },
      });

      if (response.ok) {
          const responseData = await response.json();
          
      } else {
          console.log("Error fetching data:");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const getImage = (name) => {
    
      
      const filename = name.split('\\').pop();
      // console.log(filename);
  
      return filename;
    
  }
  let path ='';

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>

        
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                console.log(item),
                path = getImage(item.company.image.filePath),
                console.log(path),
                <tr key={item.jobId}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            
                            <Image
                              width={50}
                              height={49}
                              // src={'/' + path}
                              // src="/images/clients/1-2.png"
                              src={item.company.image.filePath}
                              
                              alt="logo"
                             
                            />
                          </span>
                          <h4>
                            <Link href={`/job-single-v3/${item.companyId}`}>
                              {item.jobTitle}
                            </Link>
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              Segment
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              London, UK
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="status">Active</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button data-text="View Job" onClick={(e) => handleClick(e,item.jobId)}>
                            <span className="la la-eye"></span>
                          </button>
                        </li>
                        <li>
                          <button data-text="Edit Job">
                            <span className="la la-pencil"></span>
                          </button>
                        </li>
                        <li>
                          <button data-text="Delete Job" onClick={(e) => handleClick1(e,item.jobId)}>
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
