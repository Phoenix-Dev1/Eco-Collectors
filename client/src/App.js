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
import MapPage from './pages/Map/map';
import Contact from './pages/Contact/contact';
import About from './pages/About/About';
import TermsAndConditions from './pages/Conditions/Terms/terms';
import PrivacyPolicy from './pages/Conditions/Privacy/privacy';
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
        path: '/map/:id',
        element: <MapPage />,
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
]);

function App() {
  /* Testing
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []); // [] - run only on the first render of component
*/
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
