import { Navigate, Outlet } from 'react-router-dom';  // Correct import of Navigate component
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
const ProtectedRoute = () => {
  const auth= useContext(AuthContext);

  // If the user is not authenticated, redirect to the signup page
  if (!auth?.isAuthenticated) {
    return <Navigate to="/signup" />; // Correct use of Navigate as a component
  }

  // If the user is authenticated, allow access to the protected route 
  return <Outlet />;
};

export default ProtectedRoute;
