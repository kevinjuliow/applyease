const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center relative max-w-screen-lg mx-auto">
      {children}
    </div>
  )
}

export default Layout