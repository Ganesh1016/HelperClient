import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import "../index.css";
import "flowbite";
import toast from "react-hot-toast";

import {
  Select,
  Option,
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  DialogHeader,
  DialogBody,
  DialogFooter,
  ThemeProvider,
} from "@material-tailwind/react";

const seekerId = "Ganu123";

const RaiseServiceRequest = () => {
  // const currentUser = useSelector((state) => state.user.currentUser);
  // const { _id: seekerId } = currentUser.userData;
  const [serviceRequests, setServiceRequests] = useState([
    {
      _id: "1",
      serviceTitle: "House Cleaning",
      serviceDescription: "Deep cleaning required for a 3-bedroom apartment.",
      servicePrice: 500,
      serviceType: "Maid",
      createdAt: new Date().toISOString(),
      applicants: [{ name: "Applicant 1" }, { name: "Applicant 2" }],
    },
    {
      _id: "2",
      serviceTitle: "Math Tutor",
      serviceDescription: "Looking for a tutor for 10th-grade math.",
      servicePrice: 700,
      serviceType: "Private Tutor",
      createdAt: new Date().toISOString(),
      applicants: [],
    },
  ]);

  const [applicants, setApplicants] = useState([]);
  const [requestId, setRequestID] = useState(null);
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const [timing, setTiming] = useState({
    startTime: "",
    endTime: "",
  });

  const handleValueChange = (newDate) => {
    console.log("newValue:", newDate);
    setDate(newDate);

    // Update the serviceDuration in formData with the new dates
    setFormData((prevFormData) => ({
      ...prevFormData,
      serviceDuration: {
        startDate: newDate.startDate,
        endDate: newDate.endDate,
      },
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTiming((prevTiming) => ({
      ...prevTiming,
      [name]: value,
    }));
    console.log(
      `Start time: ${timing.startTime} & End time: ${timing.endTime}`
    );
  };

  const [openRequestServiceModal, setOpenRequestServiceModal] = useState(false);
  const handleOpenRequestServiceModal = () =>
    setOpenRequestServiceModal((cur) => !cur);

  const [openViewAppliantsModal, setOpenViewAppliantsModal] = useState(false);
  const handleOpenViewAppliantsModal = async (serviceRequestId) => {
    try {
      setRequestID(serviceRequestId);
      // Fetch the list of applicants based on the serviceRequestId
      const response = await fetch(
        `http://localhost:3000/api/service-providers/details/${serviceRequestId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch applicants");
      }
      const applicants = await response.json();

      // Log the fetched applicants for debugging
      console.log("Applicants:", applicants);

      setApplicants(applicants);
      console.log("service request ID", serviceRequestId);
      // Here you can set the fetched applicants in the component state
      // Or pass them to the modal component as needed

      // Toggle the modal state to open
      setOpenViewAppliantsModal(true);
    } catch (error) {
      // Handle any errors that occur during the fetching process
      console.error("Error fetching applicants:", error);
    }
  };

  const [formData, setFormData] = useState({
    serviceTitle: "",
    servicePrice: "",
    serviceType: "",
    serviceDescription: "",
    serviceDuration: {
      startDate: date.startDate,
      endDate: date.endDate,
      startTime: timing.startTime,
      endTime: timing.endTime,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both start time and end time are filled
    if (!timing.startTime || !timing.endTime) {
      toast.error("Please select both start and end time.");
      return;
    }

    // Create a new request object with the form data
    const newRequest = {
      _id: Date.now().toString(), // Use a timestamp as a temporary ID
      serviceTitle: formData.serviceTitle,
      serviceDescription: formData.serviceDescription,
      servicePrice: formData.servicePrice,
      serviceType: formData.serviceType,
      createdAt: new Date().toISOString(),
      applicants: [], // Start with no applicants
    };

    // Add the new request to the state
    setServiceRequests((prevRequests) => [newRequest, ...prevRequests]);

    // Close the modal and reset the form
    handleOpenRequestServiceModal();
    setFormData({
      serviceTitle: "",
      servicePrice: "",
      serviceType: "",
      serviceDescription: "",
      serviceDuration: {
        startDate: date.startDate,
        endDate: date.endDate,
        startTime: timing.startTime,
        endTime: timing.endTime,
      },
    });

    toast.success("Service Request raised successfully.");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    // Fetch service requests when the component mounts
    const fetchServiceSeekerRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/service-request/seeker-requests/${seekerId}`
        );
        const data = await response.json();

        setServiceRequests(data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceSeekerRequests();
  }, [seekerId]); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Service Requests
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleOpenRequestServiceModal}
              className="flex items-center justify-center bg-primary hover:bg-primary-600 text-white px-4 py-3 rounded-lg shadow-sm text-sm font-medium transition-colors w-full sm:w-auto"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Request New Service
            </button>

            <Select label="Filter by Service" className="w-full sm:w-48">
              <Option>All Services</Option>
              <Option>Maid Services</Option>
              <Option>Repairs</Option>
              <Option>Education</Option>
            </Select>
          </div>
        </div>

        {/* Service Cards for Mobile */}
        <div className="block sm:hidden space-y-4">
          {serviceRequests.map((request, index) => (
            <Card key={request._id} className="bg-white shadow-md">
              <CardBody className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.serviceTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                      ₹{request.servicePrice}/hr
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {request.serviceType}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-3">
                  {request.serviceDescription}
                </p>

                <button
                  onClick={() => handleOpenViewAppliantsModal(request._id)}
                  className="w-full bg-primary hover:bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  View Applicants ({request.applicants?.length || 0})
                </button>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Request Service Modal */}
        <Dialog
          open={openRequestServiceModal}
          handler={handleOpenRequestServiceModal}
          className="sm:max-w-lg"
        >
          <Card className="w-full">
            <form onSubmit={handleSubmit} className="p-4">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Request a Service
              </h2>

              <div className="space-y-6">
                <div>
                  <Input
                    label="What service do you need?"
                    placeholder="e.g., House Cleaning, Math Tutor"
                    name="serviceTitle"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Service Type" name="serviceType" required>
                    {[
                      "Maid",
                      "Babysitter",
                      "Electrician",
                      "Plumber",
                      "Painter",
                      "Private Tutor",
                      "Private Nurse",
                      "Tailor",
                    ].map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>

                  <Input
                    type="number"
                    label="Price per hour (₹)"
                    name="servicePrice"
                    placeholder="₹"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    When do you need the service?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <div className="flex space-x-4">
                      <input
                        type="time"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                      <input
                        type="time"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Textarea
                  label="Describe your requirements"
                  placeholder="Please provide details about the service you need..."
                  name="serviceDescription"
                  required
                  rows={4}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add photos (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-600 text-white"
                >
                  Submit Request
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleOpenRequestServiceModal}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </Dialog>

        {/* Applicants Modal */}
        <Dialog
          open={openViewAppliantsModal}
          handler={handleOpenViewAppliantsModal}
          className="sm:max-w-2xl"
        >
          <DialogHeader className="text-xl font-bold">
            Service Applicants
          </DialogHeader>
          <DialogBody className="h-[70vh] overflow-y-auto">
            {applicants && applicants.length > 0 ? (
              <div className="space-y-4">
                {applicants.map((applicant, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0">
                        {/* Placeholder for profile image */}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {applicant.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {applicant.experience} years experience
                        </p>
                        <div className="mt-2">
                          <p className="text-sm text-gray-700">
                            {applicant.description}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Accept
                          </button>
                          <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Decline
                          </button>
                          <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No applicants yet
              </div>
            )}
          </DialogBody>
        </Dialog>
      </div>
    </div>
  );
};

// RaiseServiceRequest.propTypes = {
//   serviceRequestId: PropTypes.string.isRequired,
// };

export default RaiseServiceRequest;
