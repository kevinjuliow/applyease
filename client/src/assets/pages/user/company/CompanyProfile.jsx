import Layout from "../../../components/layout/Layout"
import defaultProfile from "../../../images/defaultProfile.png"

const CompanyProfile = () => {
  return (
    <Layout>
      <div className="px-4 mx-4 border mt-20">
        <div className="mt-20 flex flex-col items-center justify-center border mb-4 my-4 px-8 py-8">
          <img src={defaultProfile} alt="profile picture" className="rounded-full w-28 absolute top-[100px]" />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mt-10">Google</h1>
            <div className="flex items-center justify-center mt-2">
              <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#6b7280">
                <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="#6b7280" strokeWidth="1.5"></path>
                <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="#6b7280" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <h2 className="ms-1 text-md font-bold text-gray-500">MOUNTAIN VIEW, CALIFORNIA, AMERICA</h2>
            </div>
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-purple-500" />
          <p className="text-center w-[80%]">Google, founded in 1998 by Larry Page and Sergey Brin, is a global technology company known for its search engine, which organizes and provides access to vast amounts of information. It has since expanded into numerous fields, including advertising, cloud computing, software, hardware, and artificial intelligence. As part of its parent company, Alphabet Inc., Google also leads innovation in areas like self-driving cars (Waymo), healthcare, and digital services. With a mission to organize the worlds information and make it universally accessible and useful Google plays a central role in the digital age.</p>
        </div>
      </div>
    </Layout>
  )
}

export default CompanyProfile