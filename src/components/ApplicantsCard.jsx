import PropTypes from "prop-types";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { SelectedProviderContext } from "../context/selectedProviderContext";

const ApplicantsCard = ({ applicant, requestId }) => {
  const navigate = useNavigate();
  // const { setSelectedProviderData } = useContext(SelectedProviderContext);
  console.log("This is the request id ", requestId);
  const { serviceProviderDetails, message } = applicant;
  const [openApplicantProfile, setOpenApplicantProfile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMadeForContact, setPaymentMadeForContact] = useState(false);
  const [contactButtonText, setContactButtonText] = useState("Get in touch");
  const [buttonColor, setButtonColor] = useState("#6C64FB"); // Blue color initially

  const handleOpenApplicantProfile = () =>
    setOpenApplicantProfile((cur) => !cur);

  // Inside your component
  const seekerId = useSelector(
    (state) => state.user?.currentUser?.userData._id
  );
  console.log(
    "Seeker id for payment,",
    seekerId + " providerid",
    serviceProviderDetails._id
  );

  const amount = 35;
  console.log("₹", amount);
  const currency = "INR";
  const receiptId = "qwsaq1";

  // Function to handle payment success
  const handlePaymentSuccess = () => {
    toast.success("Payment was successful");
    setContactButtonText("Confirm this service Provider");
    setButtonColor("#53a653"); // Change button color to green
    setIsProcessing(false);
  };

  const handleButtonClick = () => {
    if (contactButtonText === "Confirm this service Provider") {
      confirmProvider();
    } else if (contactButtonText === "Success. See active services") {
      navigate("/dashboard/active-services");
    } else {
      checkoutHandler();
    }
  };

  const confirmProvider = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/service-request/selectProvider",
        {
          method: "POST",
          body: JSON.stringify({
            serviceRequestId: requestId,
            selectedProviderId: serviceProviderDetails._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Provider selection successful:", responseData);
        toast.success("Provider was confirmed!");
        toast.success("Service is active");
        setButtonColor("#6C64FB");
        setContactButtonText("Success. See active services");
        // setSelectedProviderData(responseData);
      } else {
        toast.error("An error ocurred");
        // Provider selection failed, handle accordingly
        // Maybe show an error message
      }
    } catch (error) {
      // Handle error
      console.error("Error selecting provider:", error);
    }
  };

  const checkoutHandler = async (e) => {
    setIsProcessing(true);
    const response = await fetch(
      "https://top-vocal-mako.ngrok-free.app/api/payments/initiate-payment",
      {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
          seekerId: seekerId,
          serviceProviderId: serviceProviderDetails._id,
          serviceReqestId: requestId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_AcerYdUYkUPm8M", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Helper.com", //your business name
      description: "Test Transaction",
      image: "../assets/Helper logo.svg",
      order_id: order.id,
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "https://top-vocal-mako.ngrok-free.app/api/payments/payment-callback",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);

        // If payment was successful, call handlePaymentSuccess
        if (jsonRes.msg === "success") {
          handlePaymentSuccess();
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/payments/${requestId}/paymentStatus`
        );
        if (response.ok) {
          const data = await response.json();
          // Check if any payment is made for contact
          const paymentMadeForContact = data.some(
            (item) =>
              item.providerId === serviceProviderDetails._id &&
              item.paymentMadeForContact
          );
          setPaymentMadeForContact(paymentMadeForContact);
          // Update button text and color based on payment status
          if (paymentMadeForContact) {
            setContactButtonText("Confirm this service Provider");
            setButtonColor("#53a653"); // Green color
          }
        } else {
          // Handle error
          console.error("Failed to fetch payment status");
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    fetchPaymentStatus();
  }, [requestId, serviceProviderDetails._id]);

  return (
    <div
      className="max-w-sm w-full md:w-full lg:max-w-full lg:flex h-54 my-3"
      // style={{ border: "2px solid black" }}
    >
      <img
        src="https://images.pexels.com/photos/19300588/pexels-photo-19300588/free-photo-of-woman-pouring-water-from-kettle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Service Image"
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t md:rounded-l-lg lg:rounded-l text-center overflow-hidden"
      />
      <div
        className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 w-[90%] flex flex-col justify-between leading-normal font-poppins"
        // style={{ border: "2px solid black" }}
      >
        <div className="mb-8">
          <div
            className="provider-name text-gray-900 flex flex-row items-center font-bold text-xl mb-2"
            // style={{ border: "2px solid black" }}
          >
            <p>{serviceProviderDetails.fullname}</p>
            <span
              className="bg-purple-100 text-purple-800 text-[10px] font-medium px-2 ml-3 cursor-pointer rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400"
              onClick={handleOpenApplicantProfile}
            >
              View Profile
            </span>
          </div>
          <Dialog
            open={openApplicantProfile}
            handler={handleOpenApplicantProfile}
            size="xl"
          >
            <DialogHeader>{`${serviceProviderDetails.fullname}'s Profile`}</DialogHeader>
            <DialogBody>
              <div className="profile h-[60vh]">
                <div
                  className="profile-card h-[60%] flex flex-row"
                  // style={{ border: "2px solid black" }}
                >
                  <img
                    src={serviceProviderDetails.profilePicture}
                    alt="Provider profile picture"
                    className=" rounded-md h-full"
                  />
                  <div
                    className="personal-details  flex flex-col ml-2 w-[30%] font-poppins p-2 rounded-2xl"
                    style={{ border: "3px solid black" }}
                  >
                    <h1 className=" text-sm bg-purple-900 w-fit py-1 px-2 rounded-lg text-blue-gray-50 font-medium">
                      Personal Details:
                    </h1>
                    <h1 className=" font-bold text-darkPrimary text-2xl">
                      {serviceProviderDetails.fullname}
                    </h1>
                    <h4 className=" text-base font-medium ">
                      {serviceProviderDetails.age} Years |{" "}
                      {serviceProviderDetails.gender}
                    </h4>
                    <div className="container flex flex-row mt-auto">
                      <h5 className="text-base font-normal text-darkPrimary">
                        Ratings: <br />
                        <span className=" text-2xl">⭐⭐⭐⭐⭐</span>
                      </h5>
                      <h5 className=" text-base font-normal ml-4 text-darkPrimary">
                        Reviews: <br /> <span className=" text-2xl">300</span>
                      </h5>
                    </div>
                  </div>
                  <div
                    className="professional-details w-[65%] h-full ml-2 rounded-xl font-poppins p-2"
                    style={{ border: "3px solid black" }}
                  >
                    <h1 className=" text-sm bg-purple-900 w-fit py-1 px-2 rounded-lg text-blue-gray-50 font-medium">
                      Professional Details:
                    </h1>
                    <div className="details-container flex flex-row justify-between">
                      <div className="details-key-container w-2/4 h-full flex flex-col justify-evenly">
                        <p>Service Type:</p>
                        <p>Service Location:</p>
                        <p>Availability:</p>
                        <p>Hourly Rate:</p>
                        <p>Work Experience:</p>
                        <p>Joined Helper.com at:</p>
                      </div>
                      <div className="details-value-container w-2/4">
                        <p>{serviceProviderDetails.serviceCategory}</p>
                        <p>{serviceProviderDetails.serviceLocation}</p>
                        <p>{`${serviceProviderDetails.availability} hours/day`}</p>
                        <p>{`₹${serviceProviderDetails.hourlyRate}/hour`}</p>
                        <p>{`${serviceProviderDetails.workExperience} years`}</p>
                        <p>{serviceProviderDetails.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="reviews h-[40%] w-full flex flex-row justify-start items-center"
                  // style={{ border: "2px solid black" }}
                >
                  <div
                    className="review-card w-96 h-[90%] rounded-lg m-2"
                    style={{ border: "2px solid black" }}
                  ></div>
                  <div
                    className="review-card w-96 h-[90%] rounded-lg m-2"
                    style={{ border: "2px solid black" }}
                  ></div>
                  <div
                    className="review-card w-96 h-[90%] rounded-lg m-2"
                    style={{ border: "2px solid black" }}
                  ></div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpenApplicantProfile}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleOpenApplicantProfile}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
          <p className=" text-sm font-semibold">Message:</p>
          <p className="text-gray-700 text-base font-poppins">{message}</p>
        </div>
        <div className="flex flex-row justify-between">
          <div className=" flex flex-row items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={serviceProviderDetails.profilePicture}
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none font-bold">
                Phone number
              </p>
              <p className="text-gray-600" id="phone-number">
                {paymentMadeForContact ? (
                  `Contact: ${serviceProviderDetails.phoneNumber}`
                ) : (
                  <a>Show contact number</a>
                )}
              </p>
            </div>
          </div>
          <button
            className="w-fit flex items-center justify-center bg-primary text-body bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none"
            style={{ backgroundColor: buttonColor }}
            onClick={handleButtonClick}
            disabled={isProcessing}
          >
            {contactButtonText} ₹{amount}
          </button>
        </div>
      </div>
    </div>
  );
};

ApplicantsCard.propTypes = {
  applicant: PropTypes.object.isRequired,
  requestId: PropTypes.string.isRequired,
  paymentMadeForContact: PropTypes.bool.isRequired,
};

export default ApplicantsCard;
