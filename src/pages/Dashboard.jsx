import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useRef } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle clicks outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <div className="dashboard flex flex-col bg-[#f7eeee] h-[100vh]">
      {/* Header */}
      <div className="dashboard-header h-[12%] bg-body p-3 flex justify-between items-center px-6 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight transition-all duration-300 hover:scale-105">
          <span className="text-primary">Help</span>
          <span className="text-darkPrimary">er</span>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button
          ref={hamburgerRef}
          onClick={toggleSidebar}
          className="md:hidden text-darkPrimary w-10 h-10 flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 transition-transform duration-300 ${
              isSidebarOpen ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Search Bar */}
        <form className="hidden md:flex w-2/6 justify-center items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search available services..."
              className="block w-full h-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 rounded-2xl transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 bg-primary text-white rounded-lg px-4 py-2 transition-all duration-300 hover:bg-darkPrimary active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="actions hidden md:flex items-center space-x-4">
          <button className="bg-[#E7E6FE] w-12 h-12 rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95">
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button className="bg-[#E7E6FE] w-12 h-12 rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white active:scale-95">
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_190_1499)">
                <path
                  d="M15.0008 19C15.001 19.5046 14.8104 19.9906 14.4673 20.3605C14.1242 20.7305 13.654 20.9572 13.1508 20.995L13.0008 21H11.0008C10.4962 21.0002 10.0103 20.8096 9.64028 20.4665C9.2703 20.1234 9.04367 19.6532 9.00583 19.15L9.00082 19H15.0008ZM12.0008 2C13.8158 1.99997 15.5598 2.70489 16.8651 3.96607C18.1703 5.22726 18.9346 6.94609 18.9968 8.76L19.0008 9V12.764L20.8228 16.408C20.9023 16.567 20.9421 16.7429 20.9388 16.9206C20.9355 17.0984 20.8891 17.2727 20.8037 17.4286C20.7183 17.5845 20.5963 17.7174 20.4483 17.8158C20.3003 17.9143 20.1306 17.9754 19.9538 17.994L19.8388 18H4.16283C3.98499 18.0001 3.80979 17.957 3.65225 17.8745C3.4947 17.792 3.3595 17.6725 3.25824 17.5264C3.15698 17.3802 3.09267 17.2116 3.07083 17.0351C3.04899 16.8586 3.07026 16.6795 3.13283 16.513L3.17883 16.408L5.00083 12.764V9C5.00083 7.14348 5.73832 5.36301 7.05108 4.05025C8.36383 2.7375 10.1443 2 12.0008 2Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="mid-dashboard flex h-[88%] overflow-hidden">
        {/* Sidebar with conditional rendering and animation */}
        <div
          ref={sidebarRef}
          className={`fixed md:relative md:block z-40 h-full transform transition-all duration-300 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Dashboard Content */}
        <div className="dashboard-content w-full md:pl-[240px] h-full p-4 transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
