

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
        </div>


      </div>
      {/* End .row */}
    </form>
  );
};

export default index;
