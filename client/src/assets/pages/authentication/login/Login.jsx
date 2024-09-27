import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthContext } from '../../../../context/api/AuthProvider';

const YupSigninSchema = yup.object().shape({
  email: yup.string().email("Email format must be valid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(YupSigninSchema)
  });

  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { loginCompany, loginApplicant } = useContext(AuthContext)

  const handleForm = handleSubmit(async (values) => {
    console.log('SUBMITTED')
    setLoading(true);
    await loginApplicant(values.email, values.password, setError, setLoading)
    await loginCompany(values.email, values.password, setError, setLoading)
  });

  return (
    <div className="w-full flex flex-col items-center justify-center relative h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign in</h1>
      <form className="max-w-sm mx-auto w-[80%] md:w-[320px]" onSubmit={handleForm}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            required
            {...register("email")}
          />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          {errors?.email && <p className="text-[12px] mt-2 text-red-500">{errors.email?.message}</p>} 
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            required
            {...register("password")}
          />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {errors?.password && <p className="text-[12px] mt-2 text-red-500">{errors.password?.message}</p>} 
        </div>
        {error && <p className="text-[12px] mb-4 text-red-500">Invalid credentials, username or password might wrong. Try again</p>}
        <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          {
            loading ? 
            <div role="status" className="">
                <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            : 'Login'
          }
        </button>
      </form>
      <p className="mt-6">dont have an account? <a href={"/register"} className="underline text-gray-800 dark:text-blue-600">sign up</a></p>
    </div>
  )
}

export default Login;
