"use client"

import FooterDefault from "../../footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader2 from "../../header/DefaulHeader2";
import MobileMenu from "../../header/MobileMenu";
import Breadcrumb from "../../common/Breadcrumb";
import FilterSidebar from "./FilterSidebar";
import FilterJobBox from "./FilterJobBox";
import CallToAction from "../../call-to-action/CallToAction";
import DefaulHeader from "@/components/header/DefaulHeader";
import DefaulHeader1 from "@/components/header/HeaderNavContent1";
import { use } from "react";
// import Hero3 from ".../hero/hero-3";

const index = () => {

  const user = localStorage.getItem('user');
  // const user = 'Hello'

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      {user && <DefaulHeader1/>}
      {!user && <DefaulHeader/>}
      {/* End Header with upload cv btn */}

      {/* <Hero3/>       */}
      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="Find Jobs" meta="Jobs" />
      {/* <!--End Breadcrumb Start--> */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row mb-5">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar />
              </div>
            </div>
            {/* <!-- End Filters Column --> */}

            <div className="content-column col-lg-12">
              <FilterJobBox />
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}

          <CallToAction />
          {/* End calltoAction */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
