import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const ServicesSearchResult = ({ provider }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    provider.profilePicture || "https://via.placeholder.com/100"
  );

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleContactClick = () => {
    window.location.href = `tel:${provider.contactNumber}`;
  };

  useEffect(() => {
    if (!provider.profilePicture) {
      const fetchProfileImage = async () => {
        try {
          // Use gender in the search query
          const genderQuery =
            provider.gender.toLowerCase() === "female"
              ? "Indian woman"
              : "Indian man";
          const response = await fetch(
            `https://api.pexels.com/v1/search?query=${genderQuery}&per_page=1&orientation=portrait&page=${provider._id}`, // Use provider ID as page seed for unique results
            {
              headers: {
                Authorization:
                  "FHqFgsMVDtpd3nNhH11V4JdEb7dxBMiH7wmEleEI9LuifOD2jMTQLyrQ", // Replace with your actual API key
              },
            }
          );

          if (!response.ok) {
            console.error(
              `Error fetching profile image: ${response.statusText} (status: ${response.status})`
            );
            return;
          }

          const data = await response.json();
          if (data.photos && data.photos.length > 0) {
            setProfileImage(data.photos[0].src.medium);
            console.log(
              "Profile image fetched successfully:",
              data.photos[0].src.medium
            );
          } else {
            console.warn("No photos found in the Pexels API response.");
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      };

      fetchProfileImage();
    }
  }, [provider.profilePicture, provider.gender, provider._id]);

  return (
    <>
      {/* Provider Card */}
      <div
        className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105"
        onClick={toggleDialog}
      >
        {/* Profile Picture */}
        <div className="w-24 h-24 mb-3">
          <img
            src={profileImage}
            alt={`${provider.name}'s profile`}
            className="w-full h-full rounded-full object-cover shadow-md"
          />
        </div>

        {/* Provider Information */}
        <h2 className="text-lg font-semibold text-gray-900">{provider.name}</h2>
        <p className="text-sm text-gray-500">{provider.gender}</p>

        {/* Ratings */}
        <div className="flex items-center justify-center mt-1 text-yellow-400">
          {"⭐".repeat(provider.rating)}
          <span className="ml-1 text-gray-500 text-sm">{`(${provider.rating})`}</span>
        </div>

        {/* Price */}
        <p className="mt-2 text-indigo-600 font-bold">₹{provider.price}/hr</p>
      </div>

      {/* Profile Dialog */}
      <Dialog open={isDialogOpen} handler={toggleDialog} size="lg">
        <DialogHeader>{`${provider.name}'s Profile`}</DialogHeader>
        <DialogBody>
          <div className="flex flex-col items-center text-center">
            {/* Profile Picture */}
            <img
              src={profileImage}
              alt={`${provider.name}'s profile`}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            {/* Profile Information */}
            <h2 className="text-xl font-bold">{provider.name}</h2>
            <p className="text-gray-500">{provider.gender}</p>
            <p className="text-gray-500 mt-1">{provider.location}</p>
            <p className="text-indigo-600 font-bold mt-2">
              ₹{provider.price}/hr
            </p>

            {/* Ratings */}
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 mr-1">
                {"⭐".repeat(provider.rating)}
              </span>
              <span className="text-gray-500 text-sm">({provider.rating})</span>
            </div>

            {/* Past Work */}
            <div className="mt-4 w-full">
              <h3 className="font-semibold text-lg mb-2">Past Work</h3>
              <ul className="list-disc list-inside text-left text-gray-600">
                {provider.pastWork.map((work, index) => (
                  <li key={index}>{work}</li>
                ))}
              </ul>
            </div>

            {/* Feedback & Reviews */}
            <div className="mt-4 w-full">
              <h3 className="font-semibold text-lg mb-2">Feedback & Reviews</h3>
              <ul className="list-disc list-inside text-left text-gray-600">
                {provider.reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleDialog}
            className="mr-2"
          >
            Close
          </Button>
          <Button
            color="green"
            onClick={handleContactClick}
            className="bg-indigo-600 text-white"
          >
            Contact Now
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

ServicesSearchResult.propTypes = {
  provider: PropTypes.shape({
    profilePicture: PropTypes.string,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.string,
    contactNumber: PropTypes.string.isRequired,
    pastWork: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ServicesSearchResult;
