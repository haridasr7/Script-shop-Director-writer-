import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Forget from "./components/Forget";
import { Fragment } from "react";
import Reset from "./components/Reset";
import Profile from "./components/Profile";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/signup";
import Landing from "./components/Landing";
import Header from "./components/Header";
import DirectorHome from "./components/director/pages/DirectorHome";
import MyScript from "./components/script";
import ReadMore from "./components/director/pages/ReadMore";
import ReadAndDownload from "./components/director/pages/ReadAndDownload";
import AllScripts from "./components/director/pages/AllScripts";
import ContactUs from "./components/director/pages/ContactUs";
import FavoriteScripts from "./components/director/pages/FavoriteScripts";
import WriterDetail from "./components/director/pages/WriterDetails";
// import PurchasedScripts from "./components/director/pages/PurchasedScripts";
import ReadNow from "./components/director/pages/ReadNow";
import AllPurchased from "./components/director/pages/AllPurchased";
import DirectorProfile from "./components/director/pages/DirectorProfile";
import Privacypolicy from "./components/Privacypolicy";
import Services from "./components/director/pages/Services";
import Updatepassword from "./components/updatepassword";
import PublishScript from "./components/PublishScript";
import AdminSidebar from "./components/Admin/components/AdminSidebar";
import AdminHome from "./components/Admin/pages/AdminHome";
import AdminLogin from "./components/Admin/pages/AdminLogin";
<<<<<<< HEAD
import PurchaseHistory from "./components/PurchaseHistory";
=======
import ForgotPassword from "./components/Admin/pages/Adminforgot";
import { resetPassword } from "./actions/userActions";
import ResetPassword from "./components/Admin/pages/Adminresetpassword";

>>>>>>> 06f6c44d81cb0d85866ef2fa87bdb3c353aa87d5

function App() {
  return (
    <Fragment className="body">
      <ToastContainer theme="dark" />

      <Routes>
        <Route exact path="/Profile" Component={Profile} />
        <Route exact path="/login" Component={LoginPage} />
        <Route exact path="/Forget" Component={Forget} />
        <Route exact path="/Reset" Component={Reset} />
        <Route exact path="/signup" Component={Signup} />
        <Route exact path="/password/reset/:token" element={<Reset />} />
        <Route exact path="/" Component={Landing} />
        <Route exact path="/Writerhome" Component={Header} />
        <Route exact path="/Directorhome" Component={DirectorHome} />
        <Route exact path="/myscript" Component={MyScript} />
        <Route exact path="/readmore/:scriptId" Component={ReadMore} />
        <Route exact path="/readnow" Component={ReadAndDownload} />
        <Route exact path="/scripts/:type/:genre" Component={AllScripts} />
        <Route exact path="/ContactUs" Component={ContactUs} />
        <Route exact path="/myfavorites" Component={FavoriteScripts} />
        <Route exact path="/writerdetails" Component={WriterDetail} />
        {/* <Route exact path="/purchasehistory" Component={PurchasedScripts} /> */}
        <Route exact path="/readscript/:scriptId" Component={ReadNow} />
        <Route exact path="/purchasedAll" Component={AllPurchased} />
        <Route exact path="/directorprofile" Component={DirectorProfile} />
        <Route exact path="/privacy&policy" Component={Privacypolicy} />
        <Route exact path="/services" Component={Services} />
        <Route exact path="/updatepassword" Component={Updatepassword} />
        <Route exact path="/publishscript" Component={PublishScript} />
        <Route exact path="/AdminHome" Component={AdminHome} />
        <Route exact path="/AdminLogin" Component={AdminLogin} />
<<<<<<< HEAD
        <Route exact path="/PurchaseHistory" Component={PurchaseHistory} />
=======
        <Route exact path="/Adminforget" Component={ForgotPassword} />
        <Route exact path="/Adminreset" Component={ResetPassword} />
      
>>>>>>> 06f6c44d81cb0d85866ef2fa87bdb3c353aa87d5
      </Routes>
    </Fragment>
  );
}
export default App;
