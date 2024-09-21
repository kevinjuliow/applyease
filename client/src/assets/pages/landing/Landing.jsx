import Layout from "../../components/layout/Layout"
import About from "./About"
import Welcome from "./Welcome"

const Landing = () => {
  return (
    <Layout>
      <Welcome />
      <About />
    </Layout>
  )
}

export default Landing