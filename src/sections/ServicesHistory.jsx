import { useSelector } from "react-redux";
import ServicesDetailsCard from "../components/ServicesDetailsCard";
import { useState, useEffect } from "react";

const ServicesHistory = () => {
  const seekerId = useSelector(
    (state) => state.user?.currentUser?.userData._id
  );

  const [pastServices, setPastServices] = useState([]);

  useEffect(() => {
    // Fetch past services from the API
    const fetchPastServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/service-request/get-past-services",
          {
            method: "POST", // Assuming you need to send seekerId
            headers: {
              "Content-Type": "application/json",
            },
            // Include any necessary data like seekerId in the request body
            body: JSON.stringify({ seekerId }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch past services");
        }
        const data = await response.json();
        setPastServices(data);
      } catch (error) {
        console.error("Error fetching past services:", error);
      }
    };

    fetchPastServices();
  }, [seekerId]); // Fetch past services once when the component mounts

  return (
    <div id="active-services" className="active-services h-full">
      <h2>You will find your past services here.</h2>
      <div className="cards overflow-y-scroll flex flex-row w-full h-full flex-wrap justify-around">
        {/* Render ServicesDetailsCard for each past service */}
        {pastServices.map((service) => (
          <ServicesDetailsCard
            key={service._id}
            service={service}
            selectedProviderDetails={service.selectedProviderDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesHistory;
