import PropTypes from "prop-types";
import AuthProvider from "./api/AuthProvider";
import JobProvider from "./api/JobProvider";
import CompanyProvider from "./api/CompanyProvider";
import ApplicantProvider from "./api/ApplicantProvider";

const MainProvider = ({ children }) => {
  return (
    <>
      <ApplicantProvider>
        <CompanyProvider>
          <JobProvider>
            <AuthProvider>{children}</AuthProvider>
          </JobProvider>
        </CompanyProvider>
      </ApplicantProvider>
    </>
  );
};

export default MainProvider;

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
