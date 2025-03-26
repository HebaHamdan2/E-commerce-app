import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const AuthRedirectRoute = () => {
  const auth= useContext(AuthContext);
  if (auth?.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRedirectRoute;
