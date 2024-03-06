import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '../pages/home';
import NotFound from '../pages/404';
import Login from '../pages/login';
import Register from '../pages/register';
import PrivateRoutes from '../hooks/privateRoutes';

const routes = [
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
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
    path: '*',
    element: <NotFound />,
  },
];
function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
