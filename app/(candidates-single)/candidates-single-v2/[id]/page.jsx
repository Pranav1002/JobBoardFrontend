"use client"

import dynamic from "next/dynamic";
import candidates from "@/data/candidates";
import candidateResume from "@/data/candidateResume";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Contact from "@/components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import AboutVideo from "@/components/candidates-single-pages/shared-components/AboutVideo";
import Image from "next/legacy/image";
import DefaulHeader1 from "@/components/header/HeaderNavContent1";
import DefaulHeader4 from "@/components/header/DefaultHeader4";
import { useEffect, useState } from "react";
import { api } from "@/data/api";
import Education from "@/components/dashboard-pages/candidates-dashboard/my-resume/components/Education";
import Experience from "@/components/candidates-listing-pages/components/Experience";
import Experiences from "@/components/dashboard-pages/candidates-dashboard/my-resume/components/Experiences";



const CandidateSingleDynamicV2 = ({ params }) => {
  const id = params.id;
  const candidate = candidates.find((item) => item.id == id) || candidate[0];

  const user1 = localStorage.getItem('user');
  const user = JSON.parse(user1);

  const jw=user.jwt;

  
  const [jobData,setJobData] = useState({})

  const id1=user.user.userId;
  
  useEffect(() => {

    const getData = async () => {
      try {
        const info1 = localStorage.getItem('info');
        const parsedInfo = JSON.parse(info1);
        // const id = parsedInfo.companyId;
        const user = JSON.parse(user1);
        let apiUrl1 = ''
        if(user.user.authorities[0].roleId === 2)
        {
          apiUrl1 = api + "jobseeker/get/" + id1;
        }else{
         apiUrl1 = api + "company/get/jobseeker/" + id;
        }
  
        const response = await fetch(apiUrl1, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jw}`,
            },
        });
  
        if (response.ok) {
            const responseData = await response.json();
            // console.log(responseData)
            setJobData(responseData);
        } else {
            console.log("Error fetching data:");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    getData();
  },[]);

  useEffect(() => {
    console.log(jobData);
  }, [jobData]);

  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true)
  }

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      {user.user.authorities[0].roleId === 2 && <DefaulHeader1/>}
      {user.user.authorities[0].roleId === 3 && <DefaulHeader4/>}
      {!user && <DefaulHeader/>}
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section">
        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="candidate-block-five">
                  <div className="inner-box">
                    <div className="content">
                      <figure className="image">
                        <Image
                          width={100}
                          height={100}
                          src={candidate?.avatar}
                          // src={jobData.image.filePath}
                          alt="avatar"
                        />
                      </figure>
                      <h4 className="name">{jobData.name}</h4>

                      <ul className="candidate-info">
                        <li className="designation">
                          {jobData.jobTitle}
                        </li>
                        <li>
                          <span className="icon flaticon-map-locator"></span>
                          {!jobData.country && "Australia"}
                          {jobData.country}
                        </li>
                        <li>
                          <span className="icon flaticon-money"></span> $
                          {candidate?.hourlyRate} / hour
                        </li>
                        <li>
                          <span className="icon flaticon-clock"></span> Member
                          Since,Aug 19, 2020
                        </li>
                      </ul>

                      <ul className="post-tags">
                        {candidate?.tags?.map((val, i) => (
                          <li key={i}>{val}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/*  <!-- Candidate block Five --> */}

                <div className="job-detail">
                 {jobData.description}

                  

                  {/* <!-- Candidate Resume Start --> */}
                  <form className="default-form">
      <div className="row">
        
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12">
          <Education />
          {/* <!-- Resume / Education --> */}

          <Experiences />
        </div>

      </div>
      {/* End .row */}
    </form>
                  {/* <!-- Candidate Resume End --> */}

                  {/* <div className="portfolio-outer">
                    <div className="row">
                      <GalleryBox />
                    </div>
                  </div> */}
                  {/* <!-- Portfolio --> */}
                </div>
                {/* End job-details */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="btn-box">
                    <a
                      className="theme-btn btn-style-one"
                      href="/images/sample.pdf"
                      download
                    >
                      Download CV
                    </a>
                    <button className="bookmark-btn" onClick={handleClick}>
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>

                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>{jobData.experience} Years</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{jobData.age} Years</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>{jobData.currentSalary}</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>{jobData.expectedSalary}</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>{jobData.gender}
                          {!jobData.gender && "Male"}
                          
                          </span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>{jobData.languages}</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{jobData.educationLevel}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}

      <div
  className={`toast position-fixed bottom-0 end-0 m-3 ${showToast ? 'show' : ''}`}
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
    Candidate Shortlisted Successfully.
  </div>
</div>

    </>
  );
};

export default dynamic(() => Promise.resolve(CandidateSingleDynamicV2), {
  ssr: false,
});
