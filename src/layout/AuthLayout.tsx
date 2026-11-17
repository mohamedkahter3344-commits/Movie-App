
import NavbarComp from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const AuthLayout = () => {
  return (
      <div className="w-[98%] mx-auto">
        <NavbarComp />
        <Outlet />
        <Footer/>
      </div>
  )
}

export default AuthLayout
