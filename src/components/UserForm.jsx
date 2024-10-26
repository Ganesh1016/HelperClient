import { API_BASE_URL } from "../apiConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const UserForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    gender: "",
    homeAddress: "",
    serviceLocation: "",
    availability: "",
    hourlyRate: "",
    workExperience: "",
    countryCode: "+91",
    phoneNumber: "",
    otp: "",
    userType: "ServiceProvider",
    skills: [], // Assuming this is an array of skills
  });

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSkillToggle function to manage skills array
  const handleSkillToggle = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  // Updated sendOtp function using axios
  const sendOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/send-otp`, {
        userType: formData.userType,
        phoneNumber: formData.phoneNumber,
      });

      if (response.status === 200) {
        toast.success("OTP sent successfully!");
        console.log(formData);
      } else {
        throw new Error("OTP sending failed");
      }
    } catch (error) {
      toast.error("Cannot send OTP");
      console.error("Error sending OTP:", error);
    }
  };

  // Updated verifyOtp function using axios
  // Updated verifyOtp function using axios
  const verifyOtp = async () => {
    const payload = {
      phoneNumber: formData.phoneNumber,
      otp: parseInt(formData.otp),
      userType: formData.userType,
      fullname: formData.fullname,
      age: parseInt(formData.age),
      gender: formData.gender,
      homeAddress: formData.homeAddress,
      serviceAddress: formData.serviceLocation,
      experience: parseInt(formData.workExperience),
      availability: parseInt(formData.availability),
      hourlyRate: parseInt(formData.hourlyRate),
      serviceType: formData.serviceCategory,
      skills: selectedSkills, // Pass selected skills array
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        payload
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error in registration:", error);
    }
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
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-12"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="text"
                  name="age"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-12"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </label>
              <label>
                <textarea
                  name="homeAddress"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-24 resize-none"
                  placeholder="Home Address"
                  value={formData.homeAddress}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 p-2">
              <label className="w-full">
                <select
                  name="gender"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-12"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>
              <div
                className="mt-4 self-end w-28 h-10 bg-primary rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handleNext}
              >
                <button className="text-white">Next</button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="professional-details flex flex-wrap w-full gap-4 p-4">
            <div className="w-full md:w-1/2 p-2">
              <label className="block mb-4 relative">
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 p-2.5 outline-none h-auto cursor-pointer"
                >
                  <span className="block mb-2 text-gray-600">
                    Select Service Category
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.length > 0 ? (
                      selectedSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">
                        Click to select categories
                      </span>
                    )}
                  </div>
                </div>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {["Maid", "Cook", "Driver", "Gardener"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedSkills.includes(option)}
                          onChange={() => handleSkillToggle(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </label>
              <label className="block mb-4">
                <input
                  type="text"
                  name="serviceLocation"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-12"
                  value={formData.serviceLocation}
                  onChange={handleChange}
                  placeholder="Service Location"
                />
              </label>
              <label className="block mb-4">
                <input
                  type="text"
                  name="availability"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-12"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="Share you availaibility"
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 p-2">
              <label className="block mb-4">
                <input
                  type="text"
                  name="hourlyRate"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-12"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="Hourly Rate"
                />
              </label>
              <label className="block mb-4">
                <input
                  type="text"
                  name="workExperience"
                  className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 outline-none h-12"
                  value={formData.workExperience}
                  onChange={handleChange}
                  placeholder="Work Experience"
                />
              </label>
            </div>
            <div className="flex justify-between w-full mt-4">
              <div
                className="bg-primary w-24 md:w-28 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handlePrev}
              >
                <button className="text-white">Previous</button>
              </div>
              <div
                className="bg-primary w-24 md:w-28 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handleNext}
              >
                <button className="text-white">Next</button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="otp-verification flex flex-col items-center justify-center mt-10">
            <div className="contact-number flex flex-row md:w-2/5">
              <input
                type="text"
                name="countryCode"
                className="border border-lightText border-r-0 rounded-lg focus:border-primary block w-1/5 p-2.5 outline-none md:h-12"
                value={formData.countryCode}
                disabled
              />
              <input
                type="text"
                name="phoneNumber"
                className="border border-lightText rounded-lg focus:border-primary block w-full p-2.5 outline-none text-center md:h-12"
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
            <div className="otp flex w-full md:w-2/5 items-center justify-center mt-4">
              <input
                type="number"
                name="otp"
                className="border border-lightText rounded-lg focus:border-primary block text-center p-2.5 outline-none w-4/5 md:h-12"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              <button
                className="bg-primary text-center w-12 h-12 rounded-lg text-white ml-2"
                type="button"
                onClick={verifyOtp}
              >
                ✔
              </button>
            </div>
            <div className="flex justify-between w-full mt-8">
              <div
                className="bg-primary w-24 md:w-28 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                onClick={handlePrev}
              >
                <button className="text-white">Previous</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <form className="sm:w-full flex flex-col">{renderFormStep()}</form>;
};

export default UserForm;
