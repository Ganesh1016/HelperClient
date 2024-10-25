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
  const { _id: providerId } = currentUser.userData;
  console.log(providerId);

  const [openModal, setOpenModal] = useState(false);

  const toggleAcceptRequestModal = () => {
    setOpenModal(!openModal);
  };

  const {
    serviceTitle,
    serviceDescription,
    servicePrice,
    serviceType,
    _id,
    // seeker,
    // createdAt,
    // serviceStatus,
  } = serviceRequest;

  const [heroImageUrl, setHeroImageUrl] = useState("");
  // State to manage the message input
  const [applicationMessage, setApplicationMessage] = useState("");

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        // Use the serviceType to search for images related to the service
        const apiKey =
          "FHqFgsMVDtpd3nNhH11V4JdEb7dxBMiH7wmEleEI9LuifOD2jMTQLyrQ";
        const apiUrl = "https://api.pexels.com/v1/search";

        const response = await fetch(
          `${apiUrl}?query=${serviceType}&orientation=landscape`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching hero image: ${response.statusText}`);
        }

        const data = await response.json();

        // Choose the first image from the search results
        if (data.photos && data.photos.length > 0) {
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
      // Make POST request to the backend API
      const response = await axios.post(
        "http://localhost:3000/api/service-request/apply",
        {
          serviceProviderId: providerId,
          serviceRequestId: _id,
          message: applicationMessage,
        }
      );

      console.log("Application successful:", response.data);

      // Close the modal
      setOpenModal(false);

      // You can add further UI updates or notifications here if needed
    } catch (error) {
      console.error("Error applying to service request:", error);
      // Handle error, show error message or retry logic
    }
  };

  return (
    <div className="requested-services relative border border-darkPrimary w-[28%] h-[500px] m-3 mx-10 ml-0 rounded-xl">
      <img
        src={heroImageUrl}
        alt=""
        className="rounded-xl h-[230px] w-full bg-cover"
      />
      <Popover placement="bottom-start">
        <PopoverHandler>
          <div
            className="requested-by-container flex flex-row justify-evenly items-center w-[150px] h-[45px] bg-body bg-opacity-80 shadow-3xl rounded-full z-10 absolute top-2 left-2 cursor-pointer hover:bg-opacity-100"
            data-popover-target="popover-user-profile"
          >
            <p className="text-[13px]">Requested by</p>
            {/* Assuming seeker is the ID of the service requester */}
            <img
              src="../../public/mypic.png"
              alt=""
              className="h-[40px] rounded-full"
              id="service-provider-profile-pic"
            />
          </div>
        </PopoverHandler>
        <PopoverContent>
          <div className="service-provider-detail w-[160px] h-[70px] flex flex-col ">
            <div className="name flex flex-row justify-evenly items-center">
              <div className="container flex flex-col">
                <h1 className=" font-bold">Ganesh Gajelly</h1>
                <p className="">21, Male</p>
              </div>
              <img
                src="../../public/mypic.png"
                alt=""
                className=" w-[40px] h-[40px] rounded-full"
              />
            </div>
            <p>Mumbai</p>
            <h4>Ratings ⭐⭐⭐⭐⭐</h4>
          </div>
        </PopoverContent>
      </Popover>
      <div className="service-title h-[30px] flex flex-row justify-between mt-1 px-2">
        <p className="service-title font-bold">{serviceTitle}</p>
        <p className="service-price">₹{servicePrice}/hr</p>
      </div>
      <div className="service-description text-sm overflow-y-auto p-2 h-[160px]">
        {serviceDescription}
      </div>
      <div className="service-request-actions w-full h-[65px] flex flex-row justify-between items-center px-4">
        <Button
          className=" bg-primary py-2 px-4 rounded-lg text-[13px] font-poppins cursor-pointer !font-normal"
          onClick={toggleAcceptRequestModal}
        >
          Accept Request
        </Button>
        <Dialog
          open={openModal}
          handler={toggleAcceptRequestModal}
          className=""
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader className=" font-poppins">
            ACCEPT THIS REQUEST?
          </DialogHeader>
          <DialogBody>
            <h1 className=" font-poppins text-darkPrimary">
              Write a short message, why they should hire you?
            </h1>
            <textarea
              name="applicationMessage"
              id=""
              cols="70"
              rows="4"
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              className=" border-4 font-poppins text-black font-medium"
            ></textarea>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={toggleAcceptRequestModal}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={applyToServiceRequest}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <Button className=" bg-primary py-2 px-4 rounded-lg font-poppins text-[13px] cursor-pointer !font-normal">
          Not interested
        </Button>
      </div>
    </div>
  );
};

RequestedServicesCard.propTypes = {
  serviceRequest: PropTypes.shape({
    serviceTitle: PropTypes.string.isRequired,
    serviceDescription: PropTypes.string.isRequired,
    servicePrice: PropTypes.number.isRequired,
    seeker: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    serviceType: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    serviceStatus: PropTypes.string.isRequired,
    // Add more fields as needed
  }).isRequired,
};

export default RequestedServicesCard;
