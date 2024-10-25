import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";

const RequestedServicesCard = ({ serviceRequest }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { _id: providerId } = currentUser.userData || "Ganesh Gajelly";

  const [openModal, setOpenModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");

  const { serviceTitle, serviceDescription, servicePrice, serviceType, _id } =
    serviceRequest;

  const toggleAcceptRequestModal = () => setOpenModal(!openModal);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const apiKey =
          "FHqFgsMVDtpd3nNhH11V4JdEb7dxBMiH7wmEleEI9LuifOD2jMTQLyrQ";
        const apiUrl = `https://api.pexels.com/v1/search?query=${serviceType}&orientation=landscape`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: apiKey,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching hero image: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.photos?.length > 0) {
          setHeroImageUrl(data.photos[0].src.large);
        }
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage();
  }, [serviceType]);

  const applyToServiceRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/service-request/apply",
        {
          serviceProviderId: providerId,
          serviceRequestId: _id,
          message: applicationMessage,
        }
      );
      console.log("Application successful:", response.data);
      setOpenModal(false);
    } catch (error) {
      console.error("Error applying to service request:", error);
    }
  };

  return (
    <div className="border border-gray-200 w-full sm:w-[48%] lg:w-[30%] max-w-md h-[500px] m-3 mx-auto rounded-lg shadow-xl overflow-hidden bg-white">
      {/* Hero Image */}
      <img
        src={heroImageUrl}
        alt="Service"
        className="h-[230px] w-full object-cover rounded-t-lg"
      />

      {/* Popover for Requester Info */}
      <Popover placement="bottom-start">
        <PopoverHandler>
          <div className="flex items-center p-2 bg-gray-100 shadow-lg rounded-full cursor-pointer absolute top-2 left-2">
            <span className="text-sm mr-2">Requested by</span>
            <img
              src="../../public/mypic.png"
              alt="Requested by"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </PopoverHandler>
        <PopoverContent>
          <div className="flex flex-col p-2 text-center">
            <h1 className="font-semibold">Ganesh Gajelly</h1>
            <p className="text-sm text-gray-600">Mumbai</p>
            <p className="text-xs">Rating: ⭐⭐⭐⭐⭐</p>
          </div>
        </PopoverContent>
      </Popover>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between h-[270px]">
        {/* Service Title and Description */}
        <div>
          <h3 className="font-semibold text-xl text-gray-900">
            {serviceTitle}
          </h3>
          <p className="text-gray-500 mt-1 text-lg">₹{servicePrice}/hr</p>
          <p className="text-gray-700 mt-2 text-sm">{serviceDescription}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            className="bg-primary text-white py-1 px-4 rounded-lg text-sm hover:bg-blue-700 transition duration-300 ease-in-out"
            onClick={toggleAcceptRequestModal}
          >
            Accept
          </Button>
          <Dialog
            open={openModal}
            handler={toggleAcceptRequestModal}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>Accept This Request?</DialogHeader>
            <DialogBody>
              <p className="text-gray-700 mb-2">
                Write a short message explaining why they should hire you:
              </p>
              <textarea
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={toggleAcceptRequestModal}
                className="mr-1"
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={applyToServiceRequest}
              >
                Confirm
              </Button>
            </DialogFooter>
          </Dialog>
          <Button className=" bg-gray-500 text-sm px-4 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out">
            Not Interested
          </Button>
        </div>
      </div>
    </div>
  );
};

RequestedServicesCard.propTypes = {
  serviceRequest: PropTypes.shape({
    serviceTitle: PropTypes.string.isRequired,
    serviceDescription: PropTypes.string.isRequired,
    servicePrice: PropTypes.number.isRequired,
    serviceType: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default RequestedServicesCard;
