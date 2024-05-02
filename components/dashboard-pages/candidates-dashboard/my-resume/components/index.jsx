

'use client'

import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";

const index = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="default-form" onClick={handleSubmit}>
      <div className="row">
        
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12">
          <Education />
          {/* <!-- Resume / Education --> */}

          <Experiences />
          {/* <!-- Resume / Work & Experience --> */}
        </div>
        {/* <!--  education and word-experiences --> */}


        
        

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple />
        </div> */}
        {/* <!-- Multi Selectbox --> */}

        {/* <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div> */}
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default index;
