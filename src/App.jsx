// App.js
// import { useEffect, useState } from "react";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import PropTypes from "prop-types";
import { toast, Toaster, ToastBar } from "react-hot-toast";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";
import FindJob from "./pages/FindJob";
import PostJob from "./pages/PostJob";
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import SearchServiceProviders from "./sections/SearchServiceProviders";
import FindServices from "./sections/FindServices";
import RaiseServiceRequest from "./sections/RaiseServiceRequest";
import BusinessPolicy from "./pages/BusinessPolicy";
import ActiveServices from "./sections/ActiveServices";
import { SelectedProviderProvider } from "./context/selectedProviderContext";
import ServicesHistory from "./sections/ServicesHistory";
import ContractorSignIn from "./pages/ContractorSignIn";
import ProviderDashboard from "./pages/ProviderDashoard";
import SeekerDashboard from "./pages/SeekerDashboard";
import ContractorDashboard from "./pages/ContractorDashboard";

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loadingMarkup}>
        <SelectedProviderProvider>
          <div className="app bg-body flex flex-col justify-center" id="app">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/businesspolicy" element={<BusinessPolicy />} />
              <Route path="/sign-up">
                <Route path="/sign-up/findjob" element={<FindJob />} />
                <Route path="/sign-up/postjob" element={<PostJob />} />{" "}
                <Route
                  path="/sign-up/contractor"
                  element={<ContractorSignIn />}
                />
              </Route>

              <Route path="/userform" element={<UserForm />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<div>Welcome to the Dashboard!</div>} />
                <Route
                  path="/dashboard/provider"
                  element={<ProviderDashboard />}
                />
                <Route path="/dashboard/seeker" element={<SeekerDashboard />} />
                <Route
                  path="/dashboard/contractor"
                  element={<ContractorDashboard />}
                />
                <Route
                  path="request-service"
                  element={<RaiseServiceRequest />}
                />
                <Route path="search" element={<SearchServiceProviders />} />
                <Route path="active-services" element={<ActiveServices />} />
                <Route path="search-job" element={<FindServices />} />
                <Route path="service-history" element={<ServicesHistory />} />
              </Route>
            </Routes>
            {/* This Toaster tag displays a toast on error, notification, etc. */}
            <Toaster position="bottom-right">
              {(t) => (
                <ToastBar toast={t}>
                  {({ icon, message }) => (
                    <>
                      {icon}
                      {message}
                      {t.type !== "loading" && (
                        <button onClick={() => toast.dismiss(t.id)}>
                          <svg
                            viewBox="0 0 21 21"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            width="16"
                            height="16"
                          >
                            <g
                              id="icon"
                              stroke="none"
                              strokeWidth="1"
                              fillRule="evenodd"
                            >
                              <polygon points="5 2 5 2 5 2 5 2"></polygon>
                              <path
                                d="M15.364 4.636a1 1 0 0 0-1.414 0L10.5 8.086 8.06 5.646a1 1 0 0 0-1.415 1.414L9.086 9.5 5.646 12.94a1 1 0 1 0 1.415 1.415L10.5 10.914l2.44 2.44a1 1 0 0 0 1.415-1.415L11.914 9.5l2.44-2.44a1 1 0 0 0 0-1.414z"
                                id="close-[#1511]"
                              ></path>
                            </g>
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </ToastBar>
              )}
            </Toaster>
          </div>
          <SpeedInsights />
        </SelectedProviderProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
