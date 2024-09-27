import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center relative max-w-screen-lg mx-auto w-full">
      {children}
    </div>
  )
}

// props validation to make sure that children is a react node and is mandatory
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout