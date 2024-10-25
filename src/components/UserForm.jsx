import { API_BASE_URL } from "../apiConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
// import { Button, Modal } from "flowbite-react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

const UserForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  // const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    gender: "",
    homeAddress: "",
    profilePicture: "",
    serviceCategory: "",
    serviceLocation: "",
    availability: "",
    hourlyRate: "",
    workExperience: "",
    countryCode: "+91",
    phoneNumber: "",
    otp: "",
  });

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return [
          "fullname",
          "email",
          "gender",
          "age",
          "homeAddress",
          "profilePicture",
        ];
      case 2:
        return [
          "serviceCategory",
          "serviceLocation",
          "availability",
          "hourlyRate",
          "workExperience",
        ];
      case 3:
        return ["phoneNumber", "otp"];
      default:
        return [];
    }
  };

  const handleNext = () => {
    // const currentStepFields = getFieldsForStep(currentStep);
    // // const { name, value } = e.target;
    // for (const field of currentStepFields) {
    //   if (!formData[field]) {
    //     // Display an error message or take appropriate action
    //     toast.error(`Please fill in the ${field} field before proceeding.`);
    //     return; // Stop the function if any required field is missing
    //   }
    // }

    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Additional validation for the fullname field (allowing spaces)
    if (name === "fullname" && !/^[a-zA-Z\s]+$/.test(formData[name])) {
      toast.error("Full name should contain only letters and spaces.");
      return; // Stop the function if the fullname contains other characters
    }
    // Additional validation for the email field
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(formData[name])) {
      toast.error("Please enter a valid email address.");
      return; // Stop the function if the email format is invalid
    }
    // Additional validation for the age field (allowing only numbers)
    if (name === "age" && !/^\d*$/.test(value)) {
      toast.error("Age should contain only numerical digits.");
      return; // Stop the function if the age contains non-numeric characters
    }
    if (name === "hourlyRate" && !/^\d*$/.test(value)) {
      toast.error("Please share only number of hours.");
      return; // Stop the function if the age contains non-numeric characters
    }
    // Additional validation for the serviceLocation field (allowing spaces)
    if (name === "serviceLocation" && !/^[a-zA-Z\s]+$/.test(formData[name])) {
      toast.error("Please share only letters and spaces.");
      return; // Stop the function if the serviceLocation contains other characters
    }
    if (name === "workExperience" && !/^\d*$/.test(value)) {
      toast.error("Please share only number of years of work experience.");
      return; // Stop the function if the work experience contains non-numeric characters
    }
    if (name === "availability" && !/^\d*$/.test(value)) {
      toast.error(
        "Please share only number of hours you are available to work in a day."
      );
      return; // Stop the function if the age contains non-numeric characters
    }
    // Additional validation for the phone number field
    if (
      name === "phoneNumber" &&
      (!/^\d+$/.test(formData[name]) || value.length !== 10)
    ) {
      toast.error("Phone number should contain only 10 numerical characters.");
      return; // Stop the function if the phone number contains non-numerical characters or is not 10 digits
    }
  };

  // const appVerifier = window.recaptchaVerifier;
  const sendOtp = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          "size ": "normal",
          callback: () => {},
          "expired-callback": () => {
            toast.error("reCAPTCHA response expired. Please solve it again.");
          },
        }
      );
      recaptchaVerifier.render();
      return signInWithPhoneNumber(
        auth,
        `${formData.countryCode}${formData.phoneNumber}`,
        recaptchaVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.error("Cannot send SMS", error);
          toast.error("Cannot send SMS", error);
        });
    } catch (error) {
      console.log(error);
    }

    console.log(`${formData.countryCode}${formData.phoneNumber}`);
  };

  const verifyOtp = async () => {
    window.confirmationResult
      .confirm(formData.otp)
      .then((result) => {
        // User signed in successfully
        const user = result.user;
        toast.success("OTP matched!");
        console.log("(Firebase) User signed in successfully:", user);
        // Additional actions after successful sign-in
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        toast.error("Incorrect OTP");
        console.error("Incorrect OTP");
        console.error("Error verifying OTP:", error);
      });
  };

  const saveFormDataToDatabase = async (formData) => {
    try {
      const fileData = new FormData();
      fileData.append("profilePicture", formData.profilePicture);

      const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: fileData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`File upload failed! Status ${uploadResponse.status}`);
      }

      const { fileUrl } = await uploadResponse.json();

      const updatedFormData = { ...formData, profilePicture: fileUrl };

      const saveResponse = await fetch(`${API_BASE_URL}/save-providers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!saveResponse.ok) {
        throw new Error(`Data save failed! Status ${saveResponse.status}`);
      }

      console.log("Saved data successfully!");
      toast.success("Your data was saved successfully!");
    } catch (error) {
      toast.error("Something went wrong.");
      navigate("/error");
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // toast.success("Your data was saved successfully.");
    await saveFormDataToDatabase(formData);
    console.log("(Mongo) Form submitted:", formData);
    // setOpenModal(true);

    // navigate("/signin");
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="personal-details flex flex-wrap w-full gap-4 p-4">
            {/* Column 1 */}
            <div className="w-full md:w-1/2 p-2">
              <label>
                <input
                  type="text"
                  name="fullname"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full sm:w-[400px] md:w-[500px] lg:w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  name="age"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                <textarea
                  name="homeAddress"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-24 resize-none"
                  placeholder="Home Address"
                  value={formData.homeAddress}
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/2 p-2 flex flex-col">
              <label className="w-full">
                <select
                  name="gender"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </label>

              {/* Next Button */}
              <div
                className="mt-4 self-end w-28 h-10 bg-primary rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handleNext}
              >
                <button className="text-white">Next</button>
                <img
                  src="/icons/next.svg"
                  alt="Next"
                  className="w-4 h-4 ml-2"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="professional-details flex flex-wrap w-full gap-4 p-4">
            {/* Column 1 */}
            <div className="w-full md:w-1/2 p-2">
              <label className="block mb-4">
                <select
                  name="serviceCategory"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Service Category
                  </option>
                  <option value="Maid">Maid</option>
                  <option value="Cook">Cook</option>
                </select>
              </label>

              <label className="block mb-4">
                <input
                  type="text"
                  name="serviceLocation"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  value={formData.serviceLocation}
                  onChange={handleChange}
                  placeholder="Service Location:"
                />
              </label>

              <label className="block mb-4">
                <input
                  type="text"
                  name="availability"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="Availability (e.g., 3 hours/day):"
                />
              </label>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/2 p-2">
              <label className="block mb-4">
                <input
                  type="text"
                  name="hourlyRate"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="Hourly Rate (e.g., Rs.200):"
                />
              </label>

              <label className="block mb-4">
                <input
                  type="text"
                  name="workExperience"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
                  value={formData.workExperience}
                  onChange={handleChange}
                  placeholder="Work Experience (e.g., 2 years):"
                />
              </label>
            </div>

            {/* Buttons Container */}
            <div className="flex justify-between w-full mt-4">
              <div
                className="bg-primary w-24 md:w-28 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handlePrev}
              >
                <button className="text-white flex items-center gap-2">
                  <svg
                    id="prev-icon"
                    width="7px"
                    height="12px"
                    viewBox="0 0 7 12"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "" }}
                  >
                    <title>navigate_next</title>
                    <desc>Created with Sketch.</desc>
                    <g
                      id="Icons"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Rounded"
                        transform="translate(-619.000000, -2862.000000)"
                      >
                        <g
                          id="Image"
                          transform="translate(100.000000, 2626.000000)"
                        >
                          <g
                            id="-Round-/-Image-/-navigate_next"
                            transform="translate(510.000000, 230.000000)"
                          >
                            <g>
                              <polygon
                                id="Path"
                                points="0 0 24 0 24 24 0 24"
                              ></polygon>
                              <path
                                d="M9.31,6.71 C8.92,7.1 8.92,7.73 9.31,8.12 L13.19,12 L9.31,15.88 C8.92,16.27 8.92,16.9 9.31,17.29 C9.7,17.68 10.33,17.68 10.72,17.29 L15.31,12.7 C15.7,12.31 15.7,11.68 15.31,11.29 L10.72,6.7 C10.34,6.32 9.7,6.32 9.31,6.71 Z"
                                id="🔹-Icon-Color"
                                fill="#ffffff"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Previous
                </button>
              </div>

              <div
                className="bg-primary w-24 md:w-28 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handleNext}
              >
                <button className="text-white flex items-center gap-2">
                  Next
                  <img src="/icons/next.svg" alt="next" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div
            className="otp-verification flex flex-wrap flex-col items-center justify-center mt-10"
            // style={{ border: "2px solid black" }}
          >
            <div
              className="contact-number flex flex-row md:w-2/5"
              // style={{ border: "2px solid black" }}
            >
              <input
                type="text"
                name="countryCode"
                className="border border-lightText border-r-0 text-md rounded-lg focus:border-primary focus:border-2 block w-1/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none md:w-1/5 md:h-12"
                value={formData.countryCode}
                disabled
              />
              <input
                type="text"
                name="phoneNumber"
                className="border border-lightText text-md rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none md:w-full text-center  md:h-12"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <h6
              className=" cursor-pointer underline mt-3 text-primary"
              id="sign-in-button"
              onClick={sendOtp}
            >
              Verify with SMS
            </h6>
            <div id="recaptcha-container" className="mt-4"></div>
            <br />
            <div
              className="otp flex flex-row w-full md:w-2/5 items-center justify-center"
              // style={{ border: "2px solid black" }}
            >
              <input
                type="number"
                name="otp"
                className="border border-lightText text-md rounded-lg focus:border-primary focus:border-2 block text-center tracking-widest placeholder:tracking-normal p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none w-4/5  md:h-12"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              <button
                className="bg-primary text-center w-12 h-12 rounded-lg text-white cursor-pointer justify-center items-center ml-2"
                type="submit"
                onClick={verifyOtp}
              >
                <svg
                  viewBox="0 -0.5 25 25"
                  className="w-[80%] h-[80%] ml-0.5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="0.2"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M5.5 12.5L10.167 17L19.5 8"
                      stroke="#ffffff"
                      strokeWidth="1.4000000000000001"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div
              className="actions w-full flex flex-row items-center justify-center align-baseline"
              // style={{ border: "2px solid black" }}
            >
              {/* {Previos button} */}
              <div
                className="next bg-primary w-24 md:w-28 md:h-10 h-10 rounded-lg flex flex-row justify-evenly items-baseline cursor-pointer relative ml-2 mt-2"
                onClick={handlePrev}
                // style={{ border: "2px solid black" }}
              >
                <svg
                  id="prev-icon"
                  width="7px"
                  height="12px"
                  viewBox="0 0 7 12"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "" }}
                >
                  <title>navigate_next</title>
                  <desc>Created with Sketch.</desc>
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      id="Rounded"
                      transform="translate(-619.000000, -2862.000000)"
                    >
                      <g
                        id="Image"
                        transform="translate(100.000000, 2626.000000)"
                      >
                        <g
                          id="-Round-/-Image-/-navigate_next"
                          transform="translate(510.000000, 230.000000)"
                        >
                          <g>
                            <polygon
                              id="Path"
                              points="0 0 24 0 24 24 0 24"
                            ></polygon>
                            <path
                              d="M9.31,6.71 C8.92,7.1 8.92,7.73 9.31,8.12 L13.19,12 L9.31,15.88 C8.92,16.27 8.92,16.9 9.31,17.29 C9.7,17.68 10.33,17.68 10.72,17.29 L15.31,12.7 C15.7,12.31 15.7,11.68 15.31,11.29 L10.72,6.7 C10.34,6.32 9.7,6.32 9.31,6.71 Z"
                              id="🔹-Icon-Color"
                              fill="#ffffff"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <button
                  className=" w-16 h-full text-[#fff]"
                  // style={{ border: "2px solid black" }}
                >
                  Previous
                </button>
              </div>
              {/* Submit button */}
              <div
                className=" bg-primary w-24 md:w-28 md:h-10 h-10 rounded-lg flex flex-row justify-evenly items-baseline cursor-pointer relative mr-2 mt-2 ml-auto"

                // style={{ border: "2px solid black" }}
              >
                <button
                  className=" w-16 h-full text-[#fff]"
                  type="submit"
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  // style={{ border: "2px solid black" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form className=" sm:w-full flex flex-col" onSubmit={handleSubmit}>
      {renderFormStep()}
    </form>
  );
};

export default UserForm;
