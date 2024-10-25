import { Link, useLocation, useNavigate } from "react-router-dom";
import { seekerLinks, providerLinks } from "./dashboard-navigation-links";
import { useSelector } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import "../index.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hideHeader = location.pathname === "/";

  const user = useSelector((state) => state.user.currentUser);
  const userData = user?.userData; // Destructure userData

  console.log("User Data:", user);
  console.log("User Type:", user?.userType);
  console.log("User Data:", userData);

  const userType = user?.userType;

  const links = userType === "serviceSeeker" ? seekerLinks : providerLinks;

  // Use useSelector to access user data from Redux store

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      style={hideHeader ? { display: "none" } : {}}
      className=" w-[240px] bg-[#fff] h-full p-2 flex flex-col justify-between"
    >
      <div className="navigation">
        <ul>
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              <div
                className={`navigation-buttons w-full h-14 my-2 rounded-3xl flex items-center pl-4 
                ${location.pathname === link.to ? "bg-[#E7E6FE]" : ""}
              `}
              >
                {link.icon}
                <li
                  className={`w-full text-[17px] h-14 my-2 flex items-center pl-3 
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
      <div
        className="user-profile h-52 flex flex-col items-center justify-evenly"
        // style={{ border: "2px solid black" }}
      >
        {/* Check if userData exists before accessing its properties */}
        {userData &&
        userData.profilePicture &&
        userData.fullName &&
        userType ? (
          <div className="profile-username flex flex-row items-center justify-evenly text-base font-semibold w-full">
            <img
              src={userData.profilePicture}
              alt="profile-picture"
              className=" w-12 h-12 border-5 rounded-full border-[#000] cursor-pointer"
            />
            <div className="username-wrapper">
              <h1>{userData.fullName}</h1>
              <p className=" text-sm font-medium">{userType}</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div> // Display a loading indicator if userData or its properties are null
        )}
        <div
          className="profile-details h-fit w-full p-3 flex flex-col items-center justify-evenly"
          // style={{ border: "2px solid black" }}
        >
          <p className=" text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            error.
          </p>
          <button
            className=" bg-alert w-40 h-10 rounded-3xl mt-4 hover:bg-[#952323] hover:text-body"
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
