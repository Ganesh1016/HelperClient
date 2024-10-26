import "../index.css";
// import { API_BASE_URL } from "../apiConfig";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
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
import { API_BASE_URL } from "../apiConfig";

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

  // Send OTP function (for "Verify with SMS" button)
  const sendOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/send-otp`, {
        phoneNumber: parseInt(formData.phoneNumber),
      });

      if (response.status === 200) {
        toast.success("OTP sent successfully!");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
      console.error("Error sending OTP:", error);
    }
  };

  // Verify OTP function (for tick button)
  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        phoneNumber: parseInt(formData.phoneNumber),
        otp: parseInt(formData.otp),
      });

      if (response.status === 200) {
        const { userType, userProfile, authID } = response.data;
        dispatch(signInSuccess({ userType, userProfile, authID })); // Dispatching success action

        toast.success(`${userType} logged in successfully!`);

        // Navigate based on userType
        if (userType === "ServiceSeeker") {
          navigate("/dashboard/seeker", {
            state: { userProfile, authID },
          });
        } else if (userType === "ServiceProvider") {
          navigate("/dashboard/provider", {
            state: { userProfile, authID },
          });
        } else if (userType === "Contractor") {
          navigate("/dashboard/contractor", {
            state: { userProfile, authID },
          });
        } else {
          toast.error("Invalid user type");
        }
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      dispatch(signInError(error.message)); // Dispatching error action
      toast.error("An error occurred during login. Please try again.");
      console.error("Error in login:", error);
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

  return (
    <div
      className="signin-container h-[100dvh] w-full flex flex-col items-center justify-center"
      // style={{ border: "2px solid black" }}
    >
      <div
        className="wrapper w-5/6 h-3/6 flex flex-col items-center justify-center md:max-w-2xl md:h-5/6"
        // style={{ border: "2px solid black" }}
      >
        <h1 className="text-2xl font-semibold ">Sign In to your account</h1>
        <p className="text-sm font-medium text-lightText w-4/5 text-center py-2">
          Enter the OTP you receive on your mobile number.
        </p>
        <div
          className="container w-5/6 h-3/6 md:w-5/6 md:h-3/6"
          // style={{ border: "2px solid black" }}
        >
          <form className="sm:w-full flex flex-col">
            {/* Phone number input */}
            <div className="contact-number flex flex-row md:w-2/5">
              <input
                type="text"
                name="phoneNumber"
                className="border border-lightText text-md rounded-lg focus:border-primary block w-full p-2.5 outline-none text-center md:h-12"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <h6
              className="cursor-pointer underline mt-3 text-primary"
              onClick={sendOtp}
            >
              Verify with SMS
            </h6>

            {/* OTP input and tick button for verification */}
            <div className="otp flex w-full md:w-2/5 items-center justify-center mt-4">
              <input
                type="number"
                name="otp"
                className="border border-lightText text-md rounded-lg focus:border-primary block text-center p-2.5 outline-none w-4/5 md:h-12"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
              />
              <button
                className="bg-primary text-center w-12 h-12 rounded-lg text-white ml-2"
                type="button"
                onClick={verifyOtp}
              >
                ✔
              </button>
            </div>
          </form>
        </div>
        <h4 className=" pt-2 text-center">
          Dont have an account yet? <br />
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
