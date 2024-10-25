import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

const SeekerDashboard = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const stats = [
    {
      title: "Total Service Requests",
      value: 23,
      description: "The number of service requests you have made.",
    },
    {
      title: "Pending Requests",
      value: 5,
      description: "Services yet to be accepted by a provider.",
    },
    {
      title: "Active Services",
      value: 2,
      description: "Currently ongoing services.",
    },
    {
      title: "Service Completion Rate",
      value: "87%",
      description: "Percentage of services successfully completed.",
    },
    {
      title: "Average Response Time",
      value: "2h 45m",
      description: "Average time taken by providers to respond.",
    },
    {
      title: "Favorite Providers",
      value: 3,
      description: "Most frequently hired service providers.",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === stats.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? stats.length - 1 : prevSlide - 1
    );
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="p-4 w-full h-screen bg-[#f9f9f9] overflow-y-auto">
      {/* Dashboard Header */}
      <div className="w-full bg-body flex justify-between items-center py-2 px-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-darkPrimary">
          Welcome to <span className="text-primary">Helper</span>
        </h1>
        <button
          className="bg-primary text-white py-2 px-4 rounded-lg"
          onClick={() => handleNavigate("/profile")}
        >
          Profile
        </button>
      </div>

      {/* Stats Carousel Section */}
      <div className="my-2">
        <h2 className="text-xl font-semibold text-gray-800">Your Stats</h2>
        <div className="relative mt-4 flex justify-center items-center">
          <button
            className="absolute left-0 bg-primary text-white py-2 px-3 rounded-full"
            onClick={handlePrevSlide}
          >
            &lt;
          </button>

          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mx-6 text-center">
            <h3 className="text-lg font-bold">{stats[currentSlide].title}</h3>
            <p className="text-3xl font-semibold mt-2">
              {stats[currentSlide].value}
            </p>
            <p className="text-gray-600 mt-1">
              {stats[currentSlide].description}
            </p>
          </div>

          <button
            className="absolute right-0 bg-primary text-white py-2 px-3 rounded-full"
            onClick={handleNextSlide}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Quick Overview Section */}
      <div className="my-2 overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800">Quick Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Search for Service Provider */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">
              Search Service Provider
            </h3>
            <p className="text-gray-600 mb-4">
              Find reliable service providers near you.
            </p>
            <Button
              className="bg-primary text-white w-full py-2"
              onClick={() => handleNavigate("/find-providers")}
            >
              Search Now
            </Button>
          </div>

          {/* Raise New Service Request */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Raise a New Request</h3>
            <p className="text-gray-600 mb-4">
              Need help? Raise a new service request.
            </p>
            <Button
              className="bg-primary text-white w-full py-2"
              onClick={() => handleNavigate("/new-service-request")}
            >
              Raise Request
            </Button>
          </div>

          {/* Track Active Services */}
          <div className="bg-white shadow-md rounded-lg p-4 sm:col-span-2">
            <h3 className="text-lg font-semibold mb-2">Active Services</h3>
            <p className="text-gray-600 mb-4">
              Keep track of ongoing services and manage them.
            </p>
            <Button
              className="bg-primary text-white w-full py-2"
              onClick={() => handleNavigate("/active-services")}
            >
              Track Services
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity (Optional) */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
        <p className="text-gray-600 mt-2">No recent activity available.</p>
      </div>
    </div>
  );
};

export default SeekerDashboard;
