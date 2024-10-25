import PropTypes from "prop-types";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css"; // Ensure leaflet.css is imported

const CustomMarker = ({ position, user }) => {
  const createRoundedIcon = (imageUrl) => {
    const div = document.createElement("div");
    div.style.width = "60px";
    div.style.height = "60px";
    div.style.borderRadius = "50%";
    div.style.overflow = "hidden";
    div.style.border = "3px solid white";
    div.className = "map-profile";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.width = "100%";
    img.style.height = "100%";

    div.appendChild(img);
    return L.divIcon({ html: div.outerHTML });
  };

  const customIcon = createRoundedIcon(user.profileImage);

  const leafletPosition = L.latLng(position);

  return (
    <Marker position={leafletPosition} icon={customIcon}>
      <Popup>
        <div
          className="w-full h-auto flex flex-row items-center"
          style={{ fontFamily: "poppins" }}
          // style={{ border: "2px solid black" }}
        >
          <img
            src={user.profileImage}
            alt={`${user.name}'s profile`}
            className=" h-[50px] rounded-full"
          />
          <div
            className="map-user-details mx-3 flex flex-col justify-between w-40"
            // style={{ border: "2px solid black" }}
          >
            <h3 className="mt-1 ">
              <b>{user.name}</b>
            </h3>
            <h4>Developer</h4>
          </div>
          <button className=" bg-primary text-body w-28 h-8 rounded-xl text-center items-center justify-center">
            Call
          </button>
          {/* Add more user profile information here */}
        </div>
      </Popup>
    </Marker>
  );
};

CustomMarker.propTypes = {
  position: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number), // Expecting an array [lat, lng]
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }), // Expecting an object { lat: number, lng: number }
  ]).isRequired,
  user: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomMarker;
