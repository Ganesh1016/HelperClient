import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ContractorSignIn = () => {
  const [formData, setFormData] = useState({
    contractorName: "",
    companyName: "",
    contactNumber: "",
    gender: "",
    age: "",
    officeAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Registration successful!");
    console.log("Contractor form data:", formData);
    // Send form data to backend here
  };

  return (
    <div className="flex flex-col items-center bg-body p-4 min-h-screen font-poppins">
      <h1 className="text-xl font-semibold text-darkPrimary mb-4">
        Contractor Registration
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap w-full gap-4 p-4 bg-tertiary rounded-lg max-w-md"
      >
        {/* Contractor Name */}
        <label className="block w-full mb-4">
          <input
            type="text"
            name="contractorName"
            value={formData.contractorName}
            onChange={handleChange}
            placeholder="Contractor Name"
            className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
          />
        </label>

        {/* Company Name */}
        <label className="block w-full mb-4">
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
          />
        </label>

        {/* Contact Number */}
        <label className="block w-full mb-4">
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
          />
        </label>

        {/* Gender */}
        <label className="block w-full mb-4">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Age */}
        <label className="block w-full mb-4">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none h-12"
          />
        </label>

        {/* Office Address */}
        <label className="block w-full mb-6">
          <textarea
            name="officeAddress"
            value={formData.officeAddress}
            onChange={handleChange}
            placeholder="Office Address"
            className="border border-lightText rounded-lg focus:border-primary focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none resize-none h-24"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary w-full h-12 rounded-lg flex items-center justify-center text-white font-semibold"
        >
          Register
        </button>
      </form>
      <h4 className=" mt-4">
        Already have an account?{" "}
        <Link to={"/signin"}>
          <span className=" text-primary font-semibold cursor-pointer">
            <u>Sign In.</u>
          </span>
        </Link>
      </h4>
    </div>
  );
};

export default ContractorSignIn;
