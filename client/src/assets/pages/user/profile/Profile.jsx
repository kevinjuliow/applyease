import { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import defaultProfile from "../../../images/defaultProfile.png";
import { CompanyContext } from "../../../../context/api/CompanyProvider";
import { ApplicantContext } from "../../../../context/api/ApplicantProvider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../../../components/ui/FileUpload";

const YupSigninSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  birthdate: yup
    .string()
    .required("Birth date is required")
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/,
      "Birth date must be in the format MM/DD/YYYY"
    ),
  address: yup.string(),
  phone: yup.number().required("Phone is required"),
});

const Profile = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [user, setUser] = useState({});

  const { showCompany } = useContext(CompanyContext);
  const { showApplicant } = useContext(ApplicantContext);
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  const handleCV = () => {
    const fetchApi = async () => {
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ROUTE}/api/upload/${
            authenticatedUser.id
          }`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authenticatedUser.token}`,
            },
          }
        );

        console.log("File uploaded successfully:", response.data);
        window.location.reload()
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };

    fetchApi();
  };

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setAuthenticatedUser(userFromLocalStorage);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (authenticatedUser) {
          if (authenticatedUser.status === "company") {
            const fetchData = await showCompany(authenticatedUser.id);
            setUser(fetchData);
          } else if (authenticatedUser.status === "applicant") {
            const fetchData = await showApplicant(authenticatedUser.id);
            setUser(fetchData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (authenticatedUser) {
      fetchUserData();
    }
  }, [authenticatedUser, showApplicant, showCompany]);

  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(YupSigninSchema),
  });

  const { errors } = formState;

  const handleForm = handleSubmit(async (values) => {
    console.log("SUBMITTED");
    const user = JSON.parse(localStorage.getItem("user"));
    setLoading(true);
    console.log(user);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_ROUTE}/api/applicants/${user.id}`,
        {
          full_name: values.fullname,
          birth_date: values.birthdate,
          address: values.address,
          phone: values.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log(response.data);
      if (response?.error) {
        throw new Error(response?.error);
      }
      window.location.reload();
      navigate("/dashboard/profile");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Layout>
      <div
        className={`absolute right-12 top-28 ms-2 custom-hover-button text-white rounded-md ${
          update ? "bg-red-600" : "bg-purple-700"
        }`}
      >
        <button className="w-24 h-10" onClick={handleUpdate}>
          {update ? "Cancel" : "Edit profile"}
        </button>
      </div>
      <form
        className="px-4 mx-4 border mt-0 w-[100%] bg-purple-100 shadow-lg rounded-lg"
        onSubmit={handleForm}
      >
        <div className="mt-24 flex flex-col items-center justify-center mb-4 my-4 px-8 py-8 bg-white shadow rounded-t-lg">
          <img
            src={defaultProfile}
            alt="profile picture"
            className="rounded-full w-[120px] absolute top-[40px] left-16 md:left-auto border-[8px] border-white"
          />

          <div className="flex flex-col items-center justify-center mt-16 w-full md:w-[50%]">
            {/* Name */}
            {update && (
              <div className="mb-5 w-full">
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={
                    authenticatedUser.status === "company"
                      ? user.name
                      : user.full_name
                  }
                  {...register("fullname")}
                />
                {errors?.fullname && (
                  <p className="text-[12px] mt-2 text-red-500">
                    {errors.fullname?.message}
                  </p>
                )}
              </div>
            )}

            {/* Birth date */}
            {update && (
              <div className="mb-5 w-full">
                <label
                  htmlFor="birthdate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Birth date
                </label>
                <input
                  type="text"
                  id="birthdate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={user.birth_date}
                  {...register("birthdate")}
                />
                {errors?.birthdate && (
                  <p className="text-[12px] mt-2 text-red-500">
                    {errors.birthdate?.message}
                  </p>
                )}
              </div>
            )}

            {/* Address */}
            {update && (
              <div className="mb-5 w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={user.address}
                  placeholder={
                    !user.address && "Address is empty, please fill it"
                  }
                  {...register("address")}
                />
                {errors?.address && (
                  <p className="text-[12px] mt-2 text-red-500">
                    {errors.address?.message}
                  </p>
                )}
              </div>
            )}

            {/* Phone */}
            {update && (
              <div className="mb-5 w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={user.phone}
                  {...register("phone")}
                />
                {errors?.phone && (
                  <p className="text-[12px] mt-2 text-red-500">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
            )}

            {/* {update && <div className="w-full text-center ms-2 custom-hover-button text-white rounded-md bg-purple-700">
              <button className="w-24 h-10" type="submit">Save update</button>
            </div>} */}

            {update && error && (
              <p className="text-[12px] mb-4 text-red-500">{error?.message}</p>
            )}
            {update && (
              <div className="w-full text-center ms-2 custom-hover-button text-white rounded-md bg-purple-700">
                <button
                  type="submit"
                  className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-base w-full px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                >
                  {loading ? (
                    <div role="status" className="">
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Save update"
                  )}
                </button>
              </div>
            )}

            {!update && (
              <>
                <h1 className="text-3xl text-center font-bold mt-0">
                  {authenticatedUser.status === "company"
                    ? user.name
                    : user.full_name}
                </h1>
                <div className="flex items-center justify-center flex-col md:flex-row">
                  <div className="flex items-center justify-center mt-2">
                    <svg
                      width="20px"
                      height="20px"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#6b7280"
                    >
                      <path
                        d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                      ></path>
                      <path
                        d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"
                        fill="#6b7280"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <h2 className="ms-1 text-md font-bold text-gray-500">
                      {user.address ? user.address : "Address isn't set"}
                    </h2>
                  </div>
                  <div className="ms-0 md:ms-3 flex items-center justify-center mt-2">
                    <svg
                      width="20px"
                      height="20px"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#6b7280"
                    >
                      <path
                        d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <h2 className="ms-1 text-md font-bold text-gray-500">
                      {user.phone}
                    </h2>
                  </div>
                </div>
                <div className="ms-1 text-md font-bold text-gray-500">
                  <p>CV : {user.cv === null ? "Empty" : user.cv}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </form>

      {authenticatedUser.status == "applicant" && (
        <>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-gray-100 border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>

          <button
            className="px-8 mt-4 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
            onClick={handleCV}
          >
            Upload
          </button>
        </>
      )}
    </Layout>
  );
};

export default Profile;
