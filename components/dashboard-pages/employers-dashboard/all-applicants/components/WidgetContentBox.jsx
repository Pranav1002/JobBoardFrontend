"use client";

import candidatesData from "../../../../../data/candidates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/legacy/image";
import Applicants from "./Applicants";

const WidgetContentBox = () => {
  return (
    <div className="widget-content">
      <div className="row">
        <Applicants />
      </div>
    </div>
  );
};

export default WidgetContentBox;
