import PropTypes from 'prop-types'


const DashboardLayout = ({children}) => {
  return (
    <div className="w-full flex items-center justify-center relative max-w-screen-lg mx-auto">
    {children}
  </div>

  )
}

export default DashboardLayout

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
