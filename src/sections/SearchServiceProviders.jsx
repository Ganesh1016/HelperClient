import { useState, useEffect } from "react";
import ServicesSearchResult from "../components/ServicesSearchResult";

const SearchServiceProviders = () => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/service-providers"
        );
        const data = await response.json();
        // console.log(data);
        setServiceProviders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Maid" },
    { id: 3, name: "Cook" },
    { id: 4, name: "Housekeeper" },
    { id: 5, name: "Back-office worker" },
    { id: 6, name: "Personal Assitant" },
    { id: 7, name: "Data entry" },
    { id: 8, name: "Baby sister" },
    { id: 9, name: "Store assistant" },
    // Add more categories as needed
  ];

  // Search by ratings functionality

  const ratings = [
    { id: 1, name: "⭐" },
    { id: 2, name: "⭐⭐" },
    { id: 3, name: "⭐⭐⭐" },
    { id: 4, name: "⭐⭐⭐⭐" },
    { id: 5, name: "⭐⭐⭐⭐⭐" },
  ];

  const handleCheckboxChange = (value) => {
    const index = selectedRatings.indexOf(value);

    if (index === -1) {
      // Rating not in the list, add it
      setSelectedRatings([...selectedRatings, value]);
    } else {
      // Rating already in the list, remove it
      const updatedRatings = [...selectedRatings];
      updatedRatings.splice(index, 1);
      setSelectedRatings(updatedRatings);
    }
  };

  // useEffect(() => {
  //   const fetchDataBasedOnRatings = async () => {
  //     try {
  //       // Construct the API endpoint with selected ratings as query parameters
  //       const apiUrl = `https://helper-two.vercel.app/api/your-endpoint?ratings=${selectedRatings.join(
  //         ","
  //       )}`;

  //       const response = await fetch(apiUrl);
  //       const data = await response.json();

  //       // Handle the fetched data as needed
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchDataBasedOnRatings();
  // }, [selectedRatings]);

  // const [selectedFilters, setSelectedFilters] = useState([]);

  // const handleCheckboxChange = (categoryId) => {
  //   // Handle checkbox change if needed
  //   console.log(`Checkbox with id ${categoryId} changed`);
  //   // For now, just toggle the selected filters
  //   setSelectedFilters((prevFilters) => {
  //     if (prevFilters.includes(categoryId)) {
  //       return prevFilters.filter((filter) => filter !== categoryId);
  //     } else {
  //       return [...prevFilters, categoryId];
  //     }
  //   });
  // };

  // const handleClearAll = () => {
  //   // Clear all selected filters
  //   setSelectedFilters([]);
  // };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="services-table w-full h-full"
      // style={{ border: "2px solid black" }}
    >
      <div
        className="filters-row w-full flex flex-row"
        // style={{ border: "2px solid black" }}
      >
        <form
          className="flex items-center w-2/6"
          id="services-search"
          // style={{ border: "2px solid black" }}
        >
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search services..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium bg-primary text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4 text-body"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        {/* Category dropdown button */}
        <button
          id="dropdownCategoryBgHoverButton"
          data-dropdown-toggle="dropdownCategoryBgHover"
          className="text-darkPrimary bg-[#fff] border-[#2f2c2c] shadow-sm focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Category
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Category dropdown div */}
        <div
          id="dropdownCategoryBgHover"
          className="z-10 hidden w-48 h-64 overflow-auto bg-body rounded-lg shadow dark:bg-gray-700"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownCategoryBgHoverButton"
          >
            {categories.map((category) => (
              <li
                key={category.id}
                className="hover:bg-[#e7e7e7] cursor-pointer"
              >
                <div className="flex items-center p-2 rounded cursor-pointer dark:hover:bg-gray-600">
                  <input
                    id={`checkbox-item-${category.id}`}
                    type="checkbox"
                    value={category.name}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    // onChange={() => handleCheckboxChange(category.id)}
                  />
                  <label
                    htmlFor={`checkbox-item-${category.id}`}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          {/* <button className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-fit bg-alert text-white p-2 rounded-lg focus:outline-none">
            Clear all
          </button> */}
        </div>

        {/* Ratings dropdown button */}
        <button
          id="dropdownRatingsBgHoverButton"
          data-dropdown-toggle="dropdownRatingsBgHover"
          className="text-darkPrimary bg-[#fff] border-[#2f2c2c] shadow-sm focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Ratings
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Ratings dropdown div */}
        <div
          id="dropdownRatingsBgHover"
          className="z-10 hidden w-48 h-64 overflow-auto bg-body rounded-lg shadow dark:bg-gray-700"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownRatingsBgHoverButton"
          >
            {ratings.map((rating) => (
              <li key={rating.id} className="hover:bg-[#e7e7e7] cursor-pointer">
                <div className="flex items-center p-2 rounded cursor-pointer dark:hover:bg-gray-600">
                  <input
                    id={`checkbox-item-${rating.id}`}
                    type="checkbox"
                    value={rating.name}
                    checked={selectedRatings.includes(rating.name)}
                    onChange={() => handleCheckboxChange(rating.name)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`checkbox-item-${rating.id}`}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                  >
                    {rating.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing dropdown button */}
        <button
          id="dropdownPricingBgHoverButton"
          data-dropdown-toggle="dropdownPricingBgHover"
          className="text-darkPrimary bg-[#fff] border-[#2f2c2c] shadow-sm focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Pricing
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Category dropdown div */}
        <div
          id="dropdownPricingBgHover"
          className="z-10 hidden w-48 h-64 overflow-auto bg-body rounded-lg shadow dark:bg-gray-700"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownPricingBgHoverButton"
          >
            {categories.map((category) => (
              <li
                key={category.id}
                className="hover:bg-[#e7e7e7] cursor-pointer"
              >
                <div className="flex items-center p-2 rounded cursor-pointer dark:hover:bg-gray-600">
                  <input
                    id={`checkbox-item-${category.id}`}
                    type="checkbox"
                    value={category.name}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    // onChange={() => handleCheckboxChange(category.id)}
                  />
                  <label
                    htmlFor={`checkbox-item-${category.id}`}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          {/* <button className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-fit bg-alert text-white p-2 rounded-lg focus:outline-none">
            Clear all
          </button> */}
        </div>

        {/* Gender dropdown button */}
        <button
          id="dropdownGenderBgHoverButton"
          data-dropdown-toggle="dropdownGenderBgHover"
          className="text-darkPrimary bg-[#fff] border-[#2f2c2c] shadow-sm focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Gender
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Gender dropdown div */}
        <div
          id="dropdownGenderBgHover"
          className="z-10 hidden w-48 h-64 overflow-auto bg-body rounded-lg shadow dark:bg-gray-700"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownGenderBgHoverButton"
          >
            {categories.map((category) => (
              <li
                key={category.id}
                className="hover:bg-[#e7e7e7] cursor-pointer"
              >
                <div className="flex items-center p-2 rounded cursor-pointer dark:hover:bg-gray-600">
                  <input
                    id={`checkbox-item-${category.id}`}
                    type="checkbox"
                    value={category.name}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    // onChange={() => handleCheckboxChange(category.id)}
                  />
                  <label
                    htmlFor={`checkbox-item-${category.id}`}
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          {/* <button className="absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-fit bg-alert text-white p-2 rounded-lg focus:outline-none">
            Clear all
          </button> */}
        </div>
      </div>

      {/* Search results container */}
      <div
        className="search-results pt-3 h-full flex flex-col items-center overflow-scroll pb-2 mt-2"
        // style={{ border: "2px solid black" }}
      >
        {serviceProviders.map((provider) => (
          <ServicesSearchResult key={provider._id} provider={provider} />
        ))}
      </div>
    </div>
  );
};

export default SearchServiceProviders;
