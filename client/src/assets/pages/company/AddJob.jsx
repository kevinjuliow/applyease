import { useState } from "react";
import Layout from "../../components/layout/Layout"
// import { CompanyContext } from "../../../context/api/CompanyProvider";
// import { ApplicantContext } from "../../../context/api/ApplicantProvider";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios';
import { useNavigate,  } from 'react-router-dom';

const YupSigninSchema = yup.object().shape({
  jobType: yup.string().required("Job type is required"),
  position: yup.string().required("Position is required"),
  salary: yup.number().required("Salary is required"),
  description: yup.string().required("Description is required"),
});

const AddJob = () => {
  // const [authenticatedUser, setAuthenticatedUser] = useState({});
  // const [user, setUser] = useState({});
  
  // const { showCompany } = useContext(CompanyContext);
  // const { showApplicant } = useContext(ApplicantContext);
  
  // useEffect(() => {
  //   const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  //   setAuthenticatedUser(userFromLocalStorage);
  // }, []);
  
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       if (authenticatedUser) {
  //         if (authenticatedUser.status === "company") {
  //           const fetchData = await showCompany(authenticatedUser.id);
  //           setUser(fetchData);
  //         } else if (authenticatedUser.status === "applicant") {
  //           const fetchData = await showApplicant(authenticatedUser.id);
  //           setUser(fetchData);
  //         }
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   if (authenticatedUser) {
  //     fetchUserData(); 
  //   }
  // }, [authenticatedUser, showApplicant, showCompany]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(YupSigninSchema)
  });

  const { errors } = formState;

  const handleForm = handleSubmit(async (values) => {
    console.log('SUBMITTED')
    const user = JSON.parse(localStorage.getItem('user'))
    setLoading(true);
    console.log({user})
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_ROUTE}/api/jobs`, {
        'description': values.description,
        'position': values.position,
        'salary': values.salary,
        'job_type': values.jobType
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      })

      console.log(response.data);
      if (response?.error) {
        throw new Error(response?.error);
      }
      // window.location.reload();
      navigate('/dashboard')

    } catch (error) {
      setError(error);
      console.log({error})
    } finally {
      setLoading(false); 
    }
  });

  return (
    <Layout>
      <div className="flex items-center justify-center w-full flex-col">
        <h1 className="text-4xl font-bold mb-6">Post a Job</h1>
        <form className="px-4 mx-4  mt-0 w-[100%] flex items-center justify-center" onSubmit={handleForm}>
          {/* <div className="mt-20 flex flex-col items-center justify-center mb-4 my-4 px-8 py-8 bg-white shadow rounded-t-lg"> */}
            <div className="flex flex-col items-center justify-center mt-0 w-full md:w-[50%]">
              {/* Job type */}
              <div className="mb-5 w-full">
                <label htmlFor="jobType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Job type
                </label>
                <select
                  id="jobType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("jobType")}
                >
                  <option value="">Select job type</option>
                  <option value="fulltime">Full time</option>
                  <option value="parttime">Part time</option>
                  <option value="contract">Contract</option>
                </select>
                {errors?.jobType &&
                  <p className="text-[12px] mt-2 text-red-500">{errors.jobType?.message}</p>} 
              </div>

              {/* Position */}
              <div className="mb-5 w-full">
                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("position")}
                />
                {errors?.position &&
                  <p className="text-[12px] mt-2 text-red-500">{errors.position?.message}</p>} 
              </div>
              
              {/* Salary */}
              <div className="mb-5 w-full">
                <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("salary")}
                />
                {errors?.salary &&
                  <p className="text-[12px] mt-2 text-red-500">{errors.salary?.message}</p>} 
              </div>

              {/* Description */}
              <div className="mb-5 w-full">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  rows={4}
                  type="text"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("description")}
                />
                {errors?.description &&
                  <p className="text-[12px] mt-2 text-red-500">{errors.description?.message}</p>} 
              </div>

              {/* {update && <div className="w-full text-center ms-2 custom-hover-button text-white rounded-md bg-purple-700">
                <button className="w-24 h-10" type="submit">Save update</button>
              </div>} */}

              {error && <p className="text-[12px] mb-4 text-red-500">{error?.message}</p>}
              <div className="w-full text-center ms-2 custom-hover-button text-white rounded-md bg-purple-700">
                <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-base w-full px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                  {
                    loading ? 
                    <div role="status" className="">
                        <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    : 'Post the job!'
                  }
                </button></div>
            </div>
            {/* { authenticatedUser.status === "company" && <p className="mt-10 text-center w-[100%]">Google, founded in 1998 by Larry Page and Sergey Brin, is a global technology company known for its search engine, which organizes and provides access to vast amounts of information. It has since expanded into numerous fields, including advertising, cloud computing, software, hardware, and artificial intelligence. As part of its parent company, Alphabet Inc., Google also leads innovation in areas like self-driving cars (Waymo), healthcare, and digital services. With a mission to organize the worlds information and make it universally accessible and useful Google plays a central role in the digital age.</p> } */}
          {/* </div> */}
        </form>
      </div>
    </Layout>
  )
}

export default AddJob