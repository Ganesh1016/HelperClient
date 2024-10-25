import { Link } from "react-router-dom";
import ProviderSignupForm from "../components/ProviderSignupForm";

const PostJob = () => {
  return (
    <div
      className="w-[100vw] h-screen flex justify-center items-center flex-col"
      // style={{ border: "2px solid black" }}
    >
      <Link to={"/"}>
        <div className="next bg-primary w-24 md:w-28 md:h-10 h-10 rounded-lg flex flex-row justify-evenly items-baseline cursor-pointer fixed top-2 left-2 ml-2 mt-2">
          <button
            className=" w-16 h-full text-[#fff]"
            // style={{ border: "2px solid black" }}
          >
            Back
          </button>
        </div>
      </Link>
      <div
        className="container flex justify-center items-center flex-col w-11/12 md:max-w-[60%] md:h-[95vh] h-4/5  py-5"
        // style={{ border: "2px solid black" }}
      >
        <h1 className="text-2xl font-semibold ">Sign Up</h1>
        <p className="text-sm font-medium text-lightText w-4/5 text-center py-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, ad!
        </p>
        <div
          className="form-wrapper relative flex flex-col justify-center w-[95%] h-full md:w-3/4 md:h-[80%] rounded-xl bg-white shadow-xl p-6 m-4 "
          // style={{ border: "2px solid black" }}
        >
          <h1 className="md:text-3xl text-2xl font-bold text-darkPrimary ml-2 md:absolute md:top-2 md:left-6">
            Personal Information
          </h1>
          <p className="text-lg text-lightText ml-2 md:absolute md:top-14 md:left-6">
            Enter your personal details
          </p>
          <div
            className="flex items-center justify-center md:mt-8 w-full pt-4"
            // style={{ border: "2px solid black" }}
          >
            <ProviderSignupForm />
          </div>
        </div>
        <h4>
          Already have an account?{" "}
          <Link to={"/signin"}>
            <span className=" text-primary font-semibold cursor-pointer">
              <u>Sign In.</u>
            </span>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default PostJob;
