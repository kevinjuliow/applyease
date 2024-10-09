import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../../context/api/JobProvider";
import { ApplicantContext } from "../../../context/api/ApplicantProvider";
import defaultProfile from "../../images/defaultProfile.png";

const AppliedApplicants = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [applicantDetails, setApplicantDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showJob } = useContext(JobContext);
  const { showApplicant } = useContext(ApplicantContext);

  const handleDownloadCV = async (applicant) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ROUTE}/api/download/${
          applicant.applicant_id
        }`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CV.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ROUTE}/api/apply`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const fetchedApplicants = response.data.jobs;

        const detailedApplicants = await Promise.all(
          fetchedApplicants.map(async (applicant) => {
            try {
              const job = await showJob(applicant.job_id);
              const applicantData = await showApplicant(applicant.applicant_id);

              return {
                ...applicant,
                job,
                applicantData,
              };
            } catch (error) {
              console.error("Error fetching job or applicant details:", error);
              return { ...applicant, job: null, applicantData: null };
            }
          })
        );

        setApplicantDetails(detailedApplicants);
      } catch (error) {
        console.error("Error fetching applied applicants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, [user.token, showJob, showApplicant]);

  const handleAccept = (id) => {
    const fetchApi = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_ROUTE}/api/changestatus/accept/${id}`, {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            },
          }
        );
        console.log(response.data);
        window.location.reload()
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  };
  const handleReject = (id) => {
    const fetchApi = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_ROUTE}/api/changestatus/denied/${id}`, {},
          
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            },
          }
        );
        console.log(response.data);
        window.location.reload()
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  };

  return (
    <div>
      {isLoading ? (
        <div className="space-y-4">
          {Array(5)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
        </div>
      ) : applicantDetails.length > 0 ? (
        <div className="space-y-6">
          {applicantDetails
            .filter((applicant) => applicant.status === "Pending")
            .map((applicant, index) => (
              <div key={index} className="w-full h-full">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 w-full border-b-2 pb-3 sm:pb-4">
                  <li
                    key={index}
                    className="flex items-center space-x-4 rtl:space-x-reverse mt-4"
                  >
                    <div className="flex-shrink-0 px-2">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={defaultProfile}
                        alt="Profile"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {applicant.applicantData?.full_name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {applicant.applicantData?.email || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {applicant.job?.position || "Unknown Job"}
                      </p>
                      <button
                        className="custom-hover-button text-white bg-gray-500 rounded-md w-32 h-8 text-sm text-center mt-2 flex items-center justify-center"
                        onClick={() => handleDownloadCV(applicant)}
                      >
                        <p className="me-1">Download CV</p>
                        <svg
                          width="18px"
                          height="18px"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#ffffff"
                        >
                          <path
                            d="M6 20L18 20"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div className="self-end flex-col items-center justify-center">
                      <p className="text-right self-start">
                        Status: {applicant.status}
                      </p>
                      <div>
                        <a
                          href={
                            "https://mail.google.com/mail/?view=cm&fs=1&to=" +
                            applicant.applicantData?.email
                          }
                          target="_blank"
                        >
                          <button className="me-2 custom-hover-button text-green-500 rounded-md border border-green-500 w-20 h-8 text-sm text-center mt-2">
                            Contact
                          </button>
                        </a>
                        <button
                          data-modal-target="popup-modal"
                          data-modal-toggle="popup-modal"
                          className="me-2 custom-hover-button text-red-500 rounded-md border border-red-500 w-20 h-8 text-sm text-center mt-2"
                          onClick={() => handleReject(applicant.id)}
                        >
                          Reject
                        </button>
                        <button
                          className="custom-hover-button text-white rounded-md bg-blue-600 w-20 h-8 text-sm text-center"
                          onClick={() => handleAccept(applicant.id)}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      ) : (
        <div className="mt-8 text-center">
          <p>No applicants have applied yet.</p>
        </div>
      )}
    </div>
  );
};

export default AppliedApplicants;
