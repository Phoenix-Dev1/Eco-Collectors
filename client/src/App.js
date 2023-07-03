import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Footer from './components/Footer/footer';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Map from './components/map/Map';
import RecyclerRegister from './pages/RecyclerRegister/recyclerRegister';
import RecyclersManagerRegister from './pages/RecyclersManagerRegister/recyclersManagerRegister';
import User from './pages/Users/user';
import Contact from './pages/Contact/contact';
import CollectRequest from './pages/CollectRequest/CollectRequest';
import About from './pages/About/About';
import TermsAndConditions from './pages/Conditions/Terms/terms';
import PrivacyPolicy from './pages/Conditions/Privacy/privacy';
import NotFound from './pages/404/404';
import Dashboard from './pages/Users/usersDashboard';
import './index.css';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const NoFooterLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <User />
      <Dashboard />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/collect',
        element: <CollectRequest />,
      },
      {
        path: '/contact-us',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/manager-join',
        element: <RecyclersManagerRegister />,
      },
    ],
  },
  {
    path: '/user',
    element: <DashboardLayout />,
    children: [

    ]
  },
  {
    path: '/terms',
    element: <TermsAndConditions />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/privacy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/contact-us',
    element: <Contact />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/map',
    element: <NoFooterLayout />,
    children: [
      {
        path: '/map/',
        element: <Map />,
      },
      {
        path: '/map/:id',
        element: <Map />,
      },
    ],
  },
  {
    path: '/join',
    element: <NoFooterLayout />,
    children: [
      {
        path: '/join',
        element: <RecyclerRegister />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
