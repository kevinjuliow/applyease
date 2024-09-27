import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../../../components/SearchBar/SearchBar";
import JobCard from "../../../components/Cards/JobCard";
import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../../../context/api/JobProvider";
import { CompanyContext } from "../../../../context/api/CompanyProvider";
import SkeletonCard from "../../../components/Cards/SkeletonCard";
import PropTypes from "prop-types";

const DashboardContent = () => {
  const { indexJob } = useContext(JobContext);
  const { showCompany } = useContext(CompanyContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(""); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await indexJob();

        // Fetch company names and map to jobs
        const jobsWithCompany = await Promise.all(
          fetchedJobs.map(async (job) => {
            try {
              const company = await showCompany(job.company_id);
              return { ...job, companyName: company.name };
            } catch (error) {
              console.error(`Error fetching company for job ${job.id}:`, error);
              return { ...job, companyName: "Unknown" };
            }
          })
        );

        setJobs(jobsWithCompany);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [indexJob, showCompany]);

  const filteredJobs = jobs.filter((job) => 
    job.position.toLowerCase().includes(query.toLowerCase()) ||
    job.companyName.toLowerCase().includes(query.toLowerCase())
  );

  const skeletonJobs = [1, 2, 3, 4, 5, 6];

  return (
    <div className="h-screen w-full overflow-y-scroll relative">
      <div>
      </div>
      <div>
        {/* Single Search Bar */}
        <div className="flex gap-2">
          <SearchBar query={query} setQuery={setQuery} placeholder="Search jobs or companies" />
        </div>

        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center mt-16">
            {skeletonJobs.map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : (
          <motion.div
            layout 
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center mt-16"
          >
            <AnimatePresence>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <JobCard job={job} companyName={job.companyName} />
                  </motion.div>
                ))
              ) : (
                <p>No jobs available</p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;

JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    job_type: PropTypes.string.isRequired,
  }).isRequired,
  companyName: PropTypes.string.isRequired,
};
