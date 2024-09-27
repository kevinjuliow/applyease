import "./App.css";
import Navbar from "./assets/components/navbar/Navbar";
import Login from "./assets/pages/authentication/login/Login";
import RegisterRole from "./assets/pages/authentication/register/RegisterRole";
import Landing from "./assets/pages/landing/Landing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFoundPage from "./assets/pages/notfound/NotFoundPage";
import CompanyRegister from "./assets/pages/authentication/register/CompanyRegister";
import ApplicantRegister from "./assets/pages/authentication/register/ApplicantRegister";
import AuthenticatedMiddleware from "./assets/lib/AuthenticatedMiddleware";
import GuestMiddleware from "./assets/lib/GuestMiddleware";
import Dashboard from "./assets/pages/dashboard/Dashboard";
import DashboardContent from "./assets/pages/dashboard/content/DashboardContent";
import MainProvider from "./context/MainProvider";
import Profile from "./assets/pages/user/profile/Profile";
import AddJob from "./assets/pages/company/AddJob";
import MyApplications from "./assets/pages/dashboard/content/MyApplications";
import JobDetail from "./assets/pages/dashboard/content/JobDetail"
import AppliedApplicants from "./assets/pages/company/AppliedApplicants";
function App() {
  const guestRoutes = [
    { path: "/register-role", element: <RegisterRole /> },
    { path: "/login", element: <Login /> },
    { path: "/register/company", element: <CompanyRegister /> },
    { path: "/register/applicant", element: <ApplicantRegister /> },
  ];

  return (
    <>
      <Router>
        <MainProvider>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Landing />} />

            <Route
              path={"/dashboard/*"}
              element={
                <AuthenticatedMiddleware>
                  <Dashboard />
                </AuthenticatedMiddleware>
              }
            >
              <Route path={""} element={<DashboardContent />} />
              <Route path={"applications"} element={<MyApplications/>} />
              <Route path={"profile"} element={<Profile />} />
              <Route path={"add/job"} element={<AddJob />} />
              <Route path={"appliedApplicants"} element={<AppliedApplicants />} />
              <Route path={"jobs/:id"} element={<JobDetail />} />
            </Route>

            {/* Guest Routes */}
            {guestRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<GuestMiddleware>{element}</GuestMiddleware>}
              />
            ))}

            {/* Not Found Page */}
            <Route path="/notfound" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
          </Routes>
        </MainProvider>
      </Router>
    </>
  );
}

export default App;
