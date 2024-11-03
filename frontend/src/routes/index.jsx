import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProduct from "../pages/AllProduct";
import ProductCategory from "../pages/ProductCategory";
import DetailsProduct from "../pages/DetailsProduct";
import AddToCartView from "../pages/AddToCartView";
import SearchProduct from "../pages/SearchProduct";
import ImageUpload from "../pages/ImageUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "product-category",
        element: <ProductCategory />,
      },
      {
        path: "product-details/:id",
        element: <DetailsProduct />,
      },
      {
        path: "add-to-cart",
        element: <AddToCartView />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "upload-image",
        element: <ImageUpload />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-user",
            element: <AllUser />,
          },
          {
            path: "all-product",
            element: <AllProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;
