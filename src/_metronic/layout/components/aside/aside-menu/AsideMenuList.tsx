/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import { getUserInfo } from "../../../../../utils/user.util";

export function AsideMenuList({ layoutProps }: any) {
  const location = useLocation();
  let userInfo = getUserInfo();
  console.log("userInfouserInfo",userInfo);
  
  const getMenuItemActive = (url: any, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && "menu-item-active"
      } menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
     
      <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* Dashboard */}
        <li
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <i
                className="fa-solid fa-display"
                style={{ fontSize: "13px", color: "#383839" }}
              ></i>
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
          <>   
            {/* <li
              className={`menu-item ${getMenuItemActive("/contact", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/contact">
                <span className="svg-icon menu-icon">
                  <i
                    className="fa-solid fa-user"
                    style={{ fontSize: "13px", color: "#383839" }}
                  ></i>
                </span>
                <span className="menu-text">Landing Page</span>
              </NavLink>
            </li> */}

           
            {/* <li
              className={`menu-item ${getMenuItemActive("/onform", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/onform">
                <span className="svg-icon menu-icon">
                  <i
                    className="fa-solid fa-user"
                    style={{ fontSize: "13px", color: "#383839" }}
                  ></i>
                </span>
                <span className="menu-text">On form</span>
              </NavLink>
            </li> */}
            <li
              className={`menu-item ${getMenuItemActive("/Qualifiziert", false)}`}
              aria-haspopup="true"
            >
              <NavLink className="menu-link" to="/Qualifiziert">
                <span className="svg-icon menu-icon">
                  <i
                    className="fa-solid fa-user"
                    style={{ fontSize: "13px", color: "#383839" }}
                  ></i>
                </span>
                <span className="menu-text">Envoltec</span>
              </NavLink>
            </li>
           
          </>
      </ul>
      </>
      
    </>
  );
}
