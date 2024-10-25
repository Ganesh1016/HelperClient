import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Step 1: Create a Context
const SelectedProviderContext = createContext();

// Create the Provider Component
const SelectedProviderProvider = ({ children }) => {
  // State to hold the selected provider data
  const [selectedProviderData, setSelectedProviderData] = useState(null);

  // Value to be provided by the context
  const contextValue = {
    selectedProviderData,
    setSelectedProviderData,
  };

  // Provide the context value to its children
  return (
    <SelectedProviderContext.Provider value={contextValue}>
      {children}
    </SelectedProviderContext.Provider>
  );
};

SelectedProviderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SelectedProviderProvider, SelectedProviderContext };
