import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import summeryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [countAddToCart, setCountAddToCart] = useState(0);


  const fetchUsersDetails = async () => {
    const dataResponse = await fetch(summeryApi.userDetails.url, {
      method: summeryApi.userDetails.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

    const getCountAddToCart = async () => {
      const response = await fetch(summeryApi.countAddToCart.url, {
        method: summeryApi.countAddToCart.method,
        credentials: "include",
      });
      const fetchData = await response.json();
      if (fetchData?.success) {
        setCountAddToCart(fetchData?.data?.count);
      }
      
    };

  useEffect(() => {
    // user Details
    fetchUsersDetails();
    // add To Cart Count
    getCountAddToCart();
    /* eslint-disable */
  },[]);
  return (
    <>
      <Context.Provider
        value={{
          fetchUsersDetails, // user details fetch
          countAddToCart, // Count Add To Cart
          getCountAddToCart,
        }}
      >
        <Header />
        <main className="min-h-[calc(100vh-165px)] pt-20">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </Context.Provider>
    </>
  );
}

export default App;
