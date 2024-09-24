import './App.css'
import Navbar from './assets/components/navbar/Navbar'
import Login from './assets/pages/authentication/login/Login'
import RegisterRole from './assets/pages/authentication/register/RegisterRole'
import Landing from './assets/pages/landing/Landing'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NotFoundPage from './assets/pages/notfound/NotFoundPage'
import CompanyRegister from './assets/pages/authentication/register/CompanyRegister'
import ApplicantRegister from './assets/pages/authentication/register/ApplicantRegister'
import AuthenticatedMiddleware from './assets/lib/AuthenticatedMiddleware'
import Dashboard from './assets/pages/dashboard/Dashboard'

function App() {
  const protectedRoutes = [
    { path: "/register-role", element: <RegisterRole /> },
    { path: "/login", element: <Login /> },
    { path: "/register/company", element: <CompanyRegister /> },
    { path: "/register/applicant", element: <ApplicantRegister /> },
  ];

  return (
    <>
      <Router>
        <AuthenticatedMiddleware>
          <Navbar />
          <Routes>
            <Route path={"/"} element={ <Landing /> } />
            <Route path={"/asal"} element={<Dashboard/>} />

            {/* Dynamic routes for each route */}
            {protectedRoutes.map(({ path, element }) => (
              <Route 
                key={path} 
                path={path} 
                element={
                  <AuthenticatedMiddleware>
                    {element}
                  </AuthenticatedMiddleware>
                } 
              />
            ))}

            {/* Not Found Page */}
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} /> 
          </Routes>
        </AuthenticatedMiddleware>
      </Router>
    </>
  )
}

export default App
