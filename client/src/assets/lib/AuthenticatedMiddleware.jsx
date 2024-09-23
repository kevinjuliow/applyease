import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthenticatedMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = localStorage.getItem('userToken');
    if (authenticatedUser) {
      navigate('/');
    }
  }, [navigate]);

  return <>{children}</>;
};

// props validation to make sure that children is a react node and is mandatory
AuthenticatedMiddleware.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedMiddleware;
