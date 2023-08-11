import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/footer';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Map from './components/map/Map';
import RecyclerRegister from './pages/RecyclerRegister/recyclerRegister';
import RecyclersManagerRegister from './pages/RecyclersManagerRegister/recyclersManagerRegister';
import Contact from './pages/Contact/contact';
import CollectRequest from './pages/CollectRequest/CollectRequest';
import About from './pages/About/About';
import TermsAndConditions from './pages/Conditions/Terms/terms';
import PrivacyPolicy from './pages/Conditions/Privacy/privacy';
import NotFound from './pages/404/404';
import UserLayout from './layouts/UserLayout';
import WelcomeHandler from './pages/Users/WelcomePerUser/WelcomeHandler';
import UpdateUserInformation from './pages/Users/ManageAccount/UpdateUserInformation';
import ChangePassword from './pages/Users/ManageAccount/ChangePassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import RequestStatus from './pages/Users/RequestStatus';
import UpdateRequest from './pages/Users/UpdateRequest';
import Cancelled from './pages/Users/RequestsPerStatus/Cancelled';
import Completed from './pages/Users/RequestsPerStatus/completed';
import Pending from './pages/Users/RequestsPerStatus/Pending';
import UserManagement from './pages/Users/AdminPanel/UserManagement';
import JoinRequests from './pages/Users/AdminPanel/JoinRequests';
import AllRequests from './pages/Users/AdminPanel/AllRequests';
import RecycleBins from './pages/Users/AdminPanel/RecycleBins/RecycleBins';
import UpdateBin from './pages/Users/AdminPanel/RecycleBins/UpdateBin';
import AddNewBin from './pages/Users/AdminPanel/RecycleBins/AddNewBin';
import './index.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collect" element={<CollectRequest />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/password-recovery" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/manager-join" element={<RecyclersManagerRegister />} />
        <Route path="/user/*" element={<UserLayout />}>
          <Route path="welcome" element={<WelcomeHandler />} />
          <Route path="update-user-info" element={<UpdateUserInformation />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="request-status" element={<RequestStatus />} />
          <Route path="update-request" element={<UpdateRequest />} />
          <Route path="cancelled-requests" element={<Cancelled />} />
          <Route path="completed-requests" element={<Completed />} />
          <Route path="pending-requests" element={<Pending />} />
        </Route>
        <Route path="/admin/*" element={<UserLayout />}>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="join-requests" element={<JoinRequests />} />
          <Route path="requests" element={<AllRequests />} />
          <Route path="bins" element={<RecycleBins />} />
          <Route path="update-bin/*" element={<UpdateBin />} />
          <Route path="add-bin" element={<AddNewBin />} />
        </Route>
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/map/*" element={<Map />} />
        <Route path="/join" element={<RecyclerRegister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
