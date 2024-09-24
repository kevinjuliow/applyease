import CompanyPict from "../../images/default.jpg";

const JobCard = () => {
  return (
    <div className="w-full max-w-xs rounded overflow-hidden shadow-lg mx-auto">
      <img src={CompanyPict} alt="Company" className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Software Engineer</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
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
