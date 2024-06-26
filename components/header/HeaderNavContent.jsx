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
            <Link href="/">Home</Link>
          </li>
          {/* End homepage menu items */}

          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } `}
          >
            <Link href="/job-list-v4">Job Lists</Link>
          </li>

          <li
            className={`${
              isActiveParent(homeItems, usePathname()) ? "current" : ""
            } `}
          >
            <Link href="/employers-list-v1">Company Lists</Link>
          </li>

        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
