import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../index.css";
import "flowbite";
import Datepicker from "react-tailwindcss-datepicker";
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
import ApplicantsCard from "../components/ApplicantsCard";

// Define your custom theme
const customTheme = {
  select: {
    styles: {
      base: {
        container: {
          width: "150px", // Adjust the width as needed
        },
      },
      sizes: {
        md: {
          container: {
            width: " w-[150px]",
            height: "h-8", // Adjust the height for medium size
          },
          select: {
            fontSize: "text-sm", // Adjust the font size for medium size
            px: "px-3",
            py: "py-2.5",
            borderRadius: "rounded-[7px]",
          },
        },
        lg: {
          container: {
            height: "h-11", // Adjust the height for large size
          },
          select: {
            fontSize: "text-sm", // Adjust the font size for large size
            px: "px-3",
            py: "py-3",
            borderRadius: "rounded-[7px]",
          },
        },
      },
    },
  },
};

const RaiseServiceRequest = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { _id: seekerId } = currentUser.userData;
  const [serviceRequests, setServiceRequests] = useState([]);
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
    console.log("handleSubmit function");
    e.preventDefault();
    // Check if both start time and end time are filled
    if (!timing.startTime || !timing.endTime) {
      toast.error("Please select both start and end time.");
      return; // Exit the function if validation fails
    }
    try {
      if (currentUser) {
        console.log("Handling submit...");
        const { _id: seekerId } = currentUser.userData;
        console.log("Seeker ID:", seekerId);

        // Include seeker information in the formData
        const raiseRequestData = {
          ...formData,
          seeker: seekerId,
          // Add other seeker details if needed
        };

        console.log("Request Data:", raiseRequestData);

        // Use requestData for making the service request
        const response = await fetch(
          "http://localhost:3000/api/service-request/request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(raiseRequestData),
          }
        );

        if (response.ok) {
          console.log("Service request created successfully:", response);
          toast.success("Service Request raised sucessfully.");
        } else {
          console.error(
            "Error creating service request. Server response:",
            response
          );
          toast.error("Error raising service.");
        }
      } else {
        console.error("No currentUser found. Cannot submit service request.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
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
    <div
      className=" w-full md:h-full"
      // style={{ border: "2px solid black" }}
    >
      <section
        className="bg-gray-50 dark:bg-gray-900 sm:p-5 md:h-full"
        style={{ border: "2px solid black" }}
      >
        <div
          className="mx-auto w-full md:h-full"
          // style={{ border: "2px solid black" }}
        >
          <div
            className="available-services-table flex flex-col bg-white w-full md:h-full dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
            // style={{ border: "2px solid black" }}
          >
            <div
              className="flex flex-col items-center justify-center h-full "
              // style={{ border: "2px solid black" }}
            >
              <div
                className="actions-tab w-full flex flex-row py-2 space-y-2 md:space-y-0  md:items-center items-end justify-end md:space-x-3 flex-shrink-0"
                // style={{ border: "2px solid black" }}
              >
                <button
                  type="button"
                  onClick={handleOpenRequestServiceModal}
                  className=" w-[200px] flex items-center justify-center bg-primary text-body bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none "
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Request a service
                </button>
                <ThemeProvider value={customTheme}>
                  <Select label="Select Version" size="md" className="">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                  </Select>
                </ThemeProvider>
                {/* Request Services modal */}
                <Dialog
                  size="md"
                  open={openRequestServiceModal}
                  handler={handleOpenRequestServiceModal}
                  className="bg-transparent shadow"
                >
                  <Card className=" w-full">
                    <form onSubmit={handleSubmit}>
                      <CardBody className="flex flex-col gap-4 w-full">
                        <h1 className=" text-xl font-semibold font-poppins">
                          Request a service
                        </h1>
                        <Input
                          label="Service title"
                          name="serviceTitle"
                          id="serviceTitle"
                          className=" font-poppins"
                          size="lg"
                          onChange={handleChange}
                          required=""
                        />
                        <Datepicker
                          separator="to"
                          displayFormat={"DD/MM/YYYY"}
                          readOnly={true}
                          placeholder="Service Duration"
                          value={date}
                          id="serviceDuration"
                          onChange={handleValueChange}
                          toggleClassName="absolute bg-blue-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                          inputClassName=" border border-black text-lg px-3 font-poppins rounded-md w-full"
                        />
                        <div className="cont flex flex-row justify-evenly items-center">
                          <p>Start time</p>
                          <input
                            type="time"
                            name="startTime"
                            value={timing.startTime}
                            onChange={handleTimeChange}
                            className="w-1/4 px-3 border-2 border-gray-800 rounded-md"
                          />
                          <p>End time</p>
                          <input
                            type="time"
                            name="endTime"
                            value={timing.endTime}
                            onChange={handleTimeChange}
                            className="w-1/4 px-3 border-2 border-gray-800 rounded-md"
                          />
                          {/* <button
                            className=" bg-primary text-white"
                            type="button"
                            onClick={() => {
                              console.log(
                                `Start time: ${timing.startTime} & End time: ${timing.endTime}`
                              );
                            }}
                          >
                            Set timing
                          </button> */}
                        </div>
                        <div className="price-and-category flex flex-row w-full">
                          <Input
                            type="number"
                            name="servicePrice"
                            id="servicePrice"
                            placeholder="₹XXX"
                            required=""
                            label="Price per hour"
                            size="md"
                            onChange={handleChange}
                            className=" w-2/3"
                          />
                          <Select
                            label="Select Version"
                            id="category"
                            name="serviceType"
                            onChange={(selectedValue) =>
                              handleChange({
                                target: {
                                  name: "serviceType",
                                  value: selectedValue,
                                },
                              })
                            }
                          >
                            <Option value="Maid">Maid</Option>
                            <Option value="Babysitter">Babysitter</Option>
                            <Option value="Electrician">Electrician</Option>
                            <Option value="Plumber">Plumber</Option>
                            <Option value="Painter">Painter</Option>
                            <Option value="Private Tutor">Private Tutor</Option>
                            <Option value="Private Nurse">Private Nurse</Option>
                            <Option value="Tailor">Tailor</Option>
                            <Option value="Software Tester">
                              Software Tester
                            </Option>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Upload images
                          </label>
                          <input
                            className="w-full h-[35px] border-2 rounded-lg "
                            id="multiple_service_image_files"
                            type="file"
                            accept="image/png, image/jpeg"
                            multiple
                          />
                        </div>
                        <Textarea
                          variant="outlined"
                          label="Service Description"
                          id="description"
                          name="serviceDescription"
                          onChange={handleChange}
                          placeholder="More details about the problem"
                          className=" font-medium text-[16px]"
                        />
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button
                          variant="filled"
                          onClick={handleOpenRequestServiceModal}
                          fullWidth
                          type="submit"
                          color="blue"
                        >
                          Request Service
                        </Button>
                        <Typography
                          variant="h6"
                          className="mt-4 flex justify-center"
                        >
                          Cancel
                        </Typography>
                      </CardFooter>
                    </form>
                  </Card>
                </Dialog>
              </div>
              <section className="data-table w-full border-2 h-full">
                <table className=" table-fixed min-w-full divide-y-0 divide-black">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold font-poppins  text-gray-800 uppercase"
                      >
                        Serial
                      </th>
                      <th
                        scope="col"
                        className="  text-start text-xs font-bold font-poppins text-gray-800 uppercase"
                      >
                        Service Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-[24px]  text-start font-bold font-poppins text-xs  text-gray-800 uppercase "
                      >
                        Service Description
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-800 uppercase"
                      >
                        Service Category
                      </th> */}
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold font-poppins text-gray-800 uppercase"
                      >
                        Offered Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold font-poppins text-gray-800 uppercase"
                      >
                        Requested On
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold font-poppins text-gray-800 uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceRequests.map((request, index) => (
                      <tr
                        key={request._id}
                        className="border-t border-gray-600"
                      >
                        <td className="px-4 py-2 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {request.serviceTitle}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {request.serviceDescription}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          ₹{request.servicePrice} / hr
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button
                            className="bg-primary hover:bg-blue-700 flex justify-evenly items-center text-body text-xs font-medium py-1 w-[180px] rounded"
                            onClick={() =>
                              handleOpenViewAppliantsModal(request._id)
                            }
                          >
                            <svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              width="23px"
                              height="23px"
                              viewBox="0 0 38.00 38.00"
                              enableBackground="new 0 0 38 32"
                              xmlSpace="preserve"
                              fill="#ededed"
                              stroke="#ededed"
                              strokeWidth="1.064"
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
                                  <path
                                    fill="#ededed"
                                    d="M36.5,0h-35C0.673,0,0,0.673,0,1.5v29C0,31.327,0.673,32,1.5,32h35c0.827,0,1.5-0.673,1.5-1.5v-29 C38,0.673,37.327,0,36.5,0z M37,30.5c0,0.275-0.225,0.5-0.5,0.5h-35C1.225,31,1,30.775,1,30.5v-29C1,1.225,1.225,1,1.5,1h35 C36.775,1,37,1.225,37,1.5V30.5z"
                                  ></path>{" "}
                                  <path
                                    fill="#ededed"
                                    d="M17.5,16h-11C5.673,16,5,16.673,5,17.5v8C5,26.327,5.673,27,6.5,27h11c0.827,0,1.5-0.673,1.5-1.5v-8 C19,16.673,18.327,16,17.5,16z M18,25.5c0,0.275-0.225,0.5-0.5,0.5h-11C6.225,26,6,25.775,6,25.5v-8C6,17.225,6.225,17,6.5,17h11 c0.275,0,0.5,0.225,0.5,0.5V25.5z"
                                  ></path>{" "}
                                  <path
                                    fill="#ededed"
                                    d="M31.5,5h-25C5.673,5,5,5.673,5,6.5v5C5,12.327,5.673,13,6.5,13h25c0.827,0,1.5-0.673,1.5-1.5v-5 C33,5.673,32.327,5,31.5,5z M32,11.5c0,0.275-0.225,0.5-0.5,0.5h-25C6.225,12,6,11.775,6,11.5v-5C6,6.225,6.225,6,6.5,6h25 C31.775,6,32,6.225,32,6.5V11.5z"
                                  ></path>{" "}
                                  <path
                                    fill="#ededed"
                                    d="M32,17H22c-0.276,0-0.5,0.224-0.5,0.5S21.724,18,22,18h10c0.276,0,0.5-0.224,0.5-0.5S32.276,17,32,17z"
                                  ></path>{" "}
                                  <path
                                    fill="#ededed"
                                    d="M32,21H22c-0.276,0-0.5,0.224-0.5,0.5S21.724,22,22,22h10c0.276,0,0.5-0.224,0.5-0.5S32.276,21,32,21z"
                                  ></path>{" "}
                                  <path
                                    fill="#ededed"
                                    d="M32,25H22c-0.276,0-0.5,0.224-0.5,0.5S21.724,26,22,26h10c0.276,0,0.5-0.224,0.5-0.5S32.276,25,32,25z"
                                  ></path>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                            <p>View Applicants</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Dialog
                  size="lg"
                  handler={handleOpenViewAppliantsModal}
                  open={openViewAppliantsModal}
                >
                  <DialogHeader>All applicants</DialogHeader>
                  <DialogBody>
                    <div
                      className="applicants-container flex flex-col h-[300px] overflow-y-auto "
                      // style={{ border: "2px solid black" }}
                    >
                      {applicants &&
                        applicants.length > 0 &&
                        applicants.map((applicant, index) => (
                          <ApplicantsCard
                            key={index}
                            applicant={applicant}
                            requestId={requestId}
                          />
                        ))}
                    </div>
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={() => setOpenViewAppliantsModal(false)}
                    >
                      <span>Close</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// RaiseServiceRequest.propTypes = {
//   serviceRequestId: PropTypes.string.isRequired,
// };

export default RaiseServiceRequest;
