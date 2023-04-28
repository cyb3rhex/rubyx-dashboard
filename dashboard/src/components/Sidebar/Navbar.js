import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/user";
import { NavLink } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  PersonIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../../icons";
import {
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import Input from "../Input";
import classNames from "classnames";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const { mode, toggleMode } = useContext(WindmillContext);
  
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      className="bg-white text-zinc-500 flex items-center justify-between px-6 mx-auto  w-screen md:w-full sticky z-10  shadow-sm h-[73px] top-0"
    >
      <div className="font-bold text-lg">Rubyx</div>
      <div className="flex-grow"></div>

            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <PersonIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem>
                <NavLink
                  exact
                  to="/app/account"
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  activeClassName="text-gray-800 dark:text-gray-100"
                >
                  <OutlinePersonIcon
                    className="w-4 h-4 mr-3"
                    aria-hidden="true"
                  />
                  <span>Profile</span>
                </NavLink>
              </DropdownItem>

              <DropdownItem tag="a" href="#">
                <NavLink
                  exact
                  to="/app/settings"
                  className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                  activeClassName="text-gray-800 dark:text-gray-100"
                >
                  <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Settings</span>
                </NavLink>
              </DropdownItem>
              <DropdownItem onClick={() => handleLogout()}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>


      <button className="md:hidden p-6" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
