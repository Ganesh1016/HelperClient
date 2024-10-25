import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  // const { page } = useParams();
  // console.log(page);

  return (
    <div
      className="dashboard flex flex-col bg-[#f7eeee] h-[100vh]"
      //   style={{ border: "2px solid blue" }}
    >
      <div
        className="dashboard-header h-[12%] bg-body p-3 flex flex-row justify-between px-10"
        // style={{ border: "2px solid black" }}
      >
        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight"
          // style={{ border: "2px solid black" }}
        >
          <span className="text-primary">Help</span>
          <span className="text-darkPrimary">er</span>
        </h1>
        <form
          className=" w-2/6 flex justify-center items-center ml-auto mr-6"
          // style={{ border: "2px solid black" }}
        >
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
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
              id="default-search"
              className="block w-full h-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  rounded-2xl"
              placeholder="Search available services.."
              required
            />
            <button
              type="submit"
              className=" text-body absolute end-2.5 bottom-2.5 bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div
          className="actions flex flex-row items-center w-[10%] justify-evenly"
          // style={{ border: "2px solid black" }}
        >
          <button
            className=" bg-[#E7E6FE] text-body w-12 h-12 rounded-full flex justify-center items-center"
            // style={{ border: "2px solid black" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                fill="#6C64FB"
              />
            </svg>
          </button>
          <button className="text-body bg-[#E7E6FE] w-12 h-12 rounded-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_190_1499)">
                <path
                  d="M15.0008 19C15.001 19.5046 14.8104 19.9906 14.4673 20.3605C14.1242 20.7305 13.654 20.9572 13.1508 20.995L13.0008 21H11.0008C10.4962 21.0002 10.0103 20.8096 9.64028 20.4665C9.2703 20.1234 9.04367 19.6532 9.00583 19.15L9.00082 19H15.0008ZM12.0008 2C13.8158 1.99997 15.5598 2.70489 16.8651 3.96607C18.1703 5.22726 18.9346 6.94609 18.9968 8.76L19.0008 9V12.764L20.8228 16.408C20.9023 16.567 20.9421 16.7429 20.9388 16.9206C20.9355 17.0984 20.8891 17.2727 20.8037 17.4286C20.7183 17.5845 20.5963 17.7174 20.4483 17.8158C20.3003 17.9143 20.1306 17.9754 19.9538 17.994L19.8388 18H4.16283C3.98499 18.0001 3.80979 17.957 3.65225 17.8745C3.4947 17.792 3.3595 17.6725 3.25824 17.5264C3.15698 17.3802 3.09267 17.2116 3.07083 17.0351C3.04899 16.8586 3.07026 16.6795 3.13283 16.513L3.17883 16.408L5.00083 12.764V9C5.00083 7.14348 5.73832 5.36301 7.05108 4.05025C8.36383 2.7375 10.1443 2 12.0008 2Z"
                  fill="#6C64FB"
                />
              </g>
              <defs>
                <clipPath id="clip0_190_1499">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <div className="mid-dashboard h-[88%] flex flex-row overflow-hidden">
        <Sidebar />
        <div className="dashboard-content p-2 w-[95%] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
