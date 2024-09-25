import PropTypes from "prop-types";
import AuthProvider from "./api/AuthProvider"


const MainProvider = ({children}) => {
  return (
    <>     
     <AuthProvider>
      {children}
     </AuthProvider>
    </>
  )
}

export default MainProvider

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};