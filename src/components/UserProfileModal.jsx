import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import UserFeedback from "./UserFeedback";

const UserProfileModal = ({ open, handleToggleUserProfile, userDetails }) => {
  return (
    <Dialog open={open} handler={handleToggleUserProfile} size="xl">
      <DialogHeader>{`${userDetails.fullname}'s Profile`}</DialogHeader>
      <DialogBody>
        <div className="profile h-[60vh]">
          <div
            className="profile-card h-[60%] flex flex-row"
            // style={{ border: "2px solid black" }}
          >
            <img
              src={userDetails.profilePicture}
              alt="Provider profile picture"
              className=" rounded-md h-full"
            />
            <div
              className="personal-details  flex flex-col ml-2 w-[30%] font-poppins p-2 rounded-2xl"
              style={{ border: "3px solid black" }}
            >
              <h1 className=" text-sm bg-purple-900 w-fit py-1 px-2 rounded-lg text-blue-gray-50 font-medium">
                Personal Details:
              </h1>
              <h1 className=" font-bold text-darkPrimary text-2xl">
                {userDetails.fullname}
              </h1>
              <h4 className=" text-base font-medium ">
                {userDetails.age} Years | {userDetails.gender}
              </h4>
              <div className="container flex flex-row mt-auto">
                <h5 className="text-base font-normal text-darkPrimary">
                  Ratings: <br />
                  <span className="text-2xl">
                    {"⭐".repeat(userDetails.feedback.averageRating)}
                  </span>
                </h5>
                <h5 className="text-base font-normal ml-4 text-darkPrimary">
                  Reviews: <br />
                  <span className="text-2xl">
                    {userDetails.feedback.totalReviews}
                  </span>
                </h5>
              </div>
            </div>
            <div
              className="professional-details w-[65%] h-full ml-2 rounded-xl font-poppins p-2"
              style={{ border: "3px solid black" }}
            >
              <h1 className=" text-sm bg-purple-900 w-fit py-1 px-2 rounded-lg text-blue-gray-50 font-medium">
                Professional Details:
              </h1>
              <div className="details-container flex flex-row justify-between">
                <div className="details-key-container w-2/4 h-full flex flex-col justify-evenly">
                  <p>Service Type:</p>
                  <p>Service Location:</p>
                  <p>Availability:</p>
                  <p>Hourly Rate:</p>
                  <p>Work Experience:</p>
                  <p>Joined Helper.com at:</p>
                </div>
                <div className="details-value-container w-2/4">
                  <p>{userDetails.serviceCategory}</p>
                  <p>{userDetails.serviceLocation}</p>
                  <p>{`${userDetails.availability} hours/day`}</p>
                  <p>{`₹${userDetails.hourlyRate}/hour`}</p>
                  <p>{`${userDetails.workExperience} years`}</p>
                  <p>{userDetails.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="reviews h-[40%] w-full flex flex-row justify-start items-center"
            // style={{ border: "2px solid black" }}
          >
            {userDetails.feedback.reviews.map((feedback) => (
              <UserFeedback key={feedback._id} feedback={feedback} />
            ))}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleToggleUserProfile}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleToggleUserProfile}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

UserProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleToggleUserProfile: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    serviceCategory: PropTypes.string.isRequired,
    serviceLocation: PropTypes.string.isRequired,
    availability: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    hourlyRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    workExperience: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    createdAt: PropTypes.string.isRequired,
    feedback: PropTypes.shape({
      averageRating: PropTypes.number.isRequired,
      totalReviews: PropTypes.number.isRequired,
      reviews: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserProfileModal;
