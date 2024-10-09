import axios from "axios";
import PropTypes from "prop-types";
import { createContext } from "react";

export const JobContext = createContext();

const indexJob = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/jobs`);
  const data = response.data;
  return data[0];
};

const myJob = async (token) => { 
  const response = await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/myjobs`, { 
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  const data = response.data;
  return data[0].data;
};


const showJob = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROUTE}/api/jobs/${id}`
  );
  const data = response.data;
  return data[0];
};

const JobProvider = ({ children }) => {
  return (
    <JobContext.Provider value={{ indexJob, showJob , myJob }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;

JobProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
