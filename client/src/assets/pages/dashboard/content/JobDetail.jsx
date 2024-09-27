import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import defaultCompanyPic from '../../../images/default.jpg';
import { JobContext } from '../../../../context/api/JobProvider';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showJob } = useContext(JobContext);
  const { token } = JSON.parse(localStorage.getItem('user')) || {}; // Safely parse the token

  const handleApply = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ROUTE}/api/apply/${id}`, // Use job ID in the API endpoint
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers for authentication
          },
        }
      );

      if (response.status === 201) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error applying for the job:', error);
      setError("You have already apply to this job");
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await showJob(id);
        console.log(response);
        setJob(response);
      } catch (err) {
        setError("Error fetching job details. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, showJob]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div> {/* Replace this with a spinner or loading animation */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">No job details available.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={defaultCompanyPic} alt="Company" className="w-full h-48 object-cover" />
        <div className="p-6">
          <h2 className="font-bold text-3xl mb-2 text-gray-800">{job.position}</h2>
          <p className="text-gray-500 mb-2">Company: <span className="font-semibold text-gray-700">{job.company_name}</span></p>
          <p className="text-gray-700 mb-4">{job.description}</p>
          <div className="flex justify-between mb-4">
            <p className="font-semibold text-lg text-gray-800">Salary: <span className="text-green-600">${job.salary}</span></p>
            <p className="text-gray-500">Job Type: <span className="font-medium text-gray-600">{job.type}</span></p>
          </div>
          <p className="text-gray-500">Posted on: <span className="font-medium text-gray-600">{new Date(job.created_at).toLocaleDateString()}</span></p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Return
        </button>
        <button
          onClick={handleApply} // Trigger the apply function
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition ml-4"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
