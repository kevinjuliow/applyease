import { SparklesCore } from '../../components/ui/sparkles'
import landingPageImage from '../../images/undraw_Job_offers_re_634p.png'

const Welcome = () => {
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row">
        <h1 className="text-6xl font-bold">Empowering your</h1>
        <h1 className="ms-2 text-6xl font-black bg-gradient-to-r from-purple-500 via-purple-700 to-red-500 text-transparent bg-clip-text">Career Journey</h1>
      </div>
      <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.5}
          maxSize={2}
          particleDensity={100}
          className="h-96 absolute z-0 w-full"
          particleColor="#a855f7"
        />

      <img src={landingPageImage} alt="" className="w-96 mt-4 mb-16 z-[-99] jumping-animation" />
    </div>
  )
}

export default Welcome