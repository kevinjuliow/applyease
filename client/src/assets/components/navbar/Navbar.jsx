import { useLocation, useNavigate } from "react-router-dom"

const Navbar = () => {
  const location = useLocation()

  const authenticatedUser = localStorage.getItem('userToken')

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userToken')
    navigate('/')
  }

  return (
    <nav className="backdrop-blur-md bg-white bg-opacity-75 fixed w-full z-[999] top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto px-4 py-3 h-18 relative">
        <div>
          <a href="/" className="bg-gradient-to-r from-purple-500 via-purple-700 to-red-500 text-transparent bg-clip-text flex items-center space-x-3 rtl:space-x-reverse text-black opacity-90 font-bold">
            <p className="text-2xl mr-[-12px]">Apply</p>
            <p className="text-2xl">Ease</p>
          </a>
        </div>
        <div>
          {!authenticatedUser ? <ul className="flex justify-center items-center">
            {location.pathname != '/register-role' && location.pathname != '/register/applicant' && location.pathname != '/register/company' && <li className="text-black rounded-md hover:font-bold transition-[1s]">
              <a href="/register-role"><button className="w-20 h-10">Sign-up</button></a>
            </li>}
            {location.pathname != '/login' && <li className="ms-2 custom-hover-button text-white rounded-md bg-purple-700">
              <a href="/login"><button className="w-20 h-10">Login</button></a>
            </li>
            }
          </ul>
          : <ul>
            <li className="ms-2 custom-hover-button text-white rounded-md bg-red-500">
              <button className="w-20 h-10" onClick={handleLogout}>Logout</button>
            </li>
          </ul> }
        </div>
      </div>
    </nav>
  )
}

export default Navbar