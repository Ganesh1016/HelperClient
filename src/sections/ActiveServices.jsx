import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ServicesDetailsCard from "../components/ServicesDetailsCard";

const ActiveServices = () => {
  const seekerId = useSelector(
    (state) => state.user?.currentUser?.userData._id
  );

  const [activeServices, setActiveServices] = useState([]);

  useEffect(() => {
    // Fetch active services from the API
    const fetchActiveServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/service-request/active-services",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seekerId }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch active services");
        }
        const data = await response.json();
        setActiveServices(data);
      } catch (error) {
        console.error("Error fetching active services:", error);
      }
    };

    fetchActiveServices();
  }, [seekerId]); // Fetch active services whenever seekerId changes

  return (
    <div id="active-services" className="active-services h-full">
      <h2>Here you will find all your active services.</h2>
      <div className="cards overflow-y-scroll flex flex-row w-full h-full flex-wrap justify-around">
        {/* Render ActiveServicesCard for each active service */}
        {activeServices.map((service) => (
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

export default ActiveServices;
