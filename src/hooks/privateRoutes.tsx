import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {
  const TOKEN = sessionStorage.getItem('TOKEN');

  return TOKEN ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
