import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center relative max-w-screen-lg mx-auto w-full flex-col">
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout