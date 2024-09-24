import SearchBar from "../../../components/SearchBar/SearchBar";
import JobCard from "../../../components/Cards/JobCard";

const DashboardContent = () => {
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="h-full w-ful">
      <div>
        <div className="flex gap-2">
          <SearchBar />
        </div>
       
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center mt-16">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
    
      </div>
    </div>
  );
};

export default DashboardContent;
