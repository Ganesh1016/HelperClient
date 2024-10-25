import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import CustomMarker from "../components/CustomMarker";
import "../../node_modules/leaflet/dist/leaflet.css";
import "../index.css";

const generateNeighboringLocations = async (center, numLocations) => {
  const result = [];
  try {
    for (let i = 0; i < numLocations; i++) {
      const randomLat = center.lat + (Math.random() - 0.5) / 100;
      const randomLng = center.lng + (Math.random() - 0.5) / 100;

      // Fetch random user profile from RandomAPI
      const userProfile = await getRandomUserProfile();

      result.push({
        id: i + 1,
        user: {
          name: userProfile.name,
          age: userProfile.age,
          profileImage: userProfile.profileImage,
        },
        lat: randomLat,
        lng: randomLng,
      });
    }
  } catch (error) {
    console.error("Error generating neighboring locations:", error);
  }
  return result;
};

const getRandomUserProfile = async () => {
  try {
    // Make a request to RandomAPI to get a random user profile
    const response = await axios.get("https://randomuser.me/api/");
    const userData = response.data.results[0];

    return {
      name: `${userData.name.first} ${userData.name.last}`,
      age: userData.dob.age,
      profileImage: userData.picture.thumbnail,
    };
  } catch (error) {
    console.error("Error fetching random user profile:", error);
    // Return a default profile if an error occurs
    return {
      name: "Default User",
      age: 25,
      profileImage: "https://placekitten.com/50/50", // Example image URL
    };
  }
};

CustomMarker.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
};

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [neighboringPositions, setNeighboringPositions] = useState([]);
  const map = useMap();

  useEffect(() => {
    // Fetch user location
    map.locate().on("locationfound", async (e) => {
      const userPosition = e.latlng;
      setPosition(userPosition);
      map.flyTo(userPosition, map.getZoom());

      // Generate neighboring positions
      const neighbors = await generateNeighboringLocations(userPosition, 10);
      setNeighboringPositions(neighbors);
    });
  }, [map]);

  const mainUserProfile = {
    name: "Ganesh Gajelly",
    age: 21,
    profileImage: "../../mypic.png", // Example image URL
    // Add more details as needed
  };

  return (
    <>
      {position && (
        <CustomMarker
          position={[position.lat, position.lng]}
          user={mainUserProfile}
        />
      )}
      {neighboringPositions.map((neighbor) => (
        <CustomMarker
          key={neighbor.id}
          position={[neighbor.lat, neighbor.lng]} // Ensure position is in [lat, lng] format
          user={neighbor.user}
        />
      ))}
    </>
  );
}

const DynamicMap = () => {
  const [initialPosition, setInitialPosition] = useState([0, 0]);

  useEffect(() => {
    // Fetch initial user location and set it as the initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInitialPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  }, []);
  const results = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div
      className="dynamic-map flex flex-col items-center mt-5 p-3"
      // style={{ border: "2px solid black" }}
    >
      <div
        className="search-container flex items-center justify-center h-20 md:h-20 rounded-3xl w-full md:w-2/5 border border-solid border-lightText"
        // style={{ border: "2px solid black" }}
      >
        <form
          action=""
          className="flex justify-evenly items-center w-full h-full"
          //   style={{ border: "2px solid black" }}
        >
          <div
            className="search-bar flex flex-row md:w-3.8/5 h-full md:h-3/5 items-center justify-center md:border md:border-lightText md:rounded-2xl"
            // style={{ border: "2px solid black" }}
          >
            <input
              type="text"
              name=""
              placeholder="I am looking for a 'maid'"
              id="service-search"
              className="border md:border-hidden h-3/5 md:h-full md:w-80 mr-2 rounded-xl pl-3 md:ml-1 outline-none"
              //   style={{ border: "2px solid black" }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden md:block h-4 w-4 mr-3"
              viewBox="0 0 385 385"
              fill="none"
            >
              <path
                d="M377.813 347.52L305.28 275.2C328.682 245.386 341.381 208.569 341.333 170.667C341.333 136.912 331.324 103.915 312.571 75.8494C293.818 47.7834 267.163 25.9087 235.978 12.9913C204.793 0.0739466 170.477 -3.30582 137.371 3.27939C104.265 9.8646 73.8554 26.119 49.9872 49.9872C26.119 73.8554 9.8646 104.265 3.27939 137.371C-3.30582 170.477 0.0739466 204.793 12.9913 235.978C25.9087 267.163 47.7834 293.818 75.8494 312.571C103.915 331.324 136.912 341.333 170.667 341.333C208.569 341.381 245.386 328.682 275.2 305.28L347.52 377.813C349.503 379.813 351.863 381.4 354.462 382.483C357.062 383.566 359.851 384.124 362.667 384.124C365.483 384.124 368.271 383.566 370.871 382.483C373.471 381.4 375.83 379.813 377.813 377.813C379.813 375.83 381.4 373.471 382.483 370.871C383.566 368.271 384.124 365.483 384.124 362.667C384.124 359.851 383.566 357.062 382.483 354.462C381.4 351.863 379.813 349.503 377.813 347.52ZM42.6667 170.667C42.6667 145.351 50.1738 120.603 64.2386 99.5538C78.3035 78.5043 98.2943 62.0982 121.683 52.4102C145.072 42.7221 170.809 40.1873 195.638 45.1262C220.468 50.0651 243.275 62.256 261.176 80.1571C279.078 98.0582 291.268 120.866 296.207 145.695C301.146 170.525 298.611 196.261 288.923 219.65C279.235 243.039 262.829 263.03 241.78 277.095C220.73 291.16 195.983 298.667 170.667 298.667C136.719 298.667 104.162 285.181 80.1571 261.176C56.1524 237.172 42.6667 204.614 42.6667 170.667Z"
                fill="#5F5C5C"
              />
            </svg>
            <button
              type="submit"
              className="px-3 py-2 h-11 w-12 text-lg font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-xl bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-sm"
                viewBox="0 0 385 385"
                fill="none"
              >
                <path
                  d="M377.813 347.52L305.28 275.2C328.682 245.386 341.381 208.569 341.333 170.667C341.333 136.912 331.324 103.915 312.571 75.8494C293.818 47.7834 267.163 25.9087 235.978 12.9913C204.793 0.0739466 170.477 -3.30582 137.371 3.27939C104.265 9.8646 73.8554 26.119 49.9872 49.9872C26.119 73.8554 9.8646 104.265 3.27939 137.371C-3.30582 170.477 0.0739466 204.793 12.9913 235.978C25.9087 267.163 47.7834 293.818 75.8494 312.571C103.915 331.324 136.912 341.333 170.667 341.333C208.569 341.381 245.386 328.682 275.2 305.28L347.52 377.813C349.503 379.813 351.863 381.4 354.462 382.483C357.062 383.566 359.851 384.124 362.667 384.124C365.483 384.124 368.271 383.566 370.871 382.483C373.471 381.4 375.83 379.813 377.813 377.813C379.813 375.83 381.4 373.471 382.483 370.871C383.566 368.271 384.124 365.483 384.124 362.667C384.124 359.851 383.566 357.062 382.483 354.462C381.4 351.863 379.813 349.503 377.813 347.52ZM42.6667 170.667C42.6667 145.351 50.1738 120.603 64.2386 99.5538C78.3035 78.5043 98.2943 62.0982 121.683 52.4102C145.072 42.7221 170.809 40.1873 195.638 45.1262C220.468 50.0651 243.275 62.256 261.176 80.1571C279.078 98.0582 291.268 120.866 296.207 145.695C301.146 170.525 298.611 196.261 288.923 219.65C279.235 243.039 262.829 263.03 241.78 277.095C220.73 291.16 195.983 298.667 170.667 298.667C136.719 298.667 104.162 285.181 80.1571 261.176C56.1524 237.172 42.6667 204.614 42.6667 170.667Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="hidden md:block text-[#fff] font-ctabuttonfont bg-primary rounded-ctabutton md:w-32 h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            // style={{ border: "2px solid black" }}
          >
            Search
          </button>
        </form>
      </div>
      <div
        className="map-container w-full h-[40vh] md:h-[60vh] flex flex-row mt-3"
        // style={{ border: "2px solid black" }}
      >
        {/* <div
          className="provider-contacts hidden md:block md:w-[30%] md:h-full overflow-auto"
          style={{ border: "2px solid black" }}
        >
          {results.map((index) => (
            <div
              key={index}
              className="map-user-contacts w-full h-16"
              style={{ border: "2px solid black" }}
            >
              Contact {index}
            </div>
          ))}
        </div> */}
        <div className="map-container h-full w-full md:w-[100%]">
          <MapContainer
            // center={[18.96, 72, 82]}
            center={initialPosition}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default DynamicMap;
