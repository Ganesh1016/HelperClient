/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import HeroImage from "../assets/Hero-Image.png";
import { useTranslation } from "react-i18next";

const professions = [
  "maid",
  "babysitter",
  "cook",
  "office worker",
  "tailor",
  "mason",
  "private tutor",
  "electrician",
];

const Hero = () => {
  const { t } = useTranslation();

  const [currentProfessionIndex, setCurrentProfessionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfessionIndex(
        (prevIndex) => (prevIndex + 1) % professions.length
      );
    }, 1000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section md:h-[40rem] sm:h-auto flex flex-col flex-wrap md:flex-row justify-center items-center">
      <div className="details flex flex-col justify-items-start w-[25rem] md:w-[35rem] md:p-0 mt-12 md:mt-0 mr-0 md:mr-20 items-start">
        <h1 className="heading font-poppins w-full text-5xl text-darkPrimary md:text-6xl font-bold md:font-semibold tracking-tight subpixel-antialiased leading-none">
          Looking for a <br />
          <span className="text-primary">
            {professions[currentProfessionIndex]}
          </span>
          ?<br />
          We've got you covered :)
        </h1>
        <p className="hero-text w-80 md:w-[28rem] mt-5 text-lightText">
          {t("hero-page-subtext")}
        </p>
        <button
          type="button"
          className="get-started text-[#fff] font-ctabuttonfont bg-primary rounded-ctabutton md:w-fit h-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 text-center mt-5 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t("hero-section-cta")}
          {/* Get started */}
        </button>
      </div>
      <img
        src={HeroImage}
        alt="Hero Image"
        className="hidden md:block h-auto md:h-full z-0"
      />
    </div>
  );
};

export default Hero;
