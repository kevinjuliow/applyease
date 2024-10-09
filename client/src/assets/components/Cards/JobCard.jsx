import PropTypes from "prop-types";
import CompanyPict from "../../images/default.jpg";
import { useNavigate } from "react-router-dom";

// Utility function to truncate text
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const JobCard = ({ job, companyName }) => {
  const navigate = useNavigate();

  // Function to handle card click
  const handleCardClick = () => {
    navigate(`/dashboard/jobs/${job.id}`); 
  };

  return (

    <div
      onClick={handleCardClick} 
      className="w-full h-[450px] lg:h-[500px] border border-gray-300 rounded-lg px-2 py-2 mb-2 overflow-hidden mx-auto cursor-pointer transition-shadow duration-300"
      style={{ boxShadow: '3px 3px 1px rgba(0, 0, 0, .1)' }}
    >
      <img src={CompanyPict} alt="Company" className="w-full h-48 p-5 object-cover" />
      <div className="flex flex-col">
        <div className="px-6 py-4 mt-[-16px] h-[260px]">
          <div className="font-bold text-xl mb-2">{job.position}</div>
          <div className="font-medium text-sm mb-2 text-gray-400 underline">{companyName}</div>
          <p className="text-gray-700 text-base">
            {truncateText(job.description, 18)}
          </p>
        </div>
        <div className="px-6 pb-3">
          <span className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {job.job_type.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;


JobCard.propTypes = {
  job: PropTypes.shape({
    position: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    id : PropTypes.number.isRequired, 
    job_type: PropTypes.string.isRequired,
  }).isRequired,
  companyName: PropTypes.string.isRequired,
};
