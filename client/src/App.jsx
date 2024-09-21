import './App.css'
import Navbar from './assets/components/navbar/Navbar'
import Login from './assets/pages/authentication/login/Login'
import RegisterRole from './assets/pages/authentication/register/RegisterRole'
import Landing from './assets/pages/landing/Landing'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import NotFoundPage from './assets/pages/notfound/NotFoundPage'
import CompanyRegister from './assets/pages/authentication/register/CompanyRegister'
import ApplicantRegister from './assets/pages/authentication/register/ApplicantRegister'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={ <Landing /> } />
          <Route path={"/register-role"} element={ <RegisterRole /> } />
          <Route path={"/login"} element={ <Login /> } />
          <Route path={"/register/company"} element={ <CompanyRegister /> } />
          <Route path={"/register/applicant"} element={ <ApplicantRegister /> } />

          {/* Not Found Page */}
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/notfound" replace />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App
