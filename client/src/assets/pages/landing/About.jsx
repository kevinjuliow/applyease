import register from "../../images/appregistration.png"
import search from "../../images/search.png"
import waiting from "../../images/hourglass.png"
import complete from "../../images/complete.png"

const About = () => {
  return (
    <>
    <div className="h-auto flex flex-col items-center justify-center fixed bottom-0 mb-5 bg-transparent z-[99]">
      <div className="flex justify-between items-start md:h-auto h-[180px]">
        <div className="flex flex-col items-center justify-center w-[80px] md:w-[140px] md:mt-0 mt-20 z-[99] md:mx-6 mx-0 hover:-translate-y-4 ease-in-out duration-300 md:static relative left-6">
          <div className="border-4 border-purple-700 rounded-full p-4 md:p-5 bg-white  z-[99]">
            <img src={search} alt="" className="w-6 md:w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Search</p>
          <p className="text-sm text-gray-500 text-center md:block hidden">Find a job based on your experience</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[80px] md:w-[140px] mx-6 hover:-translate-y-4 ease-in-out duration-300">
          <div className="border-4 border-purple-700 rounded-full p-4 md:p-5 bg-white">
            <img src={register} alt="" className="w-6 md:w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Register</p>
          <p className="text-sm text-gray-500 text-center md:block hidden">Apply for a job with easy step</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[80px] md:w-[140px] mx-6 hover:-translate-y-4 ease-in-out duration-300">
          <div className="border-4 border-purple-700 rounded-full p-4 md:p-5 bg-white">
            <img src={waiting} alt="" className="w-6 md:w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Waiting</p>
          <p className="text-sm text-gray-500 text-center md:block hidden">Waiting for company approval</p>
        </div>
        <div className="flex flex-col items-center justify-center w-[80px] md:w-[140px] md:mt-0 mt-20 md:mx-6 mx-0 hover:-translate-y-4 ease-in-out duration-300 md:static relative right-6">
          <div className="border-4 border-purple-700 rounded-full p-4 md:p-5 bg-white">
            <img src={complete} alt="" className="w-6 md:w-10" />
          </div>
          <p className="text-xl font-semibold mt-2 mb-1">Approved</p>
          <p className="text-sm text-gray-500 text-center md:block hidden">Getting your dream job, you always wanted</p>
        </div>
      </div>
    </div>
    <div className="fixed bg-purple-200 bottom-0 w-[88%] h-[148px] z-[98] rounded-t-full shadow-1xl"></div>
    <div className="fixed bg-purple-100 bottom-0 w-[90%] h-[160px] z-[98] rounded-t-full shadow-2xl"></div>
    </>
  )
}

export default About