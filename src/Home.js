import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listpage from "./Listpage";
import Reports from "./Report";

const Home = () => {
  // State to hold authentication status
  const [auth, setAuth] = useState();
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("dashboard");
  // Hook to get the navigation function from React Router
  let navigate = useNavigate();

  // Effect hook to check authentication status on component mount
  useEffect(() => {
    // Get authentication status from localStorage (Assuming it's stored as 'email')
    var auth = localStorage.getItem("email");
    // Set the authentication status in the state
    setAuth(auth);
  }, []);

  // If user is not authenticated, navigate to the login page (assuming '/')
  if (auth === null) {
    navigate(`/`);
  }

  // Function to handle tab clicks and update the active tab state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row dashboard-row">
          <div className="col-lg-2 col-md-12 col-sm-12 dashboard-section">
            {/* Tab for 'Dashboard' */}
            <p
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => handleTabClick("dashboard")}
            >
              <i className="fa fa-th-large" aria-hidden="true"></i>Clients 
            </p>
            {/* Tab for 'Reports' */}
            <p
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => handleTabClick("reports")}
            >
              <i className="fa fa-th-large" aria-hidden="true"></i>Reports
            </p>
          </div>

          <div className="col-lg-10 col-md-12 col-sm-12">
            {/* Render 'Listpage' component when 'Dashboard' tab is active */}
            {activeTab === "dashboard" && <Listpage />}
            {/* Render 'Reports' component when 'Reports' tab is active */}
            {activeTab === "reports" && <Reports />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
