import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestMiddleware = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = localStorage.getItem('user');
    if (authenticatedUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return <>{children}</>;
};

GuestMiddleware.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestMiddleware;