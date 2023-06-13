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
import AddRequest from './pages/AddRequest/addRequest';
import Contact from './pages/Contact/contact';
import About from './pages/About/About';
import TermsAndConditions from './pages/Conditions/Terms/terms';
import PrivacyPolicy from './pages/Conditions/Privacy/privacy';
import NotFound from './pages/404/404';
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

const MapLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

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
        path: '/add',
        element: <AddRequest />,
      },
      {
        path: '/contact-us',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
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
    element: <MapLayout />,
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
