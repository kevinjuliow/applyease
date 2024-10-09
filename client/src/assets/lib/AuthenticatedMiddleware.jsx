rimport { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthenticatedMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = localStorage.getItem('user');
    if (!authenticatedUser) {
      navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
};

AuthenticatedMiddleware.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedMiddleware;