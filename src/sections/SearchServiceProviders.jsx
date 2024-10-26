import { useState, useEffect } from "react";
import ServicesSearchResult from "../components/ServicesSearchResult";
import {
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  Checkbox,
} from "@material-tailwind/react";
import { dummyProviders } from "../config";

const SearchServiceProviders = () => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [serviceProviders, setServiceProviders] = useState(dummyProviders);
  const [filteredProviders, setFilteredProviders] = useState(dummyProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const ratings = [1, 2, 3, 4, 5];
  const genders = ["Male", "Female", "Others"];
  const priceRanges = ["< ₹500", "₹500 - ₹1000", "> ₹1000"];

  useEffect(() => {
    const filterProviders = () => {
      const filtered = serviceProviders.filter((provider) => {
        const matchesSearch = provider.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesGender =
          !selectedGender || provider.gender === selectedGender;
        const matchesRatings =
          selectedRatings.length === 0 ||
          selectedRatings.includes(provider.rating);
        const matchesPrice =
          selectedPriceRange === "" ||
          (selectedPriceRange === "< ₹500" && provider.price < 500) ||
          (selectedPriceRange === "₹500 - ₹1000" &&
            provider.price >= 500 &&
            provider.price <= 1000) ||
          (selectedPriceRange === "> ₹1000" && provider.price > 1000);

        return matchesSearch && matchesGender && matchesRatings && matchesPrice;
      });
      setFilteredProviders(filtered);
    };

    filterProviders();
  }, [
    searchTerm,
    selectedGender,
    selectedPriceRange,
    selectedRatings,
    serviceProviders,
  ]);

  const handleCheckboxChange = (value) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(value)
        ? prevRatings.filter((rating) => rating !== value)
        : [...prevRatings, value]
    );
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const toggleFilterModal = () => setIsFilterModalOpen((prev) => !prev);

  return (
    <div className="p-4 w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-indigo-600">
          Search Service Providers
        </h1>
        <IconButton
          onClick={toggleFilterModal}
          color="indigo"
          variant="outlined"
        >
          <svg
            fill="#521782"
            height="20px"
            width="20px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300.906 300.906"
            xmlSpace="preserve"
            stroke="#521782"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M288.953,0h-277c-5.522,0-10,4.478-10,10v49.531c0,5.522,4.478,10,10,10h12.372l91.378,107.397v113.978 c0,3.688,2.03,7.076,5.281,8.816c1.479,0.792,3.101,1.184,4.718,1.184c1.94,0,3.875-0.564,5.548-1.68l49.5-33 c2.782-1.854,4.453-4.977,4.453-8.32v-80.978l91.378-107.397h12.372c5.522,0,10-4.478,10-10V10C298.953,4.478,294.476,0,288.953,0 z M167.587,166.77c-1.539,1.809-2.384,4.105-2.384,6.48v79.305l-29.5,19.666V173.25c0-2.375-0.845-4.672-2.384-6.48L50.585,69.531 h199.736L167.587,166.77z M278.953,49.531h-257V20h257V49.531z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </IconButton>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border rounded-lg focus:border-indigo-600 focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Service Provider Listings with scroll */}
      <div className="max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((provider) => (
          <ServicesSearchResult key={provider._id} provider={provider} />
        ))}
        {filteredProviders.length === 0 && (
          <div className="text-center text-gray-600 col-span-full">
            No service providers match your search criteria.
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <Dialog
        open={isFilterModalOpen}
        handler={toggleFilterModal}
        size="lg"
        className="bg-gray-50"
      >
        <DialogHeader>Filter Options</DialogHeader>
        <DialogBody className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Gender Filter */}
          <div>
            <h3 className="font-semibold mb-2">Gender</h3>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">All Genders</option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Any Price</option>
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Ratings Filter */}
          <div>
            <h3 className="font-semibold mb-2">Ratings</h3>
            <div className="flex flex-wrap gap-3">
              {ratings.map((rating) => (
                <label key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    color="indigo"
                    value={rating}
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleCheckboxChange(rating)}
                  />
                  <span className="text-sm">{`${"⭐".repeat(
                    rating
                  )} & up`}</span>
                </label>
              ))}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default SearchServiceProviders;
