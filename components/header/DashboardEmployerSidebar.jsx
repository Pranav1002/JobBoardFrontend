'use client'

import Link from "next/link";
import employerMenuData from "../../data/employerMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice";
import { usePathname } from "next/navigation";
import { api } from "@/data/api";
import { useState } from "react";

const DashboardEmployerSidebar = () => {

    const { menu } = useSelector((state) => state.toggle);

    const dispatch = useDispatch();
    // menu togggle handler
    const menuToggleHandler = () => {
        dispatch(menuToggle());
    };

    const [showToast, setShowToast] = useState(false);

    const handleLogout = () => {
        setShowToast(true)
        localStorage.removeItem("user");
    }

    const userString = localStorage.getItem('user');
  let jw='';
  let user='';
  let id ='';
  let data='';        
          if (userString) {
             user = JSON.parse(userString);
              id = user.user.userId;
              jw = user.jwt;

          } else {
              console.error("User data not found");
          }

    const handleDelete = async () => {
        try {
      
            const apiUrl1 = api + "company/delete/" + id;
        
            const response = await fetch(apiUrl1, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jw}`,
                },
               
            });
        
            if (response.ok) {
                data = await response.json();
                console.log(data);
                alert("Profile Deleted");
        
              
            } else {
                console.log("Error fetching data:");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
            {/* Start sidebar close icon */}
            <div className="pro-header text-end pb-0 mb-0 show-1023">
                <div className="fix-icon" onClick={menuToggleHandler}>
                    <span className="flaticon-close"></span>
                </div>
            </div>
            {/* End sidebar close icon */}

            <div className="sidebar-inner">
                <ul className="navigation">
                    {employerMenuData.map((item) => (
                        <li
                            className={`${
                                isActiveLink(item.routePath, usePathname())
                                    ? "active"
                                    : ""
                            } mb-1`}
                            key={item.id}
                            onClick={menuToggleHandler}
                        >
                             {item.name=="Logout" ? (
                <button onClick={handleLogout}>
                    <Link href={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                  </Link>
                </button>
              ) :  (
                item.name == "Delete Profile" ? (
                    <button onClick={handleDelete}>
                    <Link href={item.routePath}>
                  <i className={`la ${item.icon}`}></i> {item.name}
                  </Link>
                </button>
                ) : (
                <Link href={item.routePath}>
                    <i className={`la ${item.icon}`}></i> {item.name}
                
                </Link>
              ))}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div
  className={`toast position-fixed bottom-0 end-0 m-3 ${showToast ? 'show' : ''}`}
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  style={{ backgroundColor: '#d6e9f7' }} // Set background color to light blue
>
  <div className="toast-header" style={{ backgroundColor: '#d6e9f7' }}> {/* Set header background color to a lighter shade of blue */}
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
  </svg>

    <strong className="me-auto">Notification</strong>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="toast"
      aria-label="Close"
      onClick={() => setShowToast(false)}
    ></button>
  </div>
  <div className="toast-body">
    Logged out successfully.
  </div>
</div>

        </div>
    );
};

export default DashboardEmployerSidebar;
