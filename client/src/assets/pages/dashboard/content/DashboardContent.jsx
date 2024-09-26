import SearchBar from "../../../components/SearchBar/SearchBar";
import JobCard from "../../../components/Cards/JobCard";
import { useContext, useEffect, useState } from "react";
import { JobContext } from "../../../../context/api/JobProvider";
import SkeletonCard from "../../../components/Cards/SkeletonCard";
import PropTypes from "prop-types";

const DashboardContent = () => {
  const { indexJob } = useContext(JobContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await indexJob();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [indexJob]);

  const skeletonJobs = [1, 2, 3, 4, 5, 6];

  return (
    <div className="h-full w-full">
      <div>
        {/* Search Bar */}
        <div className="flex gap-2">
          <SearchBar />
        </div>

        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center mt-16">
            {skeletonJobs.map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center mt-16">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p>No jobs available</p>
            )}
          </div>
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
    job_type : PropTypes.string.isRequired
  }).isRequired,
};