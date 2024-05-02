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
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } `}
          >
            {/* <span>Home</span> */}
            <Link href="/job-list-v4">Job List</Link>
          </li>

          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } `}
          >
            {/* <span>Home</span> */}
            <Link href="/employers-list-v1">Employers List</Link>
          </li>



          
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
