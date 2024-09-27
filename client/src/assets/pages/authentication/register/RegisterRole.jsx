import { companyIcon, applicantIcon } from "../../../icons/svg/SvgIcon.jsx"

const RegisterRole = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center relative h-screen">
    <h1 className="text-3xl font-bold mb-6">Which role are you?</h1>
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center flex-col md:flex-row">
        <a href="/register/company" className="rounded-md custom-hover-box border border-purple-500 w-60 h-48 flex flex-col items-center justify-center hover:bg-purple-100">
          {companyIcon}
          <p className="text-xl font-medium mt-2">Company</p>
          <p className="text-sm text-center mt-1 text-gray-500">Register as a company to post job listings.</p>
        </a>
        <a href="/register/applicant" className="rounded-md custom-hover-box md:ms-4 md:mt-0 mt-4 ms-0 border border-purple-500 w-60 h-48 flex flex-col items-center justify-center hover:bg-purple-100">
          {applicantIcon}
          <p className="text-xl font-medium mt-2">Applicant</p>
          <p className="text-sm text-center mt-1 text-gray-500">Register as an applicant to apply for available jobs.</p>
        </a>
      </div>
    </div>
  </div>
  )
}

export default RegisterRole