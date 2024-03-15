import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import NotFound from "./components/NotFound/NotFound"
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import MainSlider from './components/MainSLider/MainSlider';
import Categories from './components/Categories/Categories';
import WishList from './components/WishList/WishList';
import AthurizedLayout from './components/Layouts/AthurizedLayout';
import SignUp from './components/SingUp/SignUp';
import SignIn from './components/SigningIn/SignIn';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Home from './components/Home/Home';
import Products from './components/products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Productdetails from './components/Productdetails/Productdetails';
import { ToastContainer } from 'react-toastify';
import StoreContextProvider from './context/storeContext';
import Address from './components/Address/Address';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Verifycode from './components/VerfiyCode/Verifycode';
import ResetPassword from './components/ResetPassword/ResetPassword';

let routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout/>,children:[
      {index: true,element:<ProtectedRoutes><Home/> </ProtectedRoutes>},
      {path: "home",element:<ProtectedRoutes><Home/> </ProtectedRoutes>},
      {path: "cart",element:<ProtectedRoutes><Cart/> </ProtectedRoutes>},
      {path: "products",element:<ProtectedRoutes><Products/> </ProtectedRoutes>},
      {path: "categories",element:<ProtectedRoutes><Categories/> </ProtectedRoutes>},
      {path: "brands",element:<ProtectedRoutes><Brands/> </ProtectedRoutes>},
      {path: "/ForgetPassword",element:<ProtectedRoutes><ForgetPassword/> </ProtectedRoutes>},
      {path: "/verifycode",element:<ProtectedRoutes><Verifycode/> </ProtectedRoutes>},
      {path: "/resetpassword",element:<ProtectedRoutes><ResetPassword/> </ProtectedRoutes>},
      {path:"wishlist",element:<ProtectedRoutes><WishList/> </ProtectedRoutes>},
      {path:'product_details/:id',element:<ProtectedRoutes><Productdetails/> </ProtectedRoutes>},
      {path:'address/:id',element:<ProtectedRoutes><Address/> </ProtectedRoutes>},
      {path:"*",element:<NotFound/>}
    ]
  },
  {
    path: "/",
    element: <AthurizedLayout/>,children:[
     
      {path: "signup",element:<SignUp/>},
      {path: "signin",element:<SignIn/>},

    ]
  }
  
])

export default function App() {
  return (
    <>
<StoreContextProvider>
<RouterProvider router={routes}/>
<ToastContainer theme='colored' autoClose={500}/>
</StoreContextProvider>
  
    </>
  )
}

