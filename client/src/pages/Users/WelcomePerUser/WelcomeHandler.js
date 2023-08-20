import React, { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import WelcomeAdmin from './WelcomeAdmin';
import WelcomeUser from './WelcomeUser';
import WelcomeRecycler from './WelcomeRecycler';
import WelcomeManager from './WelcomeManager';

const WelcomeHandler = () => {
  const { currentUser } = useContext(AuthContext);
  switch (currentUser.role) {
    case 1:
      return <WelcomeAdmin />;
    case 2:
      return <WelcomeUser />;
    case 3:
      return <WelcomeRecycler />;
    case 4:
      return <WelcomeManager />;
    case 5:
      return <WelcomeUser />;
    default:
      return <div>Error: Invalid user role.</div>;
  }
};

export default WelcomeHandler;
