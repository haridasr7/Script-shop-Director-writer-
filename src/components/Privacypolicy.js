import React from "react";
import "./privacypolicy.css";
import NavbarWriter from "./writernavbar/NavbarWriter";
import Footerwriter from "./writernavbar/Footerwriter";
import { Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Navbarlanding from "./navbarlanding/Navbarlanding";
import FooterLanding from "./navbarlanding/Footerlanding";

import Navbar from "../components/director/component/NavbarDirector";
import FooterDirector from "../components/director/component/FooterDirector";
const Privacypolicy = () => {
  const { loading, error, message, user } = useSelector(
    (state) => state.authState
  );
  return (
    <div>
      {user ? (
        user.role[0] === "director" ? (
          <Navbar />
        ) : (
          <NavbarWriter />
        )
      ) : (
        <Navbarlanding />
      )}
      <br />
      <div className="wprivacypolicy" style={{ marginTop: "15%" }}>
        <Container>
          <Box>
            <h3>
              Privacy & Policy for{" "}
              <span style={{ color: "blue" }}>ScriptShop</span>
            </h3>
            <h4 style={{ marginTop: "4%" }}>
              ScriptShop is committed to protecting the privacy of our users.
              This Privacy Policy outlines how we collect, use, disclose, and
              protect your personal information when you use our ScriptShop
              website and application (collectively referred to as the
              "Service"). By using our Service, you agree to the practices
              described in this Privacy Policy. If you do not agree to this
              Privacy Policy, please do not use our Service.
            </h4>
          </Box>
          <Box
            sx={{
              padding: "20px",
              color: "black",
              justifyContent: "center",
            }}
          >
            <p>
              <h2>1. Information We Collect</h2>
              <br />
              <br />
              <b>Information You Provide:</b>
              <br />
              <br /> When you sign up for an account, use our Service, or
              communicate with us, we may collect personal information,
              including but not limited to:
              <br />
              <br />
              - Your name
              <br />
              - Email address
              <br />
              - Username and password
              <br />
              - Profile information (e.g., biography, profile picture)
              <br />
              - Scripts and content you upload
              <br />
              - Communications with other users <br />
              <br />
              <b>Automatically Collected Information:</b> <br />
              <br /> We may automatically collect certain information when you
              use our Service, such as:
              <br />
              - Device information (e.g., device type, operating system)
              <br />
              - Usage information (e.g., log data, analytics)
              <br />
              - Cookies and similar tracking technologies
              <br />
              <br />
              <b>Tracking Technologies and Cookies</b> <br />
              <br />
              We use Cookies and similar tracking technologies to track the
              activity on Our Service and store certain information. Tracking
              technologies used are beacons, tags, and scripts to collect and
              track information and to improve and analyze Our Service. The
              technologies We use may include:
              <br />
              <br />
              <b> · Cookies or Browser Cookies.</b> A cookie is a small file
              placed on Your Device. You can instruct Your browser to refuse all
              Cookies or to indicate when a cookie is being sent. However, if
              You do not accept Cookies, You may be unable to use some parts of
              our Service. Unless you have adjusted Your browser setting so that
              it will refuse cookies, our Service may use Cookies.
              <br />
              <br />
              <b>· Web Beacons.</b> Certain sections of our Service and our
              emails may contain small electronic files known as web beacons
              (also referred to as clear gifs, pixel tags, and single- pixel
              gifs) that permit the Company, for example, to count users who
              have visited those pages or opened an email and for other related
              website statistics (for example, recording the popularity of a
              specific section and verifying system and server integrity).
              Cookies can be "Persistent" or "Session" Cookies. Persistent
              Cookies remain on Your personal computer or mobile device when You
              go offline, while Session Cookies are deleted as soon as You close
              Your web browser. We use both Session and Persistent Cookies for
              the purposes set out below:
              <br />
              <br />
              <b>Necessary / Essential Cookies</b>
              <br />
              <br />
              Type: Session Cookies
              <br />
              <br />
              Administered by: Us
              <br />
              <br />
              Purpose: These Cookies are essential to provide You with services
              available through the Website and to enable You to use some of its
              features. They help to authenticate users and prevent fraudulent
              use of user accounts. Without these Cookies, the services that You
              have asked for cannot be provided, and We only use these Cookies
              to provide You with those services.
              <br />
              <br />
              <b>Cookies Policy / Notice Acceptance Cookies</b> <br />
              <br />
              Type: Persistent Cookies
              <br />
              <br />
              Administered by: Us
              <br />
              <br />
              Purpose: These Cookies identify if users have accepted the use of
              cookies on the Website.
              <b>Functionality Cookies</b>
              <br />
              <br />
              Type: Persistent Cookies
              <br />
              <br />
              Administered by: Us
              <br />
              <br />
              Purpose: These Cookies allow us to remember choices You make when
              You use the Website, such as remembering your login details or
              language preference. The purpose of these Cookies is to provide
              You with a more personal experience and to avoid having to re-
              enter your preferences every time You use the Website.
              <br />
              <br />
              For more information about the cookies we use and your choices
              regarding cookies, please visit our Cookies Policy or the Cookies
              section of our Privacy Policy.
              <br />
              <br />
              <h2>2. How We Use Your Information</h2> <br />
              <br />
              The Company may use Personal Data for the following purposes:
              <br />
              <br />
              To provide and maintain our Service, including monitoring the
              usage of our Service.
              <br />
              <br />
              <b>To manage Your Account:</b> to manage Your registration as a
              user of the Service. The Personal Data You provide can give You
              access to different functionalities of the Service that are
              available to You as a registered user.
              <br />
              <br />
              <b>For the performance of a contract:</b> the development,
              compliance and undertaking of the purchase contract for the
              products, items or services You have purchased or of any other
              contract with Us through the Service.
              <br />
              <br />
              <b>To contact You:</b> To contact You by email, telephone calls,
              SMS, or other equivalent forms of electronic communication, such
              as a mobile application's push notifications regarding updates or
              informative communications related to the functionalities,
              products or contracted services, including the security updates,
              when necessary or reasonable for their implementation.
              <br />
              <br />
              <b>To provide You</b> with news, special offers and general
              information about other goods, services and events that we offer
              that are similar to those that you have already purchased or
              enquired about unless You have opted not to receive such
              information.
              <br />
              <br />
              <b>For other purposes:</b> We may use Your information for other
              purposes, such as data analysis, identifying usage trends,
              determining the effectiveness of our promotional campaigns and
              evaluating and improving our Service, products, services,
              marketing and your experience.
              <br />
              <br />
              We may share Your personal information in the following
              situations:
              <br />
              <br />
              <b>· With Service Providers: </b>We may share Your personal
              information with Service Providers to monitor and analyze the use
              of our Service, and to contact You.
              <br />
              <br />
              <b>· · With other users:</b> When you share personal information
              or otherwise interact in the public areas with other users, such
              information may be viewed by all users and may be publicly
              distributed outside. If You interact with other users or register
              through a Third-Party Social Media Service, Your contacts on the
              Third-Party Social Media Service may see Your name, profile,
              pictures and description of Your activity. Similarly, other users
              will be able to view descriptions of Your activity, communicate
              with You and view Your profile.
              <br />
              <br />
              <h2>3. Information from Third-Party Social Media Services</h2>
              <br />
              The Company allows You to create an account and log in to use the
              Service through the following Third-party Social Media Services: ·
              Google · Facebook · Instagram · Twitter · LinkedIn If You decide
              to register through or otherwise grant us access to a Third-Party
              Social Media Service, We may collect Personal data that is already
              associated with Your Third-Party Social Media Service's account,
              such as Your name, Your email address, Your activities or Your
              contact list associated with that account. You may also have the
              option of sharing additional information with the Company through
              Your Third-Party Social Media Service's account. If You choose to
              provide such information and Personal Data, during registration or
              otherwise, You are giving the Company permission to use, share,
              and store it in a manner consistent with this Privacy Policy.
              <br />
              <br />
              <h2>4. Choices</h2>
              <br />
              You can control certain information by: - Updating your account
              settings - Adjusting your privacy preferences - Deleting your
              account (subject to our retention policies)
              <br />
              <br />
              <h2>5. Security</h2>
              <br />
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
              <br />
              <br />
              <h2>6. Changes to this Privacy Policy</h2>
              <br />
              We may update this Privacy Policy from time to time, and any
              changes will be posted on this page with an updated effective
              date. Your continued use of the Service after any changes
              constitute your acceptance of the revised Privacy Policy.
              <br />
              <br />
              <h2>7. Contact Us</h2>
              <br />
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:8020305033
            </p>
          </Box>
        </Container>
      </div>
      <br />
      <br />
      <br />
      {user ? (
        user.role[0] === "director" ? (
          <FooterDirector />
        ) : (
          <Footerwriter />
        )
      ) : (
        <FooterLanding />
      )}
    </div>
  );
};
export default Privacypolicy;
