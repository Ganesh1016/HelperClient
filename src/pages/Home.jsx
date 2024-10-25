import Hero from "../sections/Hero";
import DynamicMap from "../sections/DynamicMap";
// import { register } from "swiper/element/bundle";
// import {register} from 'swiper/modules/'
import { Link } from "react-router-dom";
import TestimonialsCard from "../components/TestimonialsCard";
// import TestimonialsCard from "../components/TestimonialsCard";

// const slides = [
//   "https://plus.unsplash.com/premium_photo-1661281337214-c5f344300d92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29ya3xlbnwwfDB8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya3xlbnwwfDB8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29ya3xlbnwwfDB8MHx8fDA%3D",
// ];

// register();

const serviceCategories = [
  "Housekeeping",
  "Babysitting",
  "Plumbing",
  "Electrician",
  "Carpentry",
  "Painting",
  "Gardening",
  "Pest Control",
  "Moving Helper",
  "Laundry",
  "Car Washing",
  "House Cleaner",
  "Water Tank Cleaning",
  "On-Site Worker",
  "Backoffice Worker",
];

const Home = () => {
  return (
    <div
      className="home flex flex-col justify-center"
      // style={{ border: "2px solid black" }}
    >
      <Hero />
      <DynamicMap />
      <h1 className=" md:text-5xl md:pl-8 md:py-5 pl-6 py-5 text-2xl font-medium ">
        Get Started <span className=" text-primary">in 3 steps</span>
      </h1>
      <div
        className="hidden get-started-steps-container  md:w-full md:h-[490px] md:flex md:flex-row justify-center items-center"
        // style={{ border: "2px solid black" }}
      >
        <div
          className="step md:w-[400px] md:h-[470px] flex flex-col items-center p-8 rounded-lg mr-10"
          style={{ border: "2px solid black" }}
        >
          <img
            src="https://images.pexels.com/photos/3585093/pexels-photo-3585093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className=" w-[270px] h-[270px] rounded-full"
          />
          <div className="step-title pt-4 font-bold text-xl">
            Lorem, ipsum dolor.
          </div>
          <div className="step-details pt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            dolore?
          </div>
        </div>
        <div
          className="step md:w-[400px] md:h-[470px] flex flex-col items-center p-8 rounded-lg mr-10"
          style={{ border: "2px solid black" }}
        >
          <img
            src="https://images.pexels.com/photos/3585093/pexels-photo-3585093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className=" w-[270px] h-[270px] rounded-full"
          />
          <div className="step-title pt-4 font-bold text-xl">
            Lorem, ipsum dolor.
          </div>
          <div className="step-details pt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            dolore?
          </div>
        </div>
        <div
          className="step md:w-[400px] md:h-[470px] flex flex-col items-center p-8 rounded-lg"
          style={{ border: "2px solid black" }}
        >
          <img
            src="https://images.pexels.com/photos/3585093/pexels-photo-3585093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className=" w-[270px] h-[270px] rounded-full"
          />
          <div className="step-title pt-4 font-bold text-xl">
            Lorem, ipsum dolor.
          </div>
          <div className="step-details pt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            dolore?
          </div>
        </div>
      </div>
      <div className="swiper-container md:hidden p-2 w-full h-fit ">
        <swiper-container
          slides-per-view="1"
          navigation="true"
          pagination="true"
        >
          <swiper-slide>
            <div
              className="step md:w-[400px] md:h-[470px] flex flex-col items-center p-8 rounded-lg"
              style={{ border: "2px solid black" }}
            >
              <img
                src="https://images.pexels.com/photos/3585093/pexels-photo-3585093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className=" w-[270px] h-[270px] rounded-full"
              />
              <div className="step-title pt-4 font-bold text-xl">
                Lorem, ipsum dolor.
              </div>
              <div className="step-details pt-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus, dolore?
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              className="step md:w-[400px] md:h-[470px] flex flex-col items-center p-8 rounded-lg"
              style={{ border: "2px solid black" }}
            >
              <img
                src="https://images.pexels.com/photos/3585093/pexels-photo-3585093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className=" w-[270px] h-[270px] rounded-full"
              />
              <div className="step-title pt-4 font-bold text-xl">
                Lorem, ipsum dolor.
              </div>
              <div className="step-details pt-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus, dolore?
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div
              className="step md:w-[400px] md:h-[470px] flex flex-col items-center p-8 rounded-lg"
              style={{ border: "2px solid black" }}
            >
              <img
                src="https://images.pexels.com/photos/3585093/pexels-photo-3585093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className=" w-[270px] h-[270px] rounded-full"
              />
              <div className="step-title pt-4 font-bold text-xl">
                Lorem, ipsum dolor.
              </div>
              <div className="step-details pt-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus, dolore?
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
      <div className="post-job-button flex justify-center items-center mt-8 md:m-0 md:h-[100px]">
        <Link to={"/postjob"}>
          <button
            type="button"
            className=" bg-primary text-body rounded-ctabutton border-primary border-2 focus:ring-4 focus:outline-none px-4 py-1.5  text-base font-medium text-center h-10 w-30 "
          >
            Post a Job
          </button>
        </Link>
      </div>
      <div className="service-categories flex flex-col items-center  mt-10 md:mt-0">
        <p className=" bg-body border border-primary text-primary rounded-full px-3 py-2">
          Categories
        </p>
        <div className="categories flex flex-col items-center justify-center">
          <h1 className=" text-2xl md:text-5xl mt-4 font-medium">
            <span className=" text-primary ">Hire</span> from these Service
            Categories
          </h1>
          <div className="categories-container w-full p-4 md:w-3/4 md:h-[300px] md:p-3 items-center justify-center flex flex-row flex-wrap ">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className="chip flex flex-col justify-center items-center mx-2 md:mx-3 text-lightText font-medium border border-lightText rounded-full h-[40px] md:h-[50px] w-fit px-3 mt-4 md:mt-0 md:px-6"
              >
                <h3>{category}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="user-testimonials flex flex-col items-center w-full mt-10 md:mt-2">
          <p className=" bg-body border border-primary text-primary rounded-full px-3 py-2">
            Testimonials
          </p>
          <h1 className=" text-2xl md:text-5xl mt-4 font-medium">
            Hear our customer{" "}
            <span className=" text-primary ">experiences</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-6xl">
            <TestimonialsCard
              avatar="https://randomuser.me/api/portraits/men/1.jpg"
              name="Michael Johnson"
              comment="Great service! I was able to find a reliable babysitter for my kids within minutes. Highly recommended!"
            />
            <TestimonialsCard
              avatar="https://randomuser.me/api/portraits/women/2.jpg"
              name="Emily Rodriguez"
              comment="Helper.com made it so easy for me to find a housekeeper for my busy schedule. The process was smooth, and I'm happy with the service I received."
            />
            <TestimonialsCard
              avatar="https://randomuser.me/api/portraits/men/3.jpg"
              name="Daniel Wilson"
              comment="I needed someone to walk my dog while I was away on a business trip, and Helper.com connected me with a fantastic dog walker. I'm grateful for the help!"
            />
          </div>
        </div>
        <footer className="bg-darkPrimary text-body py-8 w-full mt-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
            <div className="text-center md:text-left mb-4 md:mb-0 md:pr-8">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-lightText">
                Email: ganeshgajelly.dev@gmail.com
              </p>
              <p className="text-lightText">Phone: 7400104321</p>
            </div>
            <div className="text-center md:text-left mb-4 md:mb-0 md:pr-8">
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-lightText">Mumbai Central, Mumbai</p>
              <p className="text-lightText">India</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Follow Us</h3>
              <div className="flex justify-center md:justify-start">
                <a href="#" className="text-lightText hover:text-primary mr-4">
                  <i className="fab fa-facebook-square text-2xl"></i>
                </a>
                <a href="#" className="text-lightText hover:text-primary mr-4">
                  <i className="fab fa-twitter-square text-2xl"></i>
                </a>
                <a href="#" className="text-lightText hover:text-primary">
                  <i className="fab fa-instagram-square text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
