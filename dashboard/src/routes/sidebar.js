import React from "react";
import { SiHackerone } from "react-icons/si";
import { BiMoney, BiBug, BiSearch, BiListUl, BiHomeAlt } from "react-icons/bi";
import { TbNotes } from "react-icons/tb";
import { AiOutlineSecurityScan } from "react-icons/ai";


const routes = [
  {
    label: "Dashboard",
    href: "/app/dashboard",
    icon: <BiHomeAlt className="w-6 h-6" />,
  },
  {
    label: "Scan",
    href: "/app/scan",
    icon: <AiOutlineSecurityScan className="w-6 h-6" />,
  },
  {
    label: "Stats",
    href: "/app/stats",
    icon: <BiMoney className="w-6 h-6" />,
  },
  {
    label: "Notes",
    href: "/app/notes",
    icon: <TbNotes className="w-6 h-6" />,
  },
  {
    label: "Platforms",
    href: "/app/platforms",
    icon: <SiHackerone className="w-6 h-6" />,
  },
  {
    label: "Programs",
    href: "/app/programs",
    icon: <BiSearch className="w-6 h-6" />,
  },
  {
    label: "Subdomains",
    href: "/app/subdomains",
    icon: <BiListUl className="w-6 h-6" />,
  },
  {
    label: "Vulnerabilities",
    href: "/app/vulnerabilities",
    icon: <BiBug className="w-6 h-6" />,
  }
];

export default routes;
