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
    navigate(`/dashboard/jobs/${job.company_id}`); 
  };

  return (

    <div
      onClick={handleCardClick} 
      className="w-full max-w-xs min-w-xl rounded overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      <img src={CompanyPict} alt="Company" className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{job.position}</div>
        <div className="font-medium text-sm mb-2 text-gray-400 underline">{companyName}</div>
        <p className="text-gray-700 text-base">
          {truncateText(job.description, 20)}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {job.job_type}
        </span>
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
    job_type: PropTypes.string.isRequired,
  }).isRequired,
  companyName: PropTypes.string.isRequired,
};
