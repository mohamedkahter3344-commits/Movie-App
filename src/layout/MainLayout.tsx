import Footer from "../components/Footer/Footer";
import NavbarComp from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="w-[98%] mx-auto">
        <NavbarComp />
        <Outlet />
        <Footer/>
      </div>
    </>
  );
};

export default MainLayout;
