import { useEffect, useMemo, useState } from "react";
import RequestedServicesCard from "../components/RequestedServicesCard";
// import { useSelector } from "react-redux";

const FindServices = () => {
  // const currentUser = useSelector((state) => state.user.currentUser);
  // const { _id: providerId } = currentUser.userData || "123";
  const [serviceRequests, setServiceRequests] = useState([]);

  const dummyServiceRequests = useMemo(
    () => [
      {
        _id: "1",
        serviceTitle: "House Cleaning",
        serviceDescription:
          "Looking for a reliable cleaner for a one-time job.",
        servicePrice: 500,
        serviceType: "Cleaning",
      },
      {
        _id: "2",
        serviceTitle: "Plumbing Fix",
        serviceDescription: "Need a plumber to fix a leaking pipe.",
        servicePrice: 700,
        serviceType: "Plumbing",
      },
      {
        _id: "3",
        serviceTitle: "Gardening Service",
        serviceDescription: "Seeking a gardener for lawn maintenance.",
        servicePrice: 300,
        serviceType: "Gardening",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        // const response = await fetch(
        //   `http://localhost:3000/api/service-request/available-requests/${providerId}`
        // );
        // const data = await response.json();
        setServiceRequests(dummyServiceRequests);
      } catch (error) {
        console.error("Error fetching service requests:", error);
        // Use dummy data in case of an error
        setServiceRequests(dummyServiceRequests);
      }
    };

    fetchServiceRequests();
  }, [dummyServiceRequests]);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4 overflow-y-auto">
      {/* Page Heading and Subheading */}
      <header className="text-center mb-4 font-poppins">
        <h1 className="text-2xl font-semibold text-darkPrimary">
          Find Service Requests
        </h1>
        <p className="text-gray-600 mt-2">
          Discover available service requests from seekers looking for qualified
          providers like you. Apply to those that match your expertise.
        </p>
      </header>

      {/* Render service requests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceRequests.map((request) => (
          <RequestedServicesCard key={request._id} serviceRequest={request} />
        ))}
      </div>
    </div>
  );
};

export default FindServices;
