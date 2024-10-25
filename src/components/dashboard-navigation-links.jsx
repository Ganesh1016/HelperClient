const seekerLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <img src="/Dashboard-icon/dashboard-icon.svg" />,
  },
  {
    to: "/dashboard/search",
    label: "Search",
    icon: <img src="/Dashboard-icon/search-icon.svg" />,
  },
  {
    to: "/dashboard/request-service",
    label: "Request service",
    icon: <img src="/Dashboard-icon/job-icon.svg" />,
  },
  {
    to: "/dashboard/active-services",
    label: "Active Services",
    icon: <img src="/Dashboard-icon/active-services-icon.svg" />,
  },
  {
    to: "/dashboard/service-history",
    label: "Service History",
    icon: <img src="/Dashboard-icon/history-icon.svg" />,
  },
  // Add other seeker-specific links
];

const providerLinks = [
  {
    to: "/dashboard/home",
    label: "Dashboard",
    icon: <img src="/Dashboard-icon/dashboard-icon.svg" />,
  },
  {
    to: "/dashboard/search-job",
    label: "Search Job",
    icon: <img src="/Dashboard-icon/job-icon.svg" />,
  },
  {
    to: "/dashboard/service-history",
    label: "Service History",
    icon: <img src="/Dashboard-icon/history-icon.svg" />,
  },
  // Add other provider-specific links
];

export { seekerLinks, providerLinks };
