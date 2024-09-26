import axios from "axios";
import PropTypes from "prop-types";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate() ;
  /**Login Applicants*/
  const loginApplicant = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/login/applicant`,
        {
          email: email,
          password: password,
        }
      );
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log("Submit");
      navigate('/dashboard')
    } catch (error) {
      console.error("Login Error :", error);
      return null;
    }
  };

  /**Register Applicants */
  const registerApplicant = async (
    full_name,
    email,
    password,
    password_confirmation,
    birth_date,
    phone
  ) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/register/applicant`,
        {
          full_name: full_name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          birth_date: birth_date,
          phone: phone,
        }
      );
      console.log("Submit");
      navigate('/login')
    } catch (error) {
      console.error("Login Error :", error);
      return null;
    }
  };

  /**Login Company*/
  const loginCompany = async (email, password , setError) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/login/company`,
        {
          email: email,
          password: password,
        }
      );
      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log("Submit");
      navigate('/dashboard')
    } catch (error) {
      console.error("Login Error :", error);
      setError(error);
    }
  };

  /**Register Applicants */
  const registerCompany = async (
    name,
    email,
    password,
    password_confirmation,
    address,
    country,
    phone
  ) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/users/register/company`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          address: address,
          country: country,
          phone: phone,
        }
      );;
      console.log("Submit");
      navigate('/login')
    } catch (error) {
      console.error("Login Error :", error);
      return error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginApplicant,
        registerApplicant,
        loginCompany,
        registerCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
