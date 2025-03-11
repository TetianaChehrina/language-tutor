import CustomToaster from "../CustomToaster/CustomToaster.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <CustomToaster />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
