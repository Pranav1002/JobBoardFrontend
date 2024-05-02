

'use client'

import Link from "next/link";
import ListingShowing from "../components/ListingShowing";
import companyData from "../../../data/topCompany";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDestination,
  addFoundationDate,
  addKeyword,
  addLocation,
  addPerPage,
  addSort,
} from "../../../features/filter/employerFilterSlice";
import Image from "next/legacy/image";
import { api } from "@/data/api";
import { useEffect, useState } from "react";

const FilterTopBox = () => {

  const user1 = localStorage.getItem('user');
  const user = JSON.parse(user1);
  const jw=user.jwt;
  // const user = 'Hello'
  const [show,setShow] = useState(true)

  const [jobData,setJobData] = useState([])

  useEffect(() => {

    const getData = async () => {
      try {
        const info1 = localStorage.getItem('info');
        const parsedInfo = JSON.parse(info1);
        // const id = parsedInfo.companyId;
        const user = JSON.parse(user1);
        const apiUrl1 =  api + "jobseeker/get/companies";
        
  
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
            setJobData(responseData)
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

  const {
    keyword,
    location,
    destination,
    category,
    foundationDate,
    sort,
    perPage,
  } = useSelector((state) => state.employerFilter) || {};
  const dispatch = useDispatch();

  // keyword filter
  const keywordFilter = (item) =>
    keyword !== ""
      ? item?.name?.toLowerCase().includes(keyword?.toLowerCase()) && item
      : item;

  // location filter
  const locationFilter = (item) =>
    location !== ""
      ? item?.location?.toLowerCase().includes(location?.toLowerCase())
      : item;

  // destination filter
  const destinationFilter = (item) =>
    item?.destination?.min >= destination?.min &&
    item?.destination?.max <= destination?.max;

  // category filter
  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
      : item;

  // foundation date filter
  const foundationDataFilter = (item) =>
    item?.foundationDate?.min >= foundationDate?.min &&
    item?.foundationDate?.max <= foundationDate?.max;

  // sort filter
  const sortFilter = (a, b) =>
    sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

  let content = companyData
    ?.slice(perPage.start !== 0 && 12, perPage.end !== 0 ? perPage.end : 20)
    ?.filter(keywordFilter)
    ?.filter(locationFilter)
    ?.filter(destinationFilter)
    ?.filter(categoryFilter)
    ?.filter(foundationDataFilter)
    ?.sort(sortFilter)
    ?.map((company) => (
      <div className="company-block-three" key={company.id}>
        <div className="inner-box">
          <div className="content">
            <div className="content-inner">
              <span className="company-logo">
                <Image
                  width={50}
                  height={50}
                  src={company.img}
                  alt="company brand"
                />
              </span>
              <h4>
                <Link href={`/employers-single-v1/${company.id}`}>
                  {company.name}
                </Link>
              </h4>
              <ul className="job-info">
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {company.location}
                </li>
                <li>
                  <span className="icon flaticon-briefcase"></span>{" "}
                  {company.jobType}
                </li>
              </ul>
            </div>

            {/* <ul className="job-other-info">
              {company.isFeatured ? <li className="privacy">Featured</li> : ""}

              <li className="time">Open Jobs – {company.jobNumber}</li>
            </ul> */}
          </div>

          <div className="text">{company.jobDetails}</div>

          <button className="bookmark-btn">
            <span className="flaticon-bookmark"></span>
          </button>
        </div>
      </div>
    ));

  // per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // clear handler
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(addFoundationDate({ min: 1900, max: 2028 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            <strong>{content?.length}</strong> jobs
          </div>
        </div>
        {/* End showing-result */}

        <div className="sort-by">
          {keyword !== "" ||
          location !== "" ||
          destination.min !== 0 ||
          destination.max !== 100 ||
          category !== "" ||
          foundationDate.min !== 1900 ||
          foundationDate.max !== 2028 ||
          sort !== "" ||
          perPage.start !== 0 ||
          perPage.end !== 0 ? (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{
                minHeight: "45px",
                marginBottom: "15px",
              }}
            >
              Clear All
            </button>
          ) : undefined}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>
          {/* End select */}

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3 "
            value={JSON.stringify(perPage)}
          >
            <option
              value={JSON.stringify({
                start: 0,
                end: 0,
              })}
            >
              All
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 10,
              })}
            >
              10 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 20,
              })}
            >
              20 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 24,
              })}
            >
              24 per page
            </option>
          </select>
          {/* End select */}
        </div>
      </div>
      {/* End top filter bar box */}

      {jobData.map((item) => (
        <div className="company-block-three" key={item.companyId}>
        <div className="inner-box">
          <div className="content">
            <div className="content-inner">
              <span className="company-logo">
              {item.image && item.companyImage.filePath ? (
  <Image
    width={90}
    height={90}
    src={item.companyImage.filePath} 
    alt="candidates"
  />
) : (
  <Image
            width={90}
            height={90}
            // src={item.image.filePath} 
            src="/logo3.svg"
            alt="candidates"
          />
)}
              </span>
              <h4>
                <Link href={`/employers-single-v1/${item.companyId}`}>
                  {item.name}
                </Link>
              </h4>
              <ul className="job-info">
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {companyData[0].location}
                </li>
                <li>
                  <span className="icon flaticon-briefcase"></span>{" "}
                  {companyData[0].jobType}
                </li>
              </ul>
            </div>

            {/* <ul className="job-other-info">
              {companyData[0].isFeatured ? <li className="privacy">Featured</li> : ""}

              <li className="time">Open Jobs – {companyData[0].jobNumber}</li>
            </ul> */}
          </div>

          <div className="text">{jobData.description}</div>

          <button className="bookmark-btn">
            <span className="flaticon-bookmark"></span>
          </button>
        </div>
      </div>
      ))}

      {content}

      <ListingShowing />
      {/* <!-- Listing Show More --> */}
    </>
  );
};

export default FilterTopBox;
