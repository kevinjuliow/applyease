import axios from "axios";
import PropTypes from "prop-types";
import { createContext } from "react"

export const CompanyContext = createContext();

const indexCompany = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROUTE}/api/companies`
  );
  const data = response.data;
  return data[0].data
};

const showCompany = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_ROUTE}/api/companies/${id}`
  );
  const data = response.data;
  console.log(data[0]);
  return data[0]
}

const CompanyProvider = ({children}) => {
  return (
    <CompanyContext.Provider value={{ indexCompany  , showCompany }}>{children}</CompanyContext.Provider>
  )
}

export default CompanyProvider


CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};