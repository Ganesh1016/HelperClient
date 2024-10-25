import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import PropTypes from "prop-types";
import { useState } from "react";
import UserProfileModal from "./UserProfileModal";
import axios from "axios";
import { useSelector } from "react-redux"; // Importing useSelector from react-redux
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Textarea,
} from "@material-tailwind/react";
import StarRating from "./StarRating";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const ServicesDetailsCard = ({ service, selectedProviderDetails }) => {
  const currentUser = useSelector((state) => state.user.currentUser); // Using useSelector to access current user data
  const { _id: seekerId } = currentUser.userData;
  const { profilePicture, fullname } = selectedProviderDetails;
  const [providerDetails, setProviderDetails] = useState(null);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const toggleFeedbackDialog = () => {
    setOpenFeedbackDialog(!openFeedbackDialog);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const {
    serviceTitle,
    serviceDescription,
    servicePrice,
    serviceType,
    serviceDuration,
    selectedServiceProvider,
  } = service;

  console.log("id of provider", selectedServiceProvider);

  const handleToggleUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user-details?userId=${selectedServiceProvider}&userType=serviceProvider`
      );
      setProviderDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
    setOpenUserProfile(!openUserProfile);
  };

  const handleEndService = async () => {
    try {
      // Make API call to end the service
      console.log(service._id);
      await axios
        .post(`http://localhost:3000/api/service-request/end-service`, {
          serviceRequestId: service._id,
        })
        .then(() => {
          // Open the feedback dialog after service ends
          setOpenFeedbackDialog(true);
        });
    } catch (error) {
      console.error("Error ending service:", error);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.post("http://localhost:3000/api/feedback", {
        serviceRequest: service._id,
        seekerId: seekerId,
        providerId: selectedServiceProvider,
        reviews: review,
        ratings: rating,
        feedbackFlow: "seekerToProvider",
      });
      setOpenFeedbackDialog(false);
      // Optionally, you can add a success message or perform any other actions after submitting feedback
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optionally, handle error cases here
    }
  };

  // const fetchUserDetails = async () => {};

  // This code block shows empty screen if no active servcies are available.
  if (!service) {
    // Return a placeholder or loading state when service is null
    return (
      <div className="flex justify-center items-center">No active services</div>
    );
  }

  // The code block calculates the days between the start and end date of th service to calculate the duration
  const startDate = new Date(serviceDuration.startDate);
  const endDate = new Date(serviceDuration.endDate);
  // Calculate the difference in milliseconds
  const difference = endDate.getTime() - startDate.getTime();
  // Convert milliseconds to days
  const serviceDurationInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return (
    <div
      className="activeservicescard w-[45%] md:h-[80vh] bg-[#F5F7F8] rounded-lg flex flex-col shadow-lg mb-5"
      // style={{ border: "2px solid black" }}
    >
      <div className="status flex flex-row justify-between px-5 md:my-2">
        {service.serviceStatus === "close" ? (
          <p className="text-red-700 font-semibold">
            {/* Service closed at {new Date(service.closedAt).toLocaleString()} */}
            Service closed at 10 March
          </p>
        ) : (
          <Menu>
            <MenuHandler>
              <button
                type="button"
                id="end-service"
                className="w-8 h-full hover:bg-[#E3E1D9] outline-1 flex items-center justify-center"
              >
                <img
                  src="/icons/hamburger-menu-icon.svg"
                  alt="Description of the image "
                  className="w-6"
                />
              </button>
            </MenuHandler>
            <MenuList>
              <MenuItem className="bg-red-700 text-white hover:bg-red-700">
                <button onClick={handleEndService}>End Service</button>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        <button onClick={toggleFeedbackDialog}>Open feedback</button>
        <button
          className={`${
            service.serviceStatus === "close" ? "bg-red-700" : "bg-primary"
          } text-white md:w-24 md:h-8 text-center rounded-md`}
          disabled
        >
          {service.serviceStatus === "close" ? "Closed" : "Active"}
        </button>
      </div>
      <div
        className="details-container flex flex-row md:h-[80%]"
        // style={{ border: "2px solid black" }}
      >
        <div
          className="timeline border-r-2 border-black border-dashed md:w-[40%] h-full flex flex-col justify-start items-center"
          // style={{ border: "2px solid black" }}
        >
          <p>Timeline</p>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
                height: 350,
              },
            }}
          >
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                09:30 am
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <p className=" text-sm font-poppins">
                  {new Date(
                    service.serviceDuration.startDate
                  ).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="textSecondary">
                10:00 pm
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <p className=" text-sm font-poppins">
                  {new Date(service.serviceDuration.endDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>

        <div
          className="details md:w-[60%] flex flex-col justify-start items-center"
          // style={{ border: "2px solid black" }}
        >
          <p>Service Details</p>
          <div className="service flex flex-col items-center justify-start md:w-[95%] bg-[#FFCDEA] rounded-lg ">
            <p className=" text-sm font-semibold">{serviceTitle}</p>
            <div className="service-images-container w-full rounded-lg">
              <Splide
                aria-label="My Favorite Images"
                options={{
                  rewind: true,
                  width: "300",
                  gap: "1rem",
                }}
                className=" rounded-lg"
              >
                <SplideSlide>
                  <img
                    src="https://images.pexels.com/photos/1216544/pexels-photo-1216544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Image 1"
                  />
                </SplideSlide>
              </Splide>
            </div>
          </div>
          <div
            className="pricing-details w-full h-full p-3"
            // style={{ border: "2px solid black" }}
          >
            <table
              className="table-fixed w-full h-full ml-2"
              // style={{ border: "2px solid black" }}
            >
              <tbody className=" h-full">
                <tr>
                  <td className="w-1/2 font-bold text-sm">
                    Service Description
                  </td>
                  <td
                    className="w-1/2 text-sm overflow-y-auto"
                    style={{ maxHeight: "60px" }}
                  >
                    {serviceDescription}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/2 font-bold text-sm">Price</td>
                  <td className="w-1/2 text-sm">₹{servicePrice}</td>
                </tr>
                <tr>
                  <td className="w-1/2 font-bold text-sm">Type</td>
                  <td className="w-1/2 text-sm">{serviceType}</td>
                </tr>
                <tr>
                  <td className="w-1/2 font-bold text-sm">Duration</td>
                  <td className="w-1/2 text-sm">
                    {serviceDurationInDays} days
                  </td>
                </tr>
                <tr>
                  <td className="w-1/2 font-bold text-sm">Payment Status</td>
                  <td className="w-1/2 text-sm">Completed</td>
                </tr>
                <tr>
                  <td className="w-1/2 font-bold text-sm">Requested at</td>
                  <td className="w-1/2 text-sm">
                    {new Date(service.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="provider-details-container h-full flex flex-row justify-between items-center"
        // style={{ border: "2px solid black" }}
      >
        <p className=" ml-3">Fulfilled by: </p>
        <div className="provider-profile h-full flex flex-row items-center">
          <p className=" mr-4">{fullname}</p>
          <img
            src={profilePicture}
            alt="mypic"
            className=" h-14 rounded-full mr-3 cursor-pointer outline-2 hover:outline outline-offset-2 outline-blue-500"
            onClick={handleToggleUserProfile}
          />
        </div>
      </div>
      {providerDetails && (
        <UserProfileModal
          open={openUserProfile}
          handleToggleUserProfile={handleToggleUserProfile}
          userDetails={providerDetails}
        />
      )}
      <Dialog
        size="xs"
        open={openFeedbackDialog}
        handler={toggleFeedbackDialog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Leave Feedback
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Share your experience by leaving feedback.
            </Typography>
            {/* Rating */}
            <Typography className="-mb-2" variant="h6">
              Rating
            </Typography>
            <div className="flex items-center gap-2">
              {/* Replace 'StarRatingComponent' with your actual star rating component */}
              <div className="flex items-center gap-2">
                <StarRating
                  onChange={(value) => handleRatingChange(value)} // Adjusted to call handleRatingChange
                />
              </div>
            </div>
            {/* Review */}
            <Typography className="-mb-2" variant="h6">
              Review
            </Typography>
            <Textarea
              label="Your Review"
              size="lg"
              value={review} // Added value attribute to bind review state
              onChange={handleReviewChange} // Added onChange handler to update review state
            />
          </CardBody>
          <CardFooter className="pt-0">
            {/* Submit Button */}
            <Button variant="gradient" onClick={handleSubmitFeedback} fullWidth>
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

ServicesDetailsCard.propTypes = {
  service: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    serviceTitle: PropTypes.string.isRequired,
    serviceDescription: PropTypes.string.isRequired,
    servicePrice: PropTypes.number.isRequired,
    serviceType: PropTypes.string.isRequired,
    serviceStatus: PropTypes.string.isRequired,
    serviceDuration: PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    selectedServiceProvider: PropTypes.string.isRequired,
  }).isRequired,
  selectedProviderDetails: PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicesDetailsCard;
