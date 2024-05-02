"use client"
import Link from "next/link";
import Image from "next/image";
import { api } from "@/data/api";
import { useEffect, useState } from "react";

const Applicants = () => {
  const userString = localStorage.getItem('user');
  let jw='';
  if (userString) {
    const user = JSON.parse(userString);
    const id = user.user.userId;
    jw = user.jwt;
  } else {
    console.error("User data not found");
  }

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const info1 = localStorage.getItem('info');
      const parsedInfo = JSON.parse(info1);
      const id = parsedInfo.companyId;
      const apiUrl1 = api + "company/get/shortlisted-applicants/1";

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
    getData();
  }, []);

  const handleClick = (e,id) => {
    e.preventDefault();
    window.location.href = `/candidates-single-v2/${id}`
  }


  return (
    <div>
      {data.map((candidate, index) => (
        <div key={index}>
          <div className="candidate-block-three col-lg-6 col-md-12 col-sm-12" key={candidate.jsId}>
            <div className="inner-box">
              <div className="content">
                <figure className="image">
                  {candidate.image ? (
                    <Image
                      width={90}
                      height={90}
                      src={candidate.image}
                      alt="Candidate Image"
                    />
                  ) : (
                    <div>No Image Available</div>
                  )}
                </figure>
                <h4 className="name">
                  <Link href={`/candidates-single-v1/${candidate.jsId}`}>
                    {candidate.name || "Unknown"}
                  </Link>
                </h4>
                <ul className="candidate-info">
                  <li className="designation">{candidate.jobCategory || "No Category"}</li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    {candidate.country || "Unknown"}
                  </li>
                </ul>
              </div>
              <div className="option-box">
                <ul className="option-list">
                  <li>
                    <button data-text="View Aplication" onClick={(e) => handleClick(e,candidate.jsId)}>
                      <span className="la la-eye"></span>
                    </button>
                  </li>
                  <li>
                    <button data-text="Approve Aplication">
                      <span className="la la-check"></span>
                    </button>
                  </li>
                  <li>
                    <button data-text="Reject Aplication">
                      <span className="la la-times-circle"></span>
                    </button>
                  </li>
                  {/* <li>
                    <button data-text="Delete Aplication">
                      <span className="la la-trash"></span>
                    </button>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Applicants;
