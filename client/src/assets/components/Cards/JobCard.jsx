import PropTypes from "prop-types";
import CompanyPict from "../../images/default.jpg";

const JobCard = ({job}) => {
  return (
    <div className="w-full max-w-xs min-w-xl rounded overflow-hidden shadow-lg mx-auto">
      <img src={CompanyPict} alt="Company" className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{job.position}</div>
        <p className="text-gray-700 text-base">
          {job.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #IT
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #software
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};

export default JobCard;

JobCard.propTypes = {
  job: PropTypes.node.isRequired,
};

