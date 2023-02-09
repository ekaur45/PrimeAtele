import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DashboardView from "../../views/dashboard.view";
import LoginView from "../../views/login.view";
import DashboardLayout from '../layout/dashboard.layout';
import AddCustomer from '../../views/addCustomer.view';
import CreateView from '../../views/create.view';
import Logout from '../logout';
import ForgetView from '../../views/forgot.view';
import ProfileView from '../../views/profile.view';
import { useEffect } from 'react';
import toastr from "toastr";
const router = createBrowserRouter([
  {
    path:'/',
    element:<DashboardLayout/>,
    children:[
      {
          path: "/",
          element: <DashboardView />,        
      },
      {
          path: "/logout",
          element: <Logout />,        
      },
      {
          path: "/add-customer",
          element: <AddCustomer />,        
      },
      ,
      {
          path: "/edit-customer/:id",
          element: <ProfileView />,        
      }
    ],
    errorElement: <><h4>404</h4></>,
  },
  {
    path: "/login",
    element: <LoginView />,
    errorElement: <><h4>404</h4></>,
  },
  {
    path: "/forgot",
    element: <ForgetView />,
    errorElement: <><h4>404</h4></>,
  },
  {
    path: "/create",
    element: <CreateView />,
    errorElement: <><h4>404</h4></>,
  },
]);
function App() {
  useEffect(()=>{
},[])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
