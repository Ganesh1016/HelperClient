import { useEffect, useState } from "react";
import RequestedServicesCard from "../components/RequestedServicesCard";
import { useSelector } from "react-redux";

const FindServices = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { _id: providerId } = currentUser.userData;
  console.log(providerId);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        // let providerMID = "65b5f659974733a461a61099";
        const response = await fetch(
          `http://localhost:3000/api/service-request/available-requests/${providerId}`
        );
        const data = await response.json();
        setServiceRequests(data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceRequests();
  }, [providerId]);

  return (
    <div className="w-full h-full flex flex-row flex-wrap justify-start overflow-y-auto">
      {serviceRequests.map((request) => (
        <RequestedServicesCard key={request._id} serviceRequest={request} />
      ))}
    </div>
  );
};

export default FindServices;
