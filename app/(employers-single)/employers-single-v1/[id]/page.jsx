"use client"

import dynamic from "next/dynamic";
import employersInfo from "@/data/topCompany";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import JobDetailsDescriptions from "@/components/employer-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
import Social from "@/components/employer-single-pages/social/Social";
import Image from "next/legacy/image";
import DefaulHeader1 from "@/components/header/HeaderNavContent1";
import DefaulHeader4 from "@/components/header/DefaultHeader4";
import { useEffect, useState } from "react";
import { api } from "@/data/api";



const EmployersSingleV1 = ({ params }) => {
  const id = params.id;
  const user1 = localStorage.getItem('user');
  const user = JSON.parse(user1);

  const jw=user.jwt;

  
  const [jobData,setJobData] = useState({
    jobTitle: '',
    country: '',
    salary:'',
    company:'',
    image: '',
    phoneNumber: ''
  })

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
          apiUrl1 = api + "jobseeker/job/" + id;
        }else{
         apiUrl1 = api + "company/get/" + id;
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
            console.log(responseData)
            const {jobTitle,country, salary, phoneNumber} = responseData;
            const company = responseData.company.name;
            const image = responseData.company.image.filePath;
            setJobData({jobTitle,country,salary, company,image, phoneNumber});
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


  const employer =
    employersInfo.find((item) => item.id == id) || employersInfo[0];

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
      <section className="job-detail-section">
        {/* <!-- Upper Box --> */}
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Image
                      width={100}
                      height={100}
                      src={employer?.img}
                      alt="logo"
                    />
                  </span>
                  <h4>{jobData.name}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {jobData.country}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {employer?.jobType}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-telephone-1"></span>
                      {jobData.phoneNumber}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {employer?.email}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    <li className="time">Open Jobs – {employer.jobNumber}</li>
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                <div className="btn-box">
                  
                  <button className="bookmark-btn" onClick={handleClick}>
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div>
                {/* End btn-box */}

                {/* <!-- Modal --> */}
                
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        {/* <!-- job-detail-outer--> */}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/*  job-detail */}
                <JobDetailsDescriptions />
                {/* End job-detail */}

                {/* <!-- Related Jobs --> */}
                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                    
                  </div>
                  {/* End .title-box */}

                  <RelatedJobs />
                  {/* End RelatedJobs */}
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      {/*  compnay-info */}
                      <ul className="company-info mt-0">
                        <li>
                          Primary industry: <span>Software</span>
                        </li>
                        <li>
                          Company size: <span>501-1,000</span>
                        </li>
                        <li>
                          Founded in: <span>2011</span>
                        </li>
                        <li>
                          Phone: <span>{employer?.phone}</span>
                        </li>
                        <li>
                          Email: <span>{employer?.email}</span>
                        </li>
                        <li>
                          Location: <span>{employer?.location}</span>
                        </li>
                        <li>
                          Social media:
                          <Social />
                        </li>
                      </ul>
                      {/* End compnay-info */}

                      <div className="btn-box">
                        <a
                          href="#"
                          className="theme-btn btn-style-three"
                          style={{ textTransform: "lowercase" }}
                        >
                          www.{employer?.name}.com
                        </a>
                      </div>
                      {/* btn-box */}
                    </div>
                  </div>
                  {/* End company-widget */}

                  
                  {/* End sidebar-widget */}
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
    Company saved successfully.
  </div>
</div>

    </>
  );
  
};

export default dynamic(() => Promise.resolve(EmployersSingleV1), {
  ssr: false,
});
