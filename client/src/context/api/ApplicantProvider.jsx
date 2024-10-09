import axios from "axios";
import PropTypes from "prop-types";
import { createContext } from "react";

export const ApplicantContext = createContext();


const indexApplicant = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROUTE}/api/applicants`
  );
  const data = response.data;
  return data[0].data;
};

const showApplicant = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROUTE}/api/applicants/${id}`
  );
  const data = response.data;
  console.log(data);
  return data[0]
};



const ApplicantProvider = ({children}) => {
    return (
      <ApplicantContext.Provider value={{ indexApplicant  , showApplicant }}>{children}</ApplicantContext.Provider>
    )
  }

export default ApplicantProvider;

ApplicantProvider.propTypes = {
  children: PropTypes.node.isRequired,
};