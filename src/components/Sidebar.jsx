import { Link, useLocation, useNavigate } from "react-router-dom";
import { seekerLinks, providerLinks } from "./dashboard-navigation-links";
import { useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import "../index.css";

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hideHeader = location.pathname === "/";

  const user = useSelector((state) => state.user.currentUser);
  const userData = user?.userData || "Ganesh Gajelly";
  const userType = user?.userType;
  const links = userType === "serviceSeeker" ? seekerLinks : providerLinks;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNavigation = () => {
    // Call the onNavigate prop to close sidebar on mobile
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div
      style={hideHeader ? { display: "none" } : {}}
      className="w-[240px] bg-[#fff] h-full p-2 flex flex-col justify-between shadow-lg transition-transform duration-300"
    >
      <div className="navigation">
        <ul>
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={handleNavigation}>
              <div
                className={`navigation-buttons w-full h-14 sm:h-12 my-2 rounded-2xl flex items-center pl-4 transition-all duration-300 hover:scale-105 active:scale-95
                ${
                  location.pathname === link.to
                    ? "bg-[#E7E6FE]"
                    : "hover:bg-gray-100"
                }
              `}
              >
                <div
                  className={`transition-transform duration-300 ${
                    location.pathname === link.to ? "scale-110" : ""
                  }`}
                >
                  {link.icon}
                </div>
                <li
                  className={`w-full text-[17px] sm:text-sm my-2 flex items-center pl-3 transition-all duration-300
                  ${
                    location.pathname === link.to
                      ? "font-medium text-primary"
                      : "hover:font-medium hover:text-primary"
                  }
                `}
                >
                  {link.label}
                </li>
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <div className="user-profile h-52 flex flex-col items-center justify-evenly">
        {userData &&
        userData.profilePicture &&
        userData.fullName &&
        userType ? (
          <div className="profile-username flex flex-row items-center justify-evenly text-base font-semibold w-full">
            <img
              src={userData.profilePicture}
              alt="profile-picture"
              className="w-12 h-12 border-5 rounded-full border-[#000] cursor-pointer transition-transform duration-300 hover:scale-110"
            />
            <div className="username-wrapper">
              <h1 className="transition-all duration-300 hover:text-primary">
                {userData.fullName}
              </h1>
              <p className="text-sm font-medium">{userType}</p>
            </div>
          </div>
        ) : (
          <div className="animate-pulse">Loading...</div>
        )}
        <div className="profile-details h-fit w-full p-3 flex flex-col items-center justify-evenly">
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            error.
          </p>
          <button
            className="bg-alert w-40 h-10 rounded-3xl mt-4 text-white transition-all duration-300 transform hover:bg-[#952323] hover:scale-105 active:scale-95 hover:shadow-md"
            id="logout"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
