// ServicesSearchResult.jsx
import PropTypes from "prop-types";

const ServicesSearchResult = ({ provider }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md p-4 bg-white flex flex-row  justify-evenly">
      {/* Profile Picture */}
      <img
        src={provider.profilePicture || "https://via.placeholder.com/100"}
        alt={`${provider.name}'s profile`}
        className="w-12 h-12 rounded-full object-cover mb-3"
      />
      <div className="flex flex-col gap-2 justify-start items-start">
        {/* Provider Information */}
        <h2 className="text-lg font-semibold text-gray-900">{provider.name}</h2>
        <p className="text-sm text-gray-500">{provider.gender}</p>
      </div>
      {/* Ratings */}
      {/* <div className="flex items-center mt-1">
        <span className="text-yellow-400 mr-1">
          {"⭐".repeat(provider.rating)}
        </span>
        <span className="text-gray-500 text-sm">{`(${provider.rating})`}</span>
      </div> */}

      {/* Price */}
      <p className="mt-2 text-indigo-600 font-bold">₹{provider.price}/hr</p>
    </div>
  );
};

ServicesSearchResult.propTypes = {
  provider: PropTypes.shape({
    profilePicture: PropTypes.string,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ServicesSearchResult;
