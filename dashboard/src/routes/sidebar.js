import React from "react";
import { SiHackerone } from "react-icons/si";
import { AiFillSecurityScan } from "react-icons/ai";
import { FaPencilAlt, FaSearch, FaList, FaBug, FaMoneyBill, FaHome, FaUser, FaWrench } from "react-icons/fa";

const routes = [
  {
    label: "Dashboard",
    href: "/app/dashboard",
    icon: <FaHome className="w-6 h-6" />,
  },
  {
    label: "Scan",
    href: "/app/scan",
    icon: <AiFillSecurityScan className="w-6 h-6" />,
  },
  {
    label: "Stats",
    href: "/app/stats",
    icon: <FaMoneyBill className="w-6 h-6" />,
  },
  {
    label: "Notes",
    href: "/app/notes",
    icon: <FaPencilAlt className="w-6 h-6" />,
  },
  {
    label: "Platforms",
    href: "/app/platforms",
    icon: <SiHackerone className="w-6 h-6" />,
  },
  {
    label: "Programs",
    href: "/app/programs",
    icon: <FaSearch className="w-6 h-6" />,
  },
  {
    label: "Subdomains",
    href: "/app/subdomains",
    icon: <FaList className="w-6 h-6" />,
  },
  {
    label: "Vulnerabilities",
    href: "/app/vulnerabilities",
    icon: <FaBug className="w-6 h-6" />,
  },
  {
    label: "Settings",
    href: "/app/settings",
    icon: <FaWrench className="w-6 h-6" />,
  },
  {
    label: "My Account",
    href: "/app/account",
    icon: <FaUser className="w-6 h-6" />,
  }
];

export default routes;
