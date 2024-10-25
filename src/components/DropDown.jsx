import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import i18n from "i18next";

const DropdownMenu = ({
  buttonContent,
  options,
  dropDownImage,
  dropDownImageAlt,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (langCode) => {
    // Handle language select here
    i18n.changeLanguage(langCode);
    console.log("Selected language:", langCode);
    setIsOpen(false); // Close the dropdown after language select
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className=" flex flex-row">
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex justify-evenly w-full rounded-2xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ml-3 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <img
            src={dropDownImage}
            alt={dropDownImageAlt}
            className=" w-[20px] h-[20px]"
          />
          {buttonContent}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <a
                key={option.lang_code}
                onClick={() => handleLanguageSelect(option.lang_code)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900  cursor-pointer"
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${index}`}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DropdownMenu.propTypes = {
  buttonContent: PropTypes.node.isRequired,
  dropDownImage: PropTypes.string.isRequired,
  dropDownImageAlt: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      lang_code: (props, propName, componentName) => {
        if (!props[propName] && props.requireLangCode) {
          return new Error(
            `The prop '${propName}' is required in '${componentName}', but it was not provided in one of the options.`
          );
        }
      },
    })
  ).isRequired,
  requireLangCode: PropTypes.bool, // Add this prop to specify if lang_code is required or not
};

export default DropdownMenu;
