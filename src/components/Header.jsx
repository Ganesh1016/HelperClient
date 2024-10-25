import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownMenu from "./DropDown";
import { useTranslation } from "react-i18next";

const languages = ["Language", "భాష", "भाषा"];

const Header = () => {
  const { t } = useTranslation();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex(
        (prevIndex) => (prevIndex + 1) % languages.length
      );
    }, 3000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, []);

  const languageOptions = [
    { label: "English", lang_code: "en" },
    { label: "Marathi", lang_code: "mr" },
    { label: "Telugu", lang_code: "te" },
  ];

  // Use the useSelector hook to get the currentUser from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);

  const location = useLocation();
  const hideHeader =
    location.pathname === "/sign-up/postjob" ||
    location.pathname === "/sign-up/findjob" ||
    location.pathname === "/sign-up/contractor" ||
    location.pathname === "/signin" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/service-history" ||
    location.pathname === "/dashboard/provider" ||
    location.pathname === "/dashboard/post-job" ||
    location.pathname === "/dashboard/search-job" ||
    location.pathname === "/dashboard/request-service" ||
    location.pathname === "/dashboard/active-services" ||
    location.pathname === "/dashboard/seeker" ||
    location.pathname === "/dashboard/search";

  return (
    <nav
      className="bg-body flex flex-col justify-center  dark:bg-gray-900 h-22 md:h-24 md:w-full border-2 "
      style={hideHeader ? { display: "none" } : {}}
    >
      <div
        className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:p-3 w-full"
        // style={{ border: "2px solid black" }}
      >
        <Link to={"/"}>
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight"
            // style={{ border: "2px solid black" }}
          >
            <span className="text-primary">Help</span>
            <span className="text-darkPrimary">er</span>
          </h1>
        </Link>
        <div
          className="actions flex md:order-2"
          // style={{ border: "2px solid black" }}
        >
          {currentUser ? (
            <Link to={"/dashboard"}>
              <button
                style={{ borderColor: "blue" }}
                type="button"
                className="text-primary bg-body rounded-ctabutton border-primary border-2 focus:ring-4 focus:outline-none mr-4 px-4 py-1.5  text-base font-medium text-center  md:mr-4 h-10 w-30 hidden md:block"
              >
                {t("go-to-dashboard")}
              </button>
            </Link>
          ) : (
            <>
              <Link to={"/sign-up/postjob"}>
                <button
                  style={{ borderColor: "blue" }}
                  type="button"
                  className="text-primary bg-body rounded-ctabutton border-primary border-2 focus:ring-4 focus:outline-none mr-4 px-4 py-1.5  text-base font-medium text-center  md:mr-4 h-10 w-30 hidden md:block"
                >
                  {t("post-job")}
                </button>
              </Link>
              <Link to={"/sign-up/findjob"}>
                <button
                  type="button"
                  className="text-[#fff] font-ctabuttonfont bg-primary rounded-ctabutton hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-base px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10 w-30  hidden md:block"
                >
                  {t("find-job")}
                </button>
              </Link>
              <Link to={"/sign-up/contractor"}>
                <button
                  type="button"
                  className="text-[#fff] font-ctabuttonfont bg-primary rounded-ctabutton hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-base px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-10 w-30  hidden md:block mx-4"
                >
                  {t("find-helpers")}
                </button>
              </Link>
            </>
          )}
          <DropdownMenu
            buttonContent={languages[currentLanguageIndex]}
            options={languageOptions}
            requireLangCode={true}
            dropDownImage={"/icons/language-icon.svg"}
            dropDownImageAlt={"Language icon"}
          />
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            onClick={handleMobileMenuToggle}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul
            className="navigation flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:w-[100%]"
            // style={{ border: "2px solid black" }}
          >
            <li>
              <Link to={"/sign-up/postjob"}>
                <button
                  style={{ borderColor: "blue" }}
                  type="button"
                  className="text-primary bg-body rounded-ctabutton border-primary border-2 focus:ring-4 focus:outline-none mr-4 px-4 py-1.5  text-base font-medium text-center  md:mr-4 h-10 w-30 md:hidden"
                >
                  {t("post-job")}
                </button>
              </Link>
            </li>
            <li>
              <Link to={"/sign-up/findjob"}>
                <button
                  type="button"
                  className="text-[#fff] font-ctabuttonfont bg-primary rounded-ctabutton hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-base px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3 h-10 w-30  md:hidden"
                >
                  {t("find-job")}
                </button>
              </Link>
            </li>
            <li>
              <Link to={"/sign-up/contractor"}>
                <button
                  type="button"
                  className="text-[#fff] font-ctabuttonfont bg-primary rounded-ctabutton hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-base px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3 h-10 w-30  md:hidden"
                >
                  {t("find-helpers")}
                </button>
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="block text-lightText hover:text-darkPrimary py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                to={"/pricing"}
                className="block text-lightText py-2 pl-3 pr-4 rounded hover:text-darkPrimary md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {t("pricing")}
              </Link>
            </li>
            <li>
              <Link
                to={"/contactus"}
                className="block text-lightText hover:text-darkPrimary py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link
                to={"/businesspolicy"}
                className="block text-lightText hover:text-darkPrimary py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {t("business-policy")}
              </Link>
            </li>
            {/* <li>
              <Link
                to={"/dashboard"}
                className="block text-lightText hover:text-darkPrimary py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Dashboard{" "}
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
