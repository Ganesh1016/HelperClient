import "../index.css";
// import { API_BASE_URL } from "../apiConfig";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, analytics } from "../../firebase";
import { logEvent } from "firebase/analytics";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess, signInError } from "../redux/user/userSlice";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const SignIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [disableButton, setDisableButton] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  // const [showUserChoice, setShowUserChoice] = useState(false);

  const [formData, setFormData] = useState({
    countryCode: "+91",
    phoneNumber: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendOtp = async () => {
    try {
      setDisableInput(true);

      console.log(
        "Checking if user exists in both collections for phone number:",
        formData.phoneNumber
      );

      const response = await axios.post(
        `http://localhost:3000/api/auth/signin`,
        {
          phoneNumber: formData.phoneNumber,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data);
        console.log(response.data.userType);
        const { userType } = response.data;
        ``;

        console.log("Before userType Comparison. userType:", userType);
        if (userType === "both") {
          setUserRole(userType);
          setOpen(true);
          console.log(true);
          // User exists in both collections, show the user choice pop-up

          // Create a new RecaptchaVerifier for the "both" case
          const recaptchaVerifierBoth = new RecaptchaVerifier(
            auth,
            "recaptcha-container-both", // Change this to a unique ID for the pop-up
            {
              size: "normal",
              callback: () => {},
              "expired-callback": () => {
                toast.error(
                  "reCAPTCHA response expired. Please solve it again."
                );
              },
            }
          );
          recaptchaVerifierBoth.render();

          // Create a new confirmationResult for the "both" case
          const confirmationResultBoth = await signInWithPhoneNumber(
            auth,
            `${formData.countryCode}${formData.phoneNumber}`,
            recaptchaVerifierBoth
          );

          // Set the confirmationResult for the "both" case
          window.confirmationResultBoth = confirmationResultBoth;

          // Show the user choice pop-up
          // setShowUserChoice(true);
        } else {
          // User doesn't exist in both collections, proceed with OTP verification
          setUserRole(userType);

          const recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "normal",
              callback: () => {},
              "expired-callback": () => {
                toast.error(
                  "reCAPTCHA response expired. Please solve it again."
                );
              },
            }
          );
          recaptchaVerifier.render();

          console.log("Before signInWithPhoneNumber");

          try {
            const confirmationResult = await signInWithPhoneNumber(
              auth,
              `${formData.countryCode}${formData.phoneNumber}`,
              recaptchaVerifier
            );

            // Log a custom event for successful phone number verification
            logEvent(analytics, "phone_number_verification", {
              method: "SMS",
              phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
            });

            console.log("Confirmation result set:", confirmationResult);
            window.confirmationResult = confirmationResult;
          } catch (error) {
            console.error("Error setting confirmation result:", error);

            // Log an event for unsuccessful phone number verification
            logEvent(analytics, "phone_number_verification_failed", {
              method: "SMS",
              phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
              error: error.message || "Unknown error",
            });
          }

          console.log("After signInWithPhoneNumber");

          toast.success("OTP sent successfully");

          // Instead of serviceProvider data, dispatch the user data obtained from getUserDetails API
          getUserDetails(userRole);

          const { userData } = response.data;
          console.log(userData);

          // Proceed with the verification
          // dispatch(signInSuccess({ userData: userData, userType: userRole }));
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      if (error.response && error.response.status === 404) {
        toast.error("Phone number does not exist.");
        setDisableInput(false);
        dispatch(signInError({ type: "Phone number not found.", error }));
      } else {
        toast.error("An error occurred. Please try again.");
        setDisableInput(false);
        dispatch(signInError({ type: "OtherError", error }));
      }
    }
  };

  const verifyOtp = async (e, userType, confirmationResultBoth) => {
    e.preventDefault();
    try {
      const confirmationResult =
        confirmationResultBoth ||
        window.confirmationResult ||
        window.confirmationResultBoth;

      if (!confirmationResult) {
        // Handle the case where confirmationResult is not defined
        toast.error("Error verifying OTP: Confirmation result is undefined");
        return;
      }

      await confirmationResult
        .confirm(formData.otp)
        .then((result) => {
          // User signed in successfully
          const user = result.user;
          toast.success("OTP matched!");
          console.log("(Firebase) User signed in successfully:", user);

          // Fetch user details based on the chosen user type
          getUserDetails(userRole);

          // Navigate to the dashboard after successful sign-in
          navigate("/dashboard");
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          toast.error("Incorrect OTP");
          console.error("Incorrect OTP");
          console.error("Error verifying OTP:", error);
        });

      setDisableButton(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  // Add this function to handle user choice
  const handleUserChoice = (choice) => {
    // Handle the user's choice (find service or seek service)
    console.log("User chose:", choice);

    // Perform further actions based on the user's choice if needed

    // Close the temporary div
    setOpen(false);
    setDisableInput(true);

    // Notify the user about their choice
    toast.success(
      `You chose to ${
        choice === "serviceProvider" ? "Find a Service" : "Seek a Service"
      }`
    );
    setUserRole(choice);
  };

  const getUserDetails = async (userRole) => {
    console.log("getUserDetails - userType:", userRole);
    console.log(formData.phoneNumber);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/getUserDetails",
        {
          phoneNumber: formData.phoneNumber,
          userType: userRole,
        }
      );

      // Handle the response as needed
      console.log("User details response:", response.data);
      console.log("User details response:", response.data.userData);
      console.log("User details response:", response.data.userType);
      dispatch(signInSuccess(response.data, response.data.userType));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div
      className="signin-container h-[100dvh] w-full flex flex-col items-center justify-center"
      // style={{ border: "2px solid black" }}
    >
      <div
        className="wrapper w-5/6 h-3/6 flex flex-col items-center justify-center md:max-w-2xl md:h-5/6"
        style={{ border: "2px solid black" }}
      >
        <h1 className="text-2xl font-semibold ">Sign In to your account</h1>
        <p className="text-sm font-medium text-lightText w-4/5 text-center py-2">
          Enter the OTP you receive on your mobile number.
        </p>
        <div
          className="container w-5/6 h-3/6 md:w-5/6 md:h-3/6"
          style={{ border: "2px solid black" }}
        >
          <form
            action=""
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ border: "2px solid black" }}
          >
            <div
              className="otp-verification flex flex-wrap flex-col items-center justify-center mt-10"
              // style={{ border: "2px solid black" }}
            >
              <div
                className="contact-number flex flex-row md:w-3/5"
                // style={{ border: "2px solid black" }}
              >
                <input
                  type="text"
                  name="countryCode"
                  className="border border-lightText border-r-0 text-md rounded-lg focus:border-primary focus:border-2 block w-1/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none md:w-1/5 md:h-12"
                  value={formData.countryCode}
                  onChange={handleChange}
                  disabled
                />
                <input
                  type="text"
                  name="phoneNumber"
                  className="border border-lightText text-md rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none md:w-full text-center  md:h-12"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  disabled={disableInput}
                />
              </div>

              <h6
                className=" cursor-pointer underline mt-3 text-primary"
                id="sign-in-button"
                onClick={sendOtp}
                onChange={handleChange}
              >
                Verify with SMS
              </h6>
              <div id="recaptcha-container" className="mt-4"></div>
              <div id="recaptcha-container-both" className="mt-4"></div>
              <br />
              <div
                className="otp flex flex-row w-full md:w-3/5 items-center justify-center"
                // style={{ border: "2px solid black" }}
              >
                <input
                  type="number"
                  name="otp"
                  className={`border border-lightText text-md rounded-lg focus:border-primary focus:border-2 block text-center tracking-widest placeholder:tracking-normal p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none w-4/5  md:h-12 `}
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                />
                <button
                  className={`bg-primary text-center w-12 h-12 rounded-lg text-white cursor-pointer justify-center items-center ml-2 ${
                    disableButton ? "cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  onClick={verifyOtp}
                  disabled={disableButton}
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
              <div
                className="actions w-full flex flex-row items-center justify-center align-baseline"
                // style={{ border: "2px solid black" }}
              ></div>
            </div>
          </form>
        </div>
        <h4 className=" pt-2">
          Dont have an account yet?{" "}
          <Link to={"/findjob"}>
            <span className=" text-primary font-semibold cursor-pointer">
              <u>Create an account.</u>
            </span>
          </Link>
        </h4>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd 298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-."
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            You should read this!
          </Typography>
          <Typography className="text-center font-normal">
            What are you looking to do today?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => handleUserChoice("serviceProvider")}
          >
            Looking for a job
          </Button>
          <Button
            variant="gradient"
            onClick={() => handleUserChoice("serviceSeeker")}
          >
            Looking for a service
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default SignIn;
