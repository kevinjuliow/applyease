import { useContext, useEffect, useState } from "react";
import defaultProfile from "../../../images/defaultProfile.png";
import axios from "axios";
import { JobContext } from "../../../../context/api/JobProvider";
import { CompanyContext } from "../../../../context/api/CompanyProvider";

const MyApplications = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;
  const [appliedJob, setAppliedJob] = useState([]);
  const { showJob } = useContext(JobContext);
  const { showCompany } = useContext(CompanyContext);
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/applied`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppliedJob(response.data.applied);

  
        await Promise.all(
          response.data.applied.map(async (job) => {
            const respJob = await showJob(job.job_id);
            const respCompany = await showCompany(respJob.company_id);

            setCompany((prevCompanies) => [...prevCompanies, respCompany]);
            setJobs((prevJobs) => [...prevJobs, respJob]);
          })
        );

        setIsLoading(false); // Data fetching is complete
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setIsLoading(false); // Even on error, stop loading
      }
    };

    if (token) {
      fetchApplied();
    }
  }, [token, showJob, showCompany]);

  return (
    <div className="w-full h-full">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 w-full border-b-2">
        {appliedJob.map((job, index) => (
          <li key={index} className="pb-3 sm:pb-4 w-full">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4">
              <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src={defaultProfile} alt="Company Logo" />
              </div>
              <div className="flex-1 min-w-0">
                {/* Skeletons for loading state */}
                {isLoading ? (
                  <>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-36 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-32 animate-pulse"></div>
                  </>
                ) : (
                  <>
                    {/* Display company name */}
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {company[index]?.name || "Company Name"}
                    </p>
                    {/* Display company email */}
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {company[index]?.email || "Company Email"}
                    </p>
                    {/* Display job name */}
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {jobs[index]?.position || "Job Name"}
                    </p>
                  </>
                )}
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white pr-20">
                {appliedJob[index].status || "Status"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyApplications;
