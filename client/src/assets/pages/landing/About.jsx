import register from "../../images/appregistration.png"
import search from "../../images/search.png"
import waiting from "../../images/hourglass.png"
import complete from "../../images/complete.png"

const About = () => {
  return (
    <>
    <div className="h-auto flex flex-col items-center justify-center absolute bottom-0 mb-5 bg-transparent">
      <div className="flex justify-between items-start">
        <div className="flex flex-col items-center justify-center w-[140px] mx-6 hover:-translate-y-2 ease-in-out duration-400">
          <div className="border-4 border-purple-700 rounded-full p-5 bg-white">
            <img src={search} alt="" className="w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Search</p>
          <p className="text-sm text-gray-500 text-center">Find a job based on your experience</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[140px] mx-6 hover:-translate-y-4 ease-in-out duration-300">
          <div className="border-4 border-purple-700 rounded-full p-5 bg-white">
            <img src={register} alt="" className="w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Register</p>
          <p className="text-sm text-gray-500 text-center">Apply for a job with easy step</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[140px] mx-6 hover:-translate-y-4 ease-in-out duration-300">
          <div className="border-4 border-purple-700 rounded-full p-5 bg-white">
            <img src={waiting} alt="" className="w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Waiting</p>
          <p className="text-sm text-gray-500 text-center">Waiting for company approval</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[140px] mx-6 hover:-translate-y-4 ease-in-out duration-300">
          <div className="border-4 border-purple-700 rounded-full p-5 bg-white">
            <img src={complete} alt="" className="w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Approved</p>
          <p className="text-sm text-gray-500 text-center">Getting your dream job, you always wanted</p>
        </div>
      </div>
    </div>
    <div className="absolute bg-purple-200 bottom-0 w-[98%] h-[148px] z-[-98] rounded-t-full shadow-1xl"></div>
    <div className="absolute bg-purple-100 bottom-0 w-full h-[160px] z-[-99] rounded-t-full shadow-2xl"></div>
    </>
  )
}

export default About