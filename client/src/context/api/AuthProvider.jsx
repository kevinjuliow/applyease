import axios from "axios";
import PropTypes from "prop-types";
import {  createContext } from "react";

const AuthContext = createContext();


/**Login Applicants*/
const loginApplicants = async (email , password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_ROUTE}/api/users/login/applicant`, {
      "email" : email,
      "password" : password,
    });
    const data = response.data; 
    localStorage.setItem('token', data.token);
  
  } catch (error) {
    console.error('Login Error :', error);
    return null;
  }
};

/**Register Applicants */
const registerApplicants = async (full_name , email , password , password_confirmation , birth_date , phone) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_ROUTE}/api/users/register/applicant`, {
      "full_name" : full_name,
      "email" : email,
      "password" : password,
      "password_confirmation" : password_confirmation , 
      "birth_date" : birth_date , 
      "phone" : phone
    });
    const data = response.data; 
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.applicant));
  
  } catch (error) {
    console.error('Login Error :', error);
    return null;
  }
};


/**Login Company*/
const loginCompany = async (email , password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_ROUTE}/api/users/login/company`, {
      "email" : email,
      "password" : password,
    });
    const data = response.data; 
    localStorage.setItem('token', data.token);
  
  } catch (error) {
    console.error('Login Error :', error);
    return null;
  }
};

/**Register Applicants */
const registerCompany = async (name , email , password , password_confirmation , address , country , phone) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_ROUTE}/api/users/register/company`, {
      "name" : name,
      "email" : email,
      "password" : password,
      "password_confirmation" : password_confirmation , 
      "address" : address,
      "country" : country ,  
      "phone" : phone
    });
    const data = response.data; 
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.applicant));
  
  } catch (error) {
    console.error('Login Error :', error);
    return null;
  }
};


const AuthProvider = ({children}) => {
  return <AuthContext.Provider value={{ loginApplicants , registerApplicants , loginCompany , registerCompany}}>
    {children}
  </AuthContext.Provider>
};

export default AuthProvider;


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};