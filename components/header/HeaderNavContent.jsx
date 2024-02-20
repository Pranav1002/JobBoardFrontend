"use client";

import Link from "next/link";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";

const HeaderNavContent = () => {
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } `}
          >
            {/* <span>Home</span> */}
            <Link href="/">Home</Link>
          </li>
          {/* End homepage menu items */}

          <li
            className={`${
              isActiveParent(findJobItems, usePathname()) ? "current" : ""
            } dropdown`}
            id="has-mega-menu"
          >
            <span>Find Jobs</span>
            <ul>
              <li>
                <Link href="/job-list-v4">Job List</Link>
              </li>
              <li>
                <Link href="/job-single-v1/1">Job single</Link>
              </li>
            </ul>
            
          </li>
          {/* End findjobs menu items */}

          <li
            className={`${
              isActiveParent(employerItems, usePathname()) ||
              usePathname()?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Employers</span>
            <ul>
            <li>
              <Link href="/employers-single-v1/1">Employer</Link>
            </li>
            <li>
              <Link href="/employers-list-v1">Employers List</Link>
            </li>
              <li
                className={
                  usePathname()?.includes("/employers-dashboard")
                    ? "current"
                    : ""
                }
              >
                <Link href="/employers-dashboard/dashboard">
                  Employers Dashboard
                </Link>
              </li>
            </ul>
          </li>
          {/* End Employers menu items */}

          <li
            className={`${
              isActiveParent(candidateItems, usePathname()) ||
              usePathname()?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
                ? "current"
                : ""
            } dropdown`}
          >
            <span>Candidates</span>
            <ul>
              <li>
                <Link href="/candidates-single-v2/2">Candidates</Link>
              </li>
              <li>
                <Link href="/candidates-list-v1">Candiates List</Link>
              </li>
              <li
                className={
                  usePathname()?.includes("/candidates-dashboard/")
                    ? "current"
                    : ""
                }
              >
                <Link href="/candidates-dashboard/dashboard">
                  Candidates Dashboard
                </Link>
              </li>
            </ul>
          </li>
          {/* End Candidates menu items */}

          
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
